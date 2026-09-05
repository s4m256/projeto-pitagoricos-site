"use client";

import type { Session, User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { withAuthTimeout } from "@/lib/auth-helpers";
import type { Profile } from "@/lib/database.types";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";

type AuthState = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  configured: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const client = getSupabaseBrowserClient();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured());

  const refreshProfile = useCallback(async () => {
    if (!client) return;
    const { data: auth, error: authError } = await withAuthTimeout(client.auth.getUser());
    if (authError || !auth.user) {
      setProfile(null);
      return;
    }

    const { data } = await withAuthTimeout(
      client.from("profiles").select("*").eq("id", auth.user.id).maybeSingle(),
    );
    setProfile(data ?? null);
  }, [client]);

  useEffect(() => {
    if (!client) return;

    let active = true;
    void withAuthTimeout(client.auth.getSession())
      .then(({ data }) => {
        if (!active) return;
        setSession(data.session);
        if (data.session?.user) void refreshProfile().catch(() => setProfile(null));
      })
      .catch(() => {
        if (active) {
          setSession(null);
          setProfile(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    const { data: listener } = client.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      setLoading(false);
      window.setTimeout(() => {
        if (!active) return;
        if (nextSession?.user) void refreshProfile().catch(() => setProfile(null));
        else setProfile(null);
      }, 0);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [client, refreshProfile]);

  const value = useMemo<AuthState>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      loading,
      configured: isSupabaseConfigured(),
      refreshProfile,
      signOut: async () => {
        if (!client) return;
        const { error } = await withAuthTimeout(client.auth.signOut());
        if (error) throw error;
      },
    }),
    [session, profile, loading, client, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth precisa de AuthProvider");
  return value;
}

"use client";

import type { Session, User } from "@supabase/supabase-js";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";
import type { Profile } from "@/lib/database.types";

type AuthState = { session: Session | null; user: User | null; profile: Profile | null; loading: boolean; configured: boolean; refreshProfile: () => Promise<void>; signOut: () => Promise<void> };
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const client = getSupabaseBrowserClient();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(Boolean(client));
  const refreshProfile = useCallback(async () => {
    if (!client) return;
    const { data: auth } = await client.auth.getUser();
    if (!auth.user) { setProfile(null); return; }
    const { data } = await client.from("profiles").select("*").eq("id", auth.user.id).maybeSingle();
    setProfile(data ?? null);
  }, [client]);
  useEffect(() => {
    if (!client) return;
    client.auth.getSession().then(async ({ data }) => { setSession(data.session); if (data.session?.user) await refreshProfile(); setLoading(false); });
    const { data: listener } = client.auth.onAuthStateChange((_event, next) => { setSession(next); window.setTimeout(() => { if (next?.user) void refreshProfile(); else setProfile(null); }, 0); setLoading(false); });
    return () => listener.subscription.unsubscribe();
  }, [client, refreshProfile]);
  const value = useMemo<AuthState>(() => ({ session, user: session?.user ?? null, profile, loading, configured: isSupabaseConfigured(), refreshProfile, signOut: async () => { if (client) await client.auth.signOut(); } }), [session, profile, loading, client, refreshProfile]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error("useAuth precisa de AuthProvider"); return value; }

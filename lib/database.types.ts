export type UserRole = "student" | "admin";
export type MaterialStatus = "draft" | "published";

export type Profile = { id: string; display_name: string | null; role: UserRole; created_at: string; updated_at: string };
export type StudentPreferences = { user_id: string; grade: string; subjects: string[]; olympiads: string[]; objective: string; experience: string; onboarding_completed: boolean; updated_at: string };
export type Material = { id: string; title: string; description: string; subject: string; olympiad: string | null; levels: string[]; material_type: string; objective: string; source_kind: "external" | "upload"; external_url: string | null; storage_path: string | null; status: MaterialStatus; featured: boolean; sort_order: number; created_by: string; published_at: string | null; created_at: string; updated_at: string };
export type MaterialProgress = { user_id: string; material_id: string; completed_at: string };
export type Favorite = { user_id: string; material_id: string; created_at: string };
export type Goal = { id: string; user_id: string; text: string; completed: boolean; position: number; created_at: string; updated_at: string };
export type OlympiadPage = { slug: string; name: string; short_description: string; intro: string; how_it_works: string; how_to_study: string; published: boolean; updated_by: string | null; updated_at: string };

export type Database = { public: { Tables: {
  profiles: { Row: Profile; Insert: Partial<Profile> & { id: string }; Update: Partial<Profile>; Relationships: [] };
  student_preferences: { Row: StudentPreferences; Insert: Partial<StudentPreferences> & { user_id: string }; Update: Partial<StudentPreferences>; Relationships: [] };
  materials: { Row: Material; Insert: Partial<Material> & Pick<Material, "title" | "description" | "subject" | "material_type" | "objective" | "source_kind" | "created_by">; Update: Partial<Material>; Relationships: [] };
  material_progress: { Row: MaterialProgress; Insert: MaterialProgress; Update: Partial<MaterialProgress>; Relationships: [] };
  favorites: { Row: Favorite; Insert: Favorite; Update: Partial<Favorite>; Relationships: [] };
  goals: { Row: Goal; Insert: Partial<Goal> & Pick<Goal, "user_id" | "text">; Update: Partial<Goal>; Relationships: [] };
  olympiad_pages: { Row: OlympiadPage; Insert: Partial<OlympiadPage> & Pick<OlympiadPage, "slug" | "name" | "short_description" | "intro" | "how_it_works" | "how_to_study">; Update: Partial<OlympiadPage>; Relationships: [] };
}; Views: Record<string, never>; Functions: { is_admin: { Args: Record<string, never>; Returns: boolean } }; Enums: Record<string, never>; CompositeTypes: Record<string, never> } };

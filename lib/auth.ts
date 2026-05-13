import { createSupabaseServerClient } from "./supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Role = "super_admin" | "client" | "user";

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  avatar_url?: string;
  created_at: string;
}

export interface AuthSession {
  user: AuthUser;
  expires: string;
}

const VALID_ROLES: Role[] = ["super_admin", "client", "user"];

function isValidRole(role: string): role is Role {
  return VALID_ROLES.includes(role as Role);
}

export async function getSession(): Promise<AuthSession | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (!profile) return null;

    const role = profile.role || "client";
    if (!isValidRole(role)) return null;

    return {
      user: {
        id: profile.id,
        email: profile.email || session.user.email || "",
        full_name: profile.full_name || "",
        role,
        avatar_url: profile.avatar_url,
        created_at: profile.created_at,
      },
      expires: session.expires_at?.toString() || new Date().toISOString(),
    };
  } catch (error) {
    console.error("getSession error:", error);
    return null;
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getSession();
  return session?.user || null;
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

export async function hasRole(required: Role | Role[]): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;

  if (Array.isArray(required)) {
    return required.includes(session.user.role);
  }
  return session.user.role === required;
}

export async function isSuperAdmin(): Promise<boolean> {
  return hasRole("super_admin");
}

export async function requireAuth(redirectTo = "/login") {
  const session = await getSession();
  if (!session) redirect(redirectTo);
  return session;
}

export async function requireRole(required: Role | Role[], redirectTo = "/unauthorized") {
  const session = await requireAuth("/login");
  const hasRequiredRole = Array.isArray(required)
    ? required.includes(session.user.role)
    : session.user.role === required;

  if (!hasRequiredRole) redirect(redirectTo);
  return session;
}

export async function requireSuperAdmin(redirectTo = "/unauthorized") {
  return requireRole("super_admin", redirectTo);
}

export async function getApiSession(): Promise<AuthSession | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile) return null;

    const role = profile.role || "client";
    if (!isValidRole(role)) return null;

    return {
      user: {
        id: profile.id,
        email: profile.email || user.email || "",
        full_name: profile.full_name || "",
        role,
        avatar_url: profile.avatar_url,
        created_at: profile.created_at,
      },
      expires: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export async function requireAuthApi(): Promise<AuthSession> {
  const session = await getApiSession();
  if (!session) throw new Error("Authentication required");
  return session;
}

export async function requireRoleApi(required: Role | Role[]): Promise<AuthSession> {
  const session = await requireAuthApi();
  const hasRequired = Array.isArray(required)
    ? required.includes(session.user.role)
    : session.user.role === required;
  if (!hasRequired) throw new Error("Insufficient permissions");
  return session;
}

export async function requireSuperAdminApi(): Promise<AuthSession> {
  return requireRoleApi("super_admin");
}

export async function signOut(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
}

export function getRoleDisplayName(role: Role): string {
  const names: Record<Role, string> = {
    super_admin: "Super Admin",
    client: "Client",
    user: "User",
  };
  return names[role];
}

export function canAccessDashboard(role: Role): boolean {
  return role === "super_admin" || role === "client";
}

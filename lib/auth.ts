import { createSupabaseServerClient } from "./supabase/server";
import { headers } from "next/headers";
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

// Read user from middleware-set headers (no Supabase call needed)
export async function getUserFromHeaders(): Promise<AuthUser | null> {
  try {
    const h = await headers();
    const id = h.get("x-user-id");
    const email = h.get("x-user-email");
    const fullName = h.get("x-user-name");
    const role = h.get("x-user-role");
    const avatarUrl = h.get("x-user-avatar");

    if (!id || !email) return null;
    if (!isValidRole(role || "")) return null;

    return {
      id,
      email,
      full_name: fullName || "",
      role: role as Role,
      avatar_url: avatarUrl || undefined,
      created_at: "",
    };
  } catch {
    return null;
  }
}

// Full session check via Supabase (for API routes and server actions)
export async function getSession(): Promise<AuthSession | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

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
  return getUserFromHeaders();
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

export async function hasRole(required: Role | Role[]): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  if (Array.isArray(required)) {
    return required.includes(user.role);
  }
  return user.role === required;
}

export async function isSuperAdmin(): Promise<boolean> {
  return hasRole("super_admin");
}

export async function requireAuth(redirectTo = "/login") {
  const user = await getCurrentUser();
  if (!user) redirect(redirectTo);
  return user;
}

export async function requireRole(required: Role | Role[], redirectTo = "/unauthorized") {
  const user = await requireAuth("/login");
  const hasRequiredRole = Array.isArray(required)
    ? required.includes(user.role)
    : user.role === required;

  if (!hasRequiredRole) redirect(redirectTo);
  return user;
}

export async function requireSuperAdmin(redirectTo = "/unauthorized") {
  return requireRole("super_admin", redirectTo);
}

// API route helpers still use Supabase directly
export async function getApiSession(): Promise<AuthSession | null> {
  return getSession();
}

export async function requireAuthApi(): Promise<AuthSession> {
  const session = await getSession();
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

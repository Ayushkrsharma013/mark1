import { headers } from "next/headers";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { redirect } from "next/navigation";
import type { AuthUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const userId = h.get("x-user-id");
  const userEmail = h.get("x-user-email");
  const userName = h.get("x-user-name");
  const userRole = h.get("x-user-role");
  const userAvatar = h.get("x-user-avatar");

  if (!userId || !userEmail) {
    redirect("/login");
  }

  const user: AuthUser = {
    id: userId,
    email: userEmail,
    full_name: userName || "",
    role: (userRole as AuthUser["role"]) || "client",
    avatar_url: userAvatar || undefined,
    created_at: "",
  };

  return (
    <div className="flex h-screen bg-[#060608]">
      <Sidebar
        user={{
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          avatar_url: user.avatar_url,
        }}
      />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

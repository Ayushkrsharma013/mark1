import { requireAuth } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth("/login");

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-[#060608]">
      <Sidebar
        user={{
          full_name: session.user.full_name,
          email: session.user.email,
          role: session.user.role,
          avatar_url: session.user.avatar_url,
        }}
      />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

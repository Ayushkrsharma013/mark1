import { requireAuth } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth("/login");

  if (!user) {
    redirect("/login");
  }

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
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

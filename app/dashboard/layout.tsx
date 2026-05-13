export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#060608]">
      <div className="w-64 bg-[#0a0a0f] border-r border-[rgba(255,255,255,0.06)] p-4">
        <p className="text-white font-bold">FlowForges</p>
        <p className="text-[#71717a] text-sm mt-2">Sidebar placeholder</p>
      </div>
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-[#71717a] mt-2">Content area</p>
        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
}

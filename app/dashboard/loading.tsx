export default function DashboardLoading() {
  return (
    <div className="flex h-screen bg-[#060608] items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-3 h-3 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-3 h-3 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

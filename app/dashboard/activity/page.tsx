import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, Bot, Zap, Mail, Workflow, Settings, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

const activities = [
  { text: "New lead batch scraped — 142 leads from LinkedIn", time: "12 minutes ago", icon: Users, color: "text-[#00d4ff]" },
  { text: "AI agent 'SupportBot' resolved 23 tickets autonomously", time: "1 hour ago", icon: Bot, color: "text-[#00ff88]" },
  { text: "Email campaign 'Q2 Outreach' sent to 500 contacts", time: "3 hours ago", icon: Mail, color: "text-[#7c3aed]" },
  { text: "Workflow 'Invoice Processing' completed — 47 invoices", time: "5 hours ago", icon: Zap, color: "text-[#ff6b35]" },
  { text: "New client 'DataBridge Inc.' onboarded", time: "Yesterday at 4:30 PM", icon: Users, color: "text-[#00d4ff]" },
  { text: "Workflow 'Lead Scoring' updated by admin", time: "Yesterday at 2:15 PM", icon: Workflow, color: "text-[#00ff88]" },
  { text: "System settings updated — rate limit increased", time: "Yesterday at 11:00 AM", icon: Settings, color: "text-[#71717a]" },
  { text: "Monthly analytics report generated", time: "2 days ago", icon: TrendingUp, color: "text-[#7c3aed]" },
  { text: "AI agent 'SalesBot' closed 12 new deals", time: "2 days ago", icon: Bot, color: "text-[#00ff88]" },
  { text: "Database backup completed successfully", time: "3 days ago", icon: Settings, color: "text-[#71717a]" },
  { text: "Campaign 'Product Launch' draft created", time: "3 days ago", icon: Mail, color: "text-[#7c3aed]" },
  { text: "New team member added to workspace", time: "4 days ago", icon: Users, color: "text-[#00d4ff]" },
];

export default async function ActivityPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Activity Log</h1>
        <p className="text-[#71717a] mt-1">
          Every action across your systems, in one place.
        </p>
      </div>

      <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden">
        <div className="divide-y divide-[rgba(255,255,255,0.04)]">
          {activities.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-4 px-6 py-4 hover:bg-[rgba(255,255,255,0.01)] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.03)] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#a1a1aa]">{item.text}</p>
                </div>
                <span className="text-xs text-[#52525b] whitespace-nowrap">{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

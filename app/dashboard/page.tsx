import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  Users,
  TrendingUp,
  Zap,
  Clock,
  ArrowUpRight,
  Bot,
  Workflow,
  BarChart3,
  Mail,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CommandCenterPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Welcome back, {user.full_name.split(" ")[0]}
        </h1>
        <p className="text-[#71717a] mt-1">
          Here&apos;s what&apos;s happening across your command center.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          label="Active Agents"
          value="12"
          change="+2"
          trend="up"
          icon={<Bot className="h-5 w-5 text-[#00d4ff]" />}
        />
        <StatCard
          label="Workflows Run"
          value="1,847"
          change="+23%"
          trend="up"
          icon={<Workflow className="h-5 w-5 text-[#00d4ff]" />}
        />
        <StatCard
          label="Leads Generated"
          value="3,240"
          change="+18%"
          trend="up"
          icon={<Users className="h-5 w-5 text-[#00ff88]" />}
        />
        <StatCard
          label="Avg Response Time"
          value="1.2s"
          change="-0.3s"
          trend="up"
          icon={<Clock className="h-5 w-5 text-[#7c3aed]" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "View Analytics", icon: BarChart3, href: "/dashboard/analytics", color: "text-[#00d4ff]", bg: "bg-[rgba(0,212,255,0.08)]" },
                { label: "Check Activity", icon: ActivityIcon, href: "/dashboard/activity", color: "text-[#00ff88]", bg: "bg-[rgba(0,255,136,0.08)]" },
                { label: "Prospecting OS", icon: TrendingUp, href: "https://lead-engine-henna.vercel.app", color: "text-[#7c3aed]", bg: "bg-[rgba(124,58,237,0.08)]", external: true },
                { label: "Account Settings", icon: SettingsIcon, href: "/dashboard/settings", color: "text-[#a1a1aa]", bg: "bg-[rgba(255,255,255,0.05)]" },
              ].map((action) => {
                const Icon = action.icon;
                const Comp = action.external ? "a" : Link;
                const extraProps = action.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
                return (
                  <Comp
                    key={action.label}
                    href={action.href}
                    {...extraProps}
                    className="flex items-center gap-3 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] p-4 hover:border-[rgba(255,255,255,0.10)] transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <span className="text-sm font-medium text-white group-hover:translate-x-0.5 transition-transform">
                      {action.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#52525b] ml-auto shrink-0" />
                  </Comp>
                );
              })}
            </div>
          </div>

          {/* System Status */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
            <h2 className="text-lg font-semibold text-white mb-4">System Status</h2>
            <div className="space-y-4">
              {[
                { name: "Prospecting OS", status: "Operational", color: "bg-[#00ff88]" },
                { name: "AI Agents", status: "Operational", color: "bg-[#00ff88]" },
                { name: "Email Service (Resend)", status: "Operational", color: "bg-[#00ff88]" },
                { name: "Supabase Database", status: "Operational", color: "bg-[#00ff88]" },
                { name: "API Endpoints", status: "Degraded", color: "bg-[#ff6b35]" },
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <span className="text-sm text-[#a1a1aa]">{service.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${service.color}`} />
                    <span className="text-xs text-[#71717a]">{service.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { text: "New lead batch scraped — 142 leads from LinkedIn", time: "12 min ago", icon: Users, color: "text-[#00d4ff]" },
              { text: "AI agent 'SupportBot' resolved 23 tickets", time: "1 hour ago", icon: Bot, color: "text-[#00ff88]" },
              { text: "Campaign 'Q2 Outreach' sent to 500 contacts", time: "3 hours ago", icon: Mail, color: "text-[#7c3aed]" },
              { text: "Workflow 'Invoice Processing' completed", time: "5 hours ago", icon: Zap, color: "text-[#ff6b35]" },
              { text: "New client onboarded — DataBridge Inc.", time: "Yesterday", icon: Users, color: "text-[#00d4ff]" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.03)] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-[#a1a1aa] leading-relaxed">{item.text}</p>
                    <span className="text-xs text-[#52525b]">{item.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            href="/dashboard/activity"
            className="inline-flex items-center gap-1.5 mt-6 text-sm text-[#00d4ff] hover:underline"
          >
            View all activity
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// Inline icons for quick actions (avoids multiple exports)
function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

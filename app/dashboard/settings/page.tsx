import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Mail, Shield, Key, Bell } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="px-6 py-6 lg:px-8 lg:py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#F1F5F9]">Settings</h1>
        <p className="text-sm text-[#94A3B8] mt-1">
          Manage your account and preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6366F1] to-[#818CF8] flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">
                {user.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#F1F5F9]">
              {user.full_name}
            </h3>
            <p className="text-sm text-[#94A3B8]">{user.email}</p>
            <span className="inline-block mt-2 text-xs font-medium uppercase tracking-wider text-[#6366F1] bg-[rgba(99,102,241,0.08)] rounded-full px-3 py-1">
              {user.role}
            </span>
          </div>
        </div>

        {/* Settings sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Email Notifications */}
          <div className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[rgba(99,102,241,0.08)] flex items-center justify-center">
                <Mail className="h-5 w-5 text-[#6366F1]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#F1F5F9]">
                  Email Notifications
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Configure how you receive updates
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Weekly analytics report", enabled: true },
                { label: "New lead alerts", enabled: true },
                { label: "Workflow completion notices", enabled: false },
                { label: "System status updates", enabled: true },
                { label: "Product updates & tips", enabled: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#94A3B8]">{item.label}</span>
                  <div
                    className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${
                      item.enabled
                        ? "bg-[#6366F1]"
                        : "bg-[rgba(255,255,255,0.08)]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white mt-0.5 transition-transform ${
                        item.enabled
                          ? "translate-x-[22px]"
                          : "translate-x-[2px]"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[rgba(99,102,241,0.08)] flex items-center justify-center">
                <Shield className="h-5 w-5 text-[#6366F1]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#F1F5F9]">
                  Security
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Manage your account security
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#94A3B8]">
                  Two-factor authentication
                </span>
                <span className="text-xs text-[#475569] bg-[rgba(255,255,255,0.03)] rounded-full px-3 py-1">
                  Coming soon
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#94A3B8]">Change password</span>
                <button className="text-xs text-[#6366F1] hover:underline">
                  Update
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#94A3B8]">Active sessions</span>
                <span className="text-xs text-[#10B981]">1 active</span>
              </div>
            </div>
          </div>

          {/* API Keys */}
          <div className="rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#0F1422] p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[rgba(16,185,129,0.08)] flex items-center justify-center">
                <Key className="h-5 w-5 text-[#10B981]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#F1F5F9]">
                  API Keys
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Manage your API credentials
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                <div>
                  <div className="text-sm text-[#F1F5F9] font-mono">
                    sk_live_••••••••••••••••
                  </div>
                  <div className="text-xs text-[#475569] mt-0.5">
                    Created 30 days ago
                  </div>
                </div>
                <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
                  Revoke
                </button>
              </div>
              <button className="text-sm text-[#6366F1] hover:underline">
                + Generate new key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

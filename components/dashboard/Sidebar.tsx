"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Activity,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  user: {
    full_name: string;
    email: string;
    role: string;
    avatar_url?: string;
  };
}

const navItems = [
  { href: "/dashboard", label: "Command Center", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/blog", label: "Blog", icon: FileText },
  { href: "/dashboard/activity", label: "Activity", icon: Activity },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
  }

  const sidebar = (
    <div
      className={cn(
        "h-full flex flex-col bg-[#0a0a0f] border-r border-[rgba(255,255,255,0.06)] transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Header */}
      <div className={cn("flex items-center h-16 px-4 border-b border-[rgba(255,255,255,0.06)]", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#00d4ff]" />
            <span className="font-bold text-white text-sm">FlowForges</span>
          </Link>
        )}
        {collapsed && <Sparkles className="h-5 w-5 text-[#00d4ff]" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-[#52525b] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 group",
                active
                  ? "bg-[rgba(0,212,255,0.08)] text-[#00d4ff]"
                  : "text-[#a1a1aa] hover:text-white hover:bg-[rgba(255,255,255,0.03)]",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User + Sign out */}
      <div className="px-3 py-4 border-t border-[rgba(255,255,255,0.06)]">
        {!collapsed && (
          <div className="px-3 mb-3">
            <div className="text-sm font-medium text-white truncate">{user.full_name}</div>
            <div className="text-xs text-[#52525b] truncate">{user.email}</div>
            <span className="inline-block mt-1.5 text-[10px] font-medium uppercase tracking-wider text-[#00d4ff] bg-[rgba(0,212,255,0.08)] rounded-full px-2 py-0.5">
              {user.role}
            </span>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#71717a] hover:text-red-400 hover:bg-[rgba(255,0,0,0.05)] transition-all w-full",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#0a0a0f] border border-[rgba(255,255,255,0.08)] text-white"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 z-10">
            {sidebar}
            <button
              className="absolute top-4 -right-10 p-2 text-white"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block h-full">{sidebar}</div>
    </>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Bot,
  Wand2,
  TrendingUp,
  Activity,
  Plug,
  Settings,
  X,
  LogOut,
  FileText,
  BarChart3,
} from 'lucide-react';
import { LiveDot } from './shared/LiveDot';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'My Agents', icon: Bot, href: '/dashboard/agents' },
  { label: 'Create Agent', icon: Wand2, href: '/dashboard/agent-builder', badge: 'NEW' },
  { label: 'Pipeline', icon: TrendingUp, href: '/dashboard/pipeline' },
  { label: 'Activity Log', icon: Activity, href: '/dashboard/activity' },
  { label: 'Blog', icon: FileText, href: '/dashboard/blog' },
  { label: 'Integrations', icon: Plug, href: '/dashboard/integrations' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

const MINI_AGENTS = [
  { name: 'Lead Qualifier', status: 'active' as const },
  { name: 'Support Bot', status: 'active' as const },
  { name: 'Outreach Seq', status: 'paused' as const },
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
  user: {
    name?: string;
    email?: string;
    role?: string;
    avatar?: string;
  } | null;
}

export function Sidebar({ mobileOpen, onMobileOpenChange, user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onMobileOpenChange(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 h-screen w-[240px] flex flex-col',
          'bg-[#080C14] border-r border-[rgba(255,255,255,0.05)]',
          'transform transition-transform lg:transform-none',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-[#6366F1] flex items-center justify-center">
              <span className="text-white text-xs font-bold">FF</span>
            </div>
            <span className="text-sm font-semibold text-[#F1F5F9]">FlowForges</span>
          </Link>
          <button
            onClick={() => onMobileOpenChange(false)}
            className="p-1.5 rounded-lg text-[#475569] hover:text-[#F1F5F9] lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onMobileOpenChange(false)}
                className={cn(
                  'relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group',
                  isActive
                    ? 'text-[#F1F5F9]'
                    : 'text-[#94A3B8] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#F1F5F9]'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-[#6366F1]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {isActive && (
                  <div className="absolute inset-0 rounded-lg bg-[rgba(99,102,241,0.12)]" />
                )}
                <item.icon className="relative h-[18px] w-[18px] shrink-0" />
                <span className="relative flex-1">{item.label}</span>
                {item.badge && (
                  <span className="relative text-[10px] font-semibold bg-[#F59E0B] text-black rounded-full px-1.5 py-0">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mini agent status */}
        <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.05)]">
          <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#475569] mb-2">
            Active Agents
          </p>
          <div className="space-y-2">
            {MINI_AGENTS.map((agent) => (
              <div key={agent.name} className="flex items-center gap-2">
                <LiveDot status={agent.status} size={6} />
                <span className="text-xs text-[#94A3B8] truncate">{agent.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User */}
        <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#6366F1] flex items-center justify-center text-xs font-semibold text-white shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#F1F5F9] truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-[#475569] truncate">{user?.role || 'Member'}</p>
            </div>
            <button className="p-1.5 rounded-md text-[#475569] hover:text-[#F1F5F9] hover:bg-[rgba(255,255,255,0.04)] transition-colors">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

import Link from "next/link";
import { footerLinks } from "@/lib/nav";

export function Footer() {
  return (
    <footer
      className="relative z-10 px-6 py-16 border-t"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-dim)' }}
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="font-display text-lg font-bold mb-3 block" style={{ color: 'var(--text-primary)' }}>
            FlowForges
          </Link>
          <p className="text-[13px] italic leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
            Built for digital agencies who want to ship more and operate less.
          </p>
          <Link href="/login" className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
            Sign in
          </Link>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-widest mb-4 font-mono" style={{ color: 'var(--text-muted)' }}>Products</div>
          <nav aria-label="Products navigation">
            <ul className="space-y-2">
              {footerLinks.products.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] transition-colors hover:text-[var(--accent-cyan)]" style={{ color: 'var(--text-secondary)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-widest mb-4 font-mono" style={{ color: 'var(--text-muted)' }}>Company</div>
          <nav aria-label="Company navigation">
            <ul className="space-y-2">
              {footerLinks.company.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] transition-colors hover:text-[var(--accent-cyan)]" style={{ color: 'var(--text-secondary)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-widest mb-4 font-mono" style={{ color: 'var(--text-muted)' }}>Legal</div>
          <nav aria-label="Legal navigation">
            <ul className="space-y-2">
              {footerLinks.legal.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] transition-colors hover:text-[var(--accent-cyan)]" style={{ color: 'var(--text-secondary)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div
        className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderColor: 'var(--border-dim)' }}
      >
        <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
          © 2026 FlowForges. All rights reserved.
        </p>
        <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
          Built with ambition by Ayush Kumar Sharma
        </p>
      </div>
    </footer>
  );
}

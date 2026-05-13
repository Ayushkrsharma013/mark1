import Link from "next/link";
import { footerLinks } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#0a0a0f]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="text-[#00d4ff]">Flow</span>
              <span className="text-white">Forges</span>
            </Link>
            <p className="mt-3 text-sm text-[#71717a] leading-relaxed">
              AI-powered automation agency. We build products that transform how businesses operate.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#71717a] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#71717a] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#71717a] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#52525b]">
            &copy; {new Date().getFullYear()} FlowForges. All rights reserved.
          </p>
          <p className="text-sm text-[#52525b]">
            Built with ambition by Ayush Kumar Sharma
          </p>
        </div>
      </div>
    </footer>
  );
}

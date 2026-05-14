"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/nav";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-[#0a0a0f] border-l border-[rgba(255,255,255,0.06)] p-6 md:hidden"
          >
            <div className="flex justify-end">
              <button onClick={onClose} className="p-2 text-white" aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "block text-lg py-2 transition-colors",
                      pathname === link.href || pathname.startsWith(link.href + "/")
                        ? "text-white"
                        : "text-[#a1a1aa] hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="pt-4 border-t border-[rgba(255,255,255,0.06)]"
              >
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="block text-center py-3 rounded-full bg-white text-black font-medium hover:bg-[#e4e4e7] transition-colors"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

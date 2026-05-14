export const navLinks = [
  { href: "/products", name: "Products" },
  { href: "/services", name: "Services" },
  { href: "/case-studies", name: "Case Studies" },
  { href: "/blog", name: "Blog" },
] as const;

export const footerLinks = {
  products: [
    { href: "/products", label: "Prospecting OS" },
    { href: "/products", label: "Coming Soon" },
  ],
  company: [
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/legal", label: "Legal Center" },
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/terms", label: "Terms of Service" },
    { href: "/legal/refund", label: "Refund Policy" },
    { href: "/legal/shipping", label: "Shipping Policy" },
    { href: "/legal/cancellation", label: "Cancellation Policy" },
    { href: "/legal/payment-disclosure", label: "Payment Disclosure" },
  ],
} as const;

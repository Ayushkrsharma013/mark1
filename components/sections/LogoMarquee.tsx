const logos = [
  "Momentum Digital",
  "NorthScale",
  "Vertex Labs",
  "Clearpath Agency",
  "Orbit Creative",
  "Stackbridge",
  "Elevate Partners",
  "Forma Studio",
  "Apex Workflows",
  "Driftwood Media",
];

export function LogoMarquee() {
  return (
    <section className="py-16 border-y border-[rgba(255,255,255,0.04)] bg-[#080C14] overflow-hidden">
      <p className="text-center text-xs font-medium uppercase tracking-[0.15em] text-[#64748B] mb-8">
        Trusted by agencies across 12 countries
      </p>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#080C14] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#080C14] to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap">
          {[...logos, ...logos].map((logo, i) => (
            <span
              key={i}
              className="mx-8 text-lg font-semibold text-[#94A3B8] opacity-50"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "FlowForges — AI Automation Agency" },
  description:
    "Done-for-you AI agents for digital agencies and e-commerce brands. Prospecting, outreach, and support — fully automated. Live in 2 weeks.",
};

export default function HomePage() {
  return (
    <div style={{ background: "#0A0A0A" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1a1a1a] bg-[#111111] text-[#71717a] text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8420a]" />
            Done-For-You AI Agency · US &amp; UK Clients
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            We Build AI Agents<br />
            <span style={{ color: "#e8420a" }}>That Run</span> Your Business
          </h1>

          <p className="text-lg sm:text-xl text-[#71717a] max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop hiring for tasks AI can own. We build and deploy AI agents for digital agencies and
            e-commerce brands — prospecting, outreach, missed call recovery, and support. Live in 2 weeks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/book"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors text-center"
            >
              Book a Free Strategy Call
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-[#1a1a1a] text-[#71717a] font-semibold text-sm hover:text-white hover:border-zinc-600 transition-colors text-center"
            >
              See Our Products →
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-[#71717a]">
            <span>✓ US &amp; UK agencies</span>
            <span>✓ 2-week delivery</span>
            <span>✓ 500+ leads generated</span>
            <span>✓ No long-term contracts</span>
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-[#e8420a] tracking-widest uppercase mb-3">WHAT WE BUILD</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Two ways to work with us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-lg bg-[#111111] border border-[#1a1a1a] hover:border-zinc-700 transition-colors">
              <div className="text-xs font-medium text-[#e8420a] tracking-widest uppercase mb-4">PLUG &amp; PLAY</div>
              <h3 className="text-xl font-bold text-white mb-3">Productized AI Agents</h3>
              <p className="text-[#71717a] text-sm leading-relaxed mb-6">
                Pre-built, ready to deploy. Prospecting OS finds and scores leads automatically. Remi recovers
                missed calls. Plug in your details and start seeing results same day.
              </p>
              <div className="space-y-2 mb-8">
                {[
                  "Prospecting OS — $499/mo",
                  "Remi Missed Call Recovery — $299/mo",
                  "Setup in days, not weeks",
                  "Monthly subscription, cancel anytime",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#71717a]">
                    <span className="text-[#e8420a]">→</span> {item}
                  </div>
                ))}
              </div>
              <Link href="/products" className="text-sm font-medium text-white hover:text-[#e8420a] transition-colors">
                Explore Products →
              </Link>
            </div>

            <div className="p-8 rounded-lg bg-[#111111] border border-[#1a1a1a] hover:border-zinc-700 transition-colors">
              <div className="text-xs font-medium text-[#71717a] tracking-widest uppercase mb-4">CUSTOM BUILT</div>
              <h3 className="text-xl font-bold text-white mb-3">Bespoke AI Development</h3>
              <p className="text-[#71717a] text-sm leading-relaxed mb-6">
                We build AI agents, workflow automations, and analytics dashboards tailored to your exact
                business process. Done-for-you, start to finish.
              </p>
              <div className="space-y-2 mb-8">
                {[
                  "AI Agents & Chatbots — from $5,000",
                  "Workflow Automation — from $8,000",
                  "Custom AI Development — from $15,000",
                  "30 days post-launch support included",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#71717a]">
                    <span className="text-[#71717a]">→</span> {item}
                  </div>
                ))}
              </div>
              <Link href="/services" className="text-sm font-medium text-white hover:text-[#e8420a] transition-colors">
                View Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TERMINAL DEMO ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium text-[#e8420a] tracking-widest uppercase mb-3">LIVE PRODUCT</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Prospecting OS — running right now
            </h2>
            <p className="text-[#71717a]">This is what happens automatically, every day, for our clients.</p>
          </div>

          <div className="rounded-lg bg-[#0d0d0d] border border-[#1a1a1a] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-[#71717a] font-mono">prospecting-os — live pipeline</span>
            </div>
            <div className="p-6 font-mono text-sm space-y-2">
              <div>
                <span className="text-[#4ade80]">[SCOUT]</span>
                <span className="text-[#71717a]"> Found 47 leads — &quot;e-commerce agency United States&quot;</span>
              </div>
              <div>
                <span className="text-[#4ade80]">[ENRICH]</span>
                <span className="text-[#71717a]"> Fetching firmographics for acme-digital.com...</span>
              </div>
              <div>
                <span className="text-[#4ade80]">[SCORE]</span>
                <span className="text-white"> ICP match: 94%</span>
                <span className="text-[#71717a]"> — 51-200 employees, Shopify stack, US-based, hiring for paid media</span>
              </div>
              <div>
                <span className="text-[#4ade80]">[ICEBRKR]</span>
                <span className="text-[#71717a]"> Icebreaker generated for John at Acme Digital</span>
              </div>
              <div>
                <span className="text-[#4ade80]">[DELIVER]</span>
                <span className="text-[#71717a]"> Sent to Slack #leads-pipeline ✓</span>
              </div>
              <div className="pt-2 border-t border-[#1a1a1a]">
                <span className="text-[#71717a]">↳ Time elapsed: </span>
                <span className="text-white">4 min 12 sec</span>
                <span className="text-[#71717a] ml-4">Human involvement: </span>
                <span className="text-white">0</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-[#71717a] text-sm mb-4">This runs automatically, 24/7. No prompting required.</p>
            <Link
              href="/book"
              className="inline-flex px-8 py-3.5 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors"
            >
              Get This Running For You →
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-medium text-[#e8420a] tracking-widest uppercase mb-3">PROCESS</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              From call to running agent — 2 weeks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery Call",
                body: "We learn your business, bottlenecks, and goals in 30 minutes. No pitch deck.",
              },
              {
                step: "02",
                title: "We Build",
                body: "Our team builds and tests your AI agent in 1-2 weeks. You get progress updates.",
              },
              {
                step: "03",
                title: "You Launch",
                body: "We deploy, handle integrations, and train your team. Zero technical lift from you.",
              },
              {
                step: "04",
                title: "It Runs",
                body: "Your AI agent works 24/7. We monitor, optimize, and support ongoing.",
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="p-6 rounded-lg bg-[#111111] border border-[#1a1a1a]">
                <div className="text-4xl font-bold text-[#1a1a1a] mb-4">{step}</div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-[#71717a] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">What clients say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "We went from spending 6 hours a week manually finding leads to having 50+ scored prospects in Slack every Monday. FlowForges set it up in 10 days.",
                name: "Digital Agency Owner",
                location: "Austin, TX",
              },
              {
                quote:
                  "Remi recovered a $2,400 client in week one — someone who called after hours. The ROI conversation was very short.",
                name: "Service Business Owner",
                location: "Manchester, UK",
              },
              {
                quote:
                  "We'd tried two other AI agencies before FlowForges. First ones who actually shipped something that worked without us babysitting it.",
                name: "E-commerce Brand",
                location: "Melbourne, AU",
              },
            ].map(({ quote, name, location }) => (
              <div key={name} className="p-6 rounded-lg bg-[#111111] border border-[#1a1a1a]">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-[#e8420a] text-sm">★</span>
                  ))}
                </div>
                <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">&ldquo;{quote}&rdquo;</p>
                <div>
                  <p className="text-white text-sm font-medium">{name}</p>
                  <p className="text-[#71717a] text-xs">{location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#1a1a1a]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to stop doing manually<br />what AI can own?
          </h2>
          <p className="text-[#71717a] mb-8">30-minute strategy call. No pitch deck. No commitment.</p>
          <Link
            href="/book"
            className="inline-flex px-10 py-4 rounded-full bg-[#e8420a] text-white font-semibold hover:bg-[#cc3a08] transition-colors"
          >
            Book a Free Strategy Call
          </Link>
          <p className="text-xs text-[#71717a] mt-4">
            Typically responds within 4 hours · US &amp; UK timezone friendly
          </p>
        </div>
      </section>

    </div>
  );
}

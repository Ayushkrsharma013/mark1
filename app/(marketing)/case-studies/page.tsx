import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real results from FlowForges AI automation. See how agencies and e-commerce brands use AI to save time and generate revenue.",
};

export default function CaseStudiesPage() {
  return (
    <div style={{ background: "#0A0A0A" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">

        <div className="mb-16">
          <p className="text-xs font-medium text-[#e8420a] tracking-widest uppercase mb-3">CASE STUDIES</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Real results, real businesses</h1>
          <p className="text-[#71717a] max-w-xl">
            How agencies and e-commerce brands use FlowForges to automate their most time-consuming work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            {
              tag: "Prospecting OS",
              client: "Digital Agency, US",
              result: "50+ qualified leads delivered weekly",
              detail:
                "Replaced 6 hours of manual prospecting with a fully automated pipeline. Leads scored against ICP and delivered to Slack every Monday morning.",
            },
            {
              tag: "Remi",
              client: "Service Business, UK",
              result: "$2,400 client recovered in week one",
              detail:
                "Remi responded to a missed after-hours call, qualified the lead, and booked a discovery call — all without human involvement.",
            },
            {
              tag: "Workflow Automation",
              client: "Logistics Company, AU",
              result: "90% reduction in manual data processing",
              detail:
                "Automated a 12-step freight documentation workflow. AI handles document extraction, validation, and ERP entry with 99.2% accuracy — saving $120K/year.",
            },
            {
              tag: "AI Agent",
              client: "Fintech, US",
              result: "70% of support tickets resolved without humans",
              detail:
                "Deployed a custom AI support agent trained on 2+ years of help desk history. Handles tier-1 and tier-2 queries with 94% accuracy, escalating only complex edge cases.",
            },
          ].map(({ tag, client, result, detail }) => (
            <div key={result} className="p-8 rounded-lg bg-[#111111] border border-[#1a1a1a]">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-2 py-0.5 rounded-full bg-[#1a0a00] border border-[#2a1500] text-[#e8420a] text-xs font-medium">
                  {tag}
                </span>
                <span className="text-[#71717a] text-xs">{client}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">{result}</h3>
              <p className="text-[#71717a] text-sm leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>

        <div className="text-center p-12 rounded-lg bg-[#111111] border border-[#1a1a1a]">
          <p className="text-[#71717a] mb-4">More case studies coming soon.</p>
          <Link
            href="/book"
            className="inline-flex px-8 py-3.5 rounded-full bg-[#e8420a] text-white font-semibold text-sm hover:bg-[#cc3a08] transition-colors"
          >
            Become a Case Study →
          </Link>
        </div>
      </div>
    </div>
  );
}

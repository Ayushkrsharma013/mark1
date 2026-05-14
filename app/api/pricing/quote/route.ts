import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getAdminClient } from "@/lib/supabase/admin";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const SERVICE_PRICES: Record<string, number> = {
  "ai-agent": 50000,
  "workflow-automation": 80000,
  "custom-ai": 150000,
  analytics: 60000,
  strategy: 3000,
  "productized-service": 25000,
};

const TEAM_MULTIPLIER: Record<string, number> = {
  "1-10": 1,
  "11-50": 1.3,
  "51-200": 1.6,
  "200+": 2,
};

const TIMELINE_MULTIPLIER: Record<string, number> = {
  "4-weeks": 1.5,
  "8-weeks": 1.15,
  "12-weeks": 1,
  flexible: 1,
};

export async function POST(req: Request) {
  try {
    const { services, teamSize, timeline, email, name, company } =
      await req.json();

    if (!services?.length || !teamSize || !timeline || !email) {
      return NextResponse.json(
        { error: "services, teamSize, timeline, and email are required" },
        { status: 400 }
      );
    }

    // Calculate estimate
    let baseTotal = 0;
    for (const svc of services) {
      baseTotal += SERVICE_PRICES[svc] || 0;
    }
    const teamMult = TEAM_MULTIPLIER[teamSize] || 1;
    const timeMult = TIMELINE_MULTIPLIER[timeline] || 1;
    const estimateMin = Math.round(baseTotal * teamMult * timeMult * 0.8);
    const estimateMax = Math.round(baseTotal * teamMult * timeMult * 1.2);

    const selectedServices = services
      .map((s: string) => {
        const labels: Record<string, string> = {
          "ai-agent": "AI Agent / Chatbot",
          "workflow-automation": "Workflow Automation",
          "custom-ai": "Custom AI Development",
          analytics: "AI Analytics",
          strategy: "AI Strategy & Consulting",
          "productized-service": "Productized Service (Prospecting OS)",
        };
        return labels[s] || s;
      })
      .join(", ");

    const teamLabels: Record<string, string> = {
      "1-10": "1–10 employees",
      "11-50": "11–50 employees",
      "51-200": "51–200 employees",
      "200+": "200+ employees",
    };
    const timelineLabels: Record<string, string> = {
      "4-weeks": "Fast (4 weeks)",
      "8-weeks": "Standard (8 weeks)",
      "12-weeks": "Relaxed (12 weeks)",
      flexible: "Flexible",
    };

    // Store in Supabase
    try {
      const supabase = getAdminClient();
      await (supabase as any).from("quote_requests").insert({
        name: name || null,
        email,
        company: company || null,
        services,
        team_size: teamSize,
        timeline,
        estimate_min: estimateMin,
        estimate_max: estimateMax,
      });
    } catch (dbErr) {
      console.error("Failed to store quote request:", dbErr);
    }

    // Send email notification
    if (resend) {
      try {
        await resend.emails.send({
          from: "FlowForges <hello@flowforges.com>",
          to: "hello@flowforges.com",
          subject: `New quote request — ${selectedServices}`,
          replyTo: email,
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
              <h2>New Quote Request</h2>
              <p><strong>Name:</strong> ${name || "Not provided"}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
              <p><strong>Services:</strong> ${selectedServices}</p>
              <p><strong>Team Size:</strong> ${teamLabels[teamSize] || teamSize}</p>
              <p><strong>Timeline:</strong> ${timelineLabels[timeline] || timeline}</p>
              <p><strong>Estimate Range:</strong> ₹${estimateMin.toLocaleString("en-IN")} – ₹${estimateMax.toLocaleString("en-IN")}</p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e2e0;" />
              <p style="color: #6b6b80; font-size: 12px;">This is an automated estimate. Actual pricing depends on project scope and requirements.</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send quote email:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      estimate: { min: estimateMin, max: estimateMax },
    });
  } catch (error) {
    console.error("Quote request error:", error);
    return NextResponse.json(
      { error: "Failed to process quote request" },
      { status: 500 }
    );
  }
}

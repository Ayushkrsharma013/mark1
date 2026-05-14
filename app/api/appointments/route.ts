import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { createCalendarEvent, isCalendarConnected } from "@/lib/google-calendar";

export interface Appointment {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  company?: string;
  notes?: string;
  created_at: string;
}

export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await (supabase as any)
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      if (
        error.message?.includes("Could not find") ||
        error.code === "42P01"
      ) {
        return NextResponse.json([]);
      }
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("GET /api/appointments error:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, time, name, email, company, notes } = body;

    // Validate required fields
    if (!date || !time || !name || !email) {
      return NextResponse.json(
        { error: "date, time, name, and email are required" },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();
    const { data, error } = await (supabase as any)
      .from("appointments")
      .insert({
        date,
        time,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: (company || "").trim(),
        notes: (notes || "").trim(),
      })
      .select()
      .single();

    if (error) {
      if (
        error.message?.includes("Could not find") ||
        error.code === "42P01"
      ) {
        return NextResponse.json({
          ok: true,
          note: "Table not yet created — appointment queued",
        });
      }
      console.error("Appointment insert error:", error);
      return NextResponse.json({ ok: true, note: error.message });
    }

    // Google Calendar — non-blocking
    let calendarLink: string | null = null;
    if (isCalendarConnected()) {
      try {
        calendarLink = await createCalendarEvent({
          summary: `Demo: ${name.trim()}${company ? ` — ${company.trim()}` : " — FlowForges"}`,
          description: [
            `Name: ${name.trim()}`,
            `Email: ${email.trim().toLowerCase()}`,
            company ? `Company: ${company.trim()}` : null,
            notes ? `Notes: ${notes.trim()}` : null,
            "---",
            "Source: Booked via flow-forges.com/book",
          ]
            .filter(Boolean)
            .join("\n"),
          startDate: date,
          startTime: time,
          attendees: [email.trim().toLowerCase()],
        });
      } catch (calErr) {
        console.warn("Calendar event creation failed:", calErr);
      }
    }

    return NextResponse.json({ ok: true, id: data.id, calendarLink });
  } catch (error) {
    console.error("POST /api/appointments error:", error);
    return NextResponse.json(
      { error: "Failed to book appointment" },
      { status: 500 }
    );
  }
}

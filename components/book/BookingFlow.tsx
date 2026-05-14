"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Mail,
  Building2,
  MessageSquare,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00",
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday-first
}

function isPastDay(year: number, month: number, day: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(year, month, day);
  target.setHours(23, 59, 59, 999);
  return target < today;
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function BookingFlow() {
  const today = new Date();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const daysInMonth = useMemo(
    () => getDaysInMonth(year, month),
    [year, month]
  );
  const firstDay = useMemo(
    () => getFirstDayOfMonth(year, month),
    [year, month]
  );

  const canGoNext = useMemo(() => {
    if (month > today.getMonth() + 2) return false;
    return true;
  }, [month, today]);

  const prevMonth = useCallback(() => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }, [month]);

  const nextMonth = useCallback(() => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }, [month]);

  function selectDate(year: number, month: number, day: number) {
    setSelectedDate(formatDate(year, month, day));
    setSelectedTime(null);
  }

  async function handleSubmit() {
    setError("");
    if (!name || !email) {
      setError("Name and email are required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          name,
          email,
          company,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setCompany("");
    setNotes("");
    setError("");
  }

  const selectedDateDisplay = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const stepLabels = ["Date", "Time", "Details", "Done"];

  return (
    <div className="flex flex-col h-full">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
                i + 1 < step
                  ? "bg-[#00ff88] text-[#04040a]"
                  : i + 1 === step
                  ? "bg-[#00d4ff] text-[#04040a]"
                  : "bg-[rgba(255,255,255,0.04)] text-[#52525b]"
              )}
            >
              {i + 1 < step ? "✓" : i + 1}
            </div>
            <span
              className={cn(
                "text-xs font-medium hidden sm:inline",
                i + 1 <= step ? "text-white" : "text-[#52525b]"
              )}
            >
              {label}
            </span>
            {i < 3 && (
              <div
                className={cn(
                  "w-8 h-px hidden sm:block",
                  i + 1 < step ? "bg-[#00ff88]" : "bg-[rgba(255,255,255,0.06)]"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Date Picker */}
      {step === 1 && (
        <div className="animate-fade-up flex-1">
          <h2 className="text-lg font-semibold text-white text-center mb-2">
            Select a date
          </h2>
          <p className="text-sm text-[#71717a] text-center mb-6">
            Pick any weekday — we're available Mon–Sat
          </p>

          <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-4 max-w-sm mx-auto">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-1.5 rounded-lg text-[#71717a] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-white">
                {MONTHS[month]} {year}
              </span>
              <button
                onClick={nextMonth}
                disabled={!canGoNext}
                className="p-1.5 rounded-lg text-[#71717a] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="text-center text-[10px] text-[#52525b] font-medium py-1"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const past = isPastDay(year, month, day);
                const selected =
                  selectedDate === formatDate(year, month, day);

                return (
                  <button
                    key={day}
                    onClick={() => !past && selectDate(year, month, day)}
                    disabled={past}
                    className={cn(
                      "h-9 rounded-lg text-xs font-medium transition-all",
                      past && "text-[#3a3a44] cursor-not-allowed",
                      selected &&
                        "bg-[#00d4ff] text-[#04040a]",
                      !past &&
                        !selected &&
                        "text-[#a1a1aa] hover:bg-[rgba(255,255,255,0.04)] hover:text-white"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => selectedDate && setStep(2)}
              disabled={!selectedDate}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00d4ff] text-[#04040a] text-sm font-semibold hover:bg-[#00d4ff]/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {selectedDate ? `Continue — ${selectedDateDisplay}` : "Select a date"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Time Slots */}
      {step === 2 && (
        <div className="animate-fade-up flex-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <button
              onClick={() => setStep(1)}
              className="p-1 text-[#71717a] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <Calendar className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-sm text-white">{selectedDateDisplay}</span>
          </div>

          <h2 className="text-lg font-semibold text-white text-center mt-4 mb-6">
            What time works?
          </h2>

          <div className="max-w-sm mx-auto space-y-4">
            <div>
              <h3 className="text-xs text-[#52525b] font-medium mb-2">Morning</h3>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.filter((t) => parseInt(t) < 12).map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={cn(
                      "py-2.5 rounded-lg text-xs font-medium transition-all border",
                      selectedTime === slot
                        ? "bg-[#00d4ff] border-[#00d4ff] text-[#04040a]"
                        : "text-[#a1a1aa] border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] hover:text-white"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs text-[#52525b] font-medium mb-2">Afternoon</h3>
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.filter((t) => parseInt(t) >= 12).map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={cn(
                      "py-2.5 rounded-lg text-xs font-medium transition-all border",
                      selectedTime === slot
                        ? "bg-[#00d4ff] border-[#00d4ff] text-[#04040a]"
                        : "text-[#a1a1aa] border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.15)] hover:text-white"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => selectedTime && setStep(3)}
              disabled={!selectedTime}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00d4ff] text-[#04040a] text-sm font-semibold hover:bg-[#00d4ff]/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {selectedTime
                ? `${selectedDateDisplay} at ${selectedTime} IST`
                : "Select a time"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <div className="animate-fade-up flex-1 max-w-sm mx-auto w-full">
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setStep(2)}
              className="p-1 text-[#71717a] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <Calendar className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-sm text-white">{selectedDateDisplay}</span>
            <Clock className="w-3.5 h-3.5 text-[#00d4ff] ml-1" />
            <span className="text-sm text-white">{selectedTime} IST</span>
          </div>

          <h2 className="text-lg font-semibold text-white mb-6">
            Your details
          </h2>

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#52525b]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#52525b]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors"
              />
            </div>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-3.5 w-4 h-4 text-[#52525b]" />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company (optional)"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors"
              />
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#52525b]" />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything we should know before the call? (optional)"
                rows={3}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] text-sm text-white placeholder-[#52525b] focus:outline-none focus:border-[rgba(0,212,255,0.25)] transition-colors resize-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting || !name || !email}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#00d4ff] text-[#04040a] text-sm font-semibold hover:bg-[#00d4ff]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="animate-scale-in flex-1 text-center max-w-sm mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[rgba(0,255,136,0.08)] border border-[rgba(0,255,136,0.15)] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-[#00ff88]" />
          </div>
          <h2 className="text-xl font-bold text-white">You&apos;re booked!</h2>
          <p className="text-sm text-[#71717a] mt-2">
            A confirmation has been sent to {email}
          </p>

          <div className="mt-6 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-4 text-left space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-[#00d4ff] flex-shrink-0" />
              <span className="text-[#a1a1aa]">{selectedDateDisplay}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-[#00d4ff] flex-shrink-0" />
              <span className="text-[#a1a1aa]">{selectedTime} IST (30 min)</span>
            </div>
            {notes && (
              <div className="flex items-start gap-3 text-sm">
                <MessageSquare className="w-4 h-4 text-[#52525b] flex-shrink-0 mt-0.5" />
                <span className="text-[#71717a]">{notes}</span>
              </div>
            )}
          </div>

          <button
            onClick={reset}
            className="mt-8 px-6 py-2.5 rounded-full border border-[rgba(255,255,255,0.1)] text-white text-sm font-semibold hover:bg-[rgba(255,255,255,0.04)] transition-all"
          >
            Book another
          </button>
        </div>
      )}

      <style jsx>{`
        .animate-fade-up {
          animation: fade-up 0.25s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

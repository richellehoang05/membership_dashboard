"use client";

import { useMemo, useState } from "react";

const MOCK_UPCOMING_EVENTS = [
  {
    id: "cal_1",
    title: "Executive Circular Strategy Forum",
    day: 5,
    time: "9:00 AM",
    description:
      "A closed-door event for C-suite and senior managers on how circular models impact cost reduction, risk management, and long-term profitability. Includes case studies from firms that have already implemented circular supply chains.",
  },
  {
    id: "cal_2",
    title: "Corporate Circular Supply Chain Summit",
    day: 12,
    time: "1:00 PM",
    description:
      "Brings together manufacturers, logistics providers, and suppliers to redesign value chains around reuse, remanufacturing, and material recovery. The focus is operational execution, not theory.",
  },
  {
    id: "cal_3",
    title: "Investment & Finance in Circular Innovation Conference",
    day: 19,
    time: "10:30 AM",
    description:
      "Targets investors, banks, and corporate finance teams. Covers ROI, valuation of circular assets, regulatory incentives, and how to de-risk circular investments.",
  },
  {
    id: "cal_4",
    title: "Circular Procurement & Compliance Workshop",
    day: 26,
    time: "3:00 PM",
    description:
      "A practical event for procurement heads and compliance officers on meeting ESG requirements, upcoming regulations, and embedding circular criteria into supplier contracts.",
  },
];

function getMonthGrid(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: totalDays }, (_, idx) => new Date(year, month, idx + 1));
  return { days, leadingBlanks: firstDay.getDay() };
}

function formatMonthYear(date) {
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function formatDateShortFromDate(date) {
  return date.toLocaleString("en-US", { month: "short", day: "numeric" });
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function EventCalendar() {
  const [currentMonth] = useState(() => new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const monthLabel = useMemo(() => formatMonthYear(currentMonth), [currentMonth]);
  const { days, leadingBlanks } = useMemo(() => getMonthGrid(currentMonth), [currentMonth]);
  const upcomingEvents = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return MOCK_UPCOMING_EVENTS.map((event) => {
      const dateObj = new Date(year, month, event.day);
      return {
        ...event,
        dateKey: toDateKey(dateObj),
        dateLabel: formatDateShortFromDate(dateObj),
      };
    });
  }, [currentMonth]);
  const eventDates = useMemo(
    () => new Set(upcomingEvents.map((e) => e.dateKey)),
    [upcomingEvents]
  );
  const eventsByDate = useMemo(
    () => new Map(upcomingEvents.map((e) => [e.dateKey, e])),
    [upcomingEvents]
  );

  return (
    <>
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Upcoming events</h2>
            <p className="text-sm text-zinc-500">Calendar view for your next events.</p>
          </div>
          <div className="text-sm font-medium text-zinc-700">{monthLabel}</div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-xs text-zinc-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 text-sm">
          {Array.from({ length: leadingBlanks }).map((_, idx) => (
            <div key={`blank-${idx}`} className="h-10 rounded-lg bg-transparent" />
          ))}
          {days.map((dateObj) => {
            const dateKey = toDateKey(dateObj);
            const hasEvent = eventDates.has(dateKey);
            return (
              <button
                key={dateKey}
                type="button"
                onClick={() => setSelectedEvent(hasEvent ? eventsByDate.get(dateKey) : null)}
                className={[
                  "h-10 rounded-lg border border-zinc-200 flex items-center justify-center transition",
                  hasEvent
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                    : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100",
                ].join(" ")}
              >
                {dateObj.getDate()}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm"
            >
              <div>
                <p className="font-medium text-zinc-900">{event.title}</p>
                <p className="text-zinc-500">{event.time}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(event)}
                className="text-sm text-emerald-700 font-medium hover:underline"
              >
                {event.dateLabel}
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  Upcoming event
                </p>
                <h3 className="text-lg font-semibold text-zinc-900 mt-1">{selectedEvent.title}</h3>
                <p className="text-sm text-zinc-500 mt-1">
                  {selectedEvent.dateLabel} · {selectedEvent.time}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="rounded-full px-2 py-1 text-sm text-zinc-500 hover:text-zinc-800"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm text-zinc-600">{selectedEvent.description}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

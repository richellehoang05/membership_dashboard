"use client";

import { useMemo, useState } from "react";
import EventTypeRow from "@/components/EventTypeRow";

const MOCK_EVENT_TYPES = [
  {
    id: "evt_30",
    title: "30 min meeting",
    slug: "/han-hoang-ngoc-g8qvjv/30min",
    durationMins: 30,
    enabled: true,
    hidden: false,
  },
  {
    id: "evt_15",
    title: "15 min meeting",
    slug: "/han-hoang-ngoc-g8qvjv/15min",
    durationMins: 15,
    enabled: true,
    hidden: false,
  },
  {
    id: "evt_secret",
    title: "Secret meeting",
    slug: "/han-hoang-ngoc-g8qvjv/secret",
    durationMins: 15,
    enabled: false,
    hidden: true,
  },
];

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

export default function DashboardPage() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState(MOCK_EVENT_TYPES);
  const [currentMonth] = useState(() => new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) => {
      return (
        r.title.toLowerCase().includes(s) ||
        r.slug.toLowerCase().includes(s) ||
        String(r.durationMins).includes(s)
      );
    });
  }, [q, rows]);

  const monthLabel = useMemo(() => formatMonthYear(currentMonth), [currentMonth]);
  const { days, leadingBlanks } = useMemo(
    () => getMonthGrid(currentMonth),
    [currentMonth]
  );
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
    () => new Set(upcomingEvents.map((event) => event.dateKey)),
    [upcomingEvents]
  );
  const eventsByDate = useMemo(() => {
    return new Map(upcomingEvents.map((event) => [event.dateKey, event]));
  }, [upcomingEvents]);

  function toggleEnabled(id) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  }

  function handleNew() {
    // POC: add a new mock event type
    const next = {
      id: `evt_${Math.random().toString(16).slice(2)}`,
      title: "New event type",
      slug: "/han-hoang-ngoc-g8qvjv/new",
      durationMins: 30,
      enabled: true,
      hidden: false,
    };
    setRows((prev) => [next, ...prev]);
  }

  function onOpen(id) {
    alert(`POC: Open settings for ${id}`);
  }
  function onCopy(id) {
    alert(`POC: Copy link for ${id}`);
  }
  function onMore(id) {
    alert(`POC: More actions for ${id}`);
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Event types</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Configure different events for people to book on your calendar.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Upcoming events</h2>
            <p className="text-sm text-zinc-500">Calendar view for your next events.</p>
          </div>
          <div className="text-sm font-medium text-zinc-700">{monthLabel}</div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-xs text-zinc-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center">
              {day}
            </div>
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
                <h3 className="text-lg font-semibold text-zinc-900 mt-1">
                  {selectedEvent.title}
                </h3>
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

      {/* Header actions */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <SearchIcon />
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="w-72 rounded-full border border-zinc-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-zinc-400"
            />
          </div>

          <button
            onClick={handleNew}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:bg-zinc-800 transition"
          >
            <PlusIcon />
            New
          </button>
        </div>
      </div>

      {/* List container */}
      <div className="rounded-xl border border-zinc-200 bg-white">
        <div className="divide-y divide-zinc-200">
          {filtered.map((evt) => (
            <EventTypeRow
              key={evt.id}
              evt={evt}
              onToggle={() => toggleEnabled(evt.id)}
              onOpen={() => onOpen(evt.id)}
              onCopy={() => onCopy(evt.id)}
              onMore={() => onMore(evt.id)}
            />
          ))}
          {filtered.length === 0 ? (
            <div className="p-6 text-sm text-zinc-500">No results.</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

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

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16.2 16.2 21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
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

export default function DashboardPage() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState(MOCK_EVENT_TYPES);

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
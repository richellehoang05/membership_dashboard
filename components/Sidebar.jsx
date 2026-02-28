"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getMockSession } from "@/lib/mock-users";

const NAV = [
  { label: "Event types", href: "/dashboard", icon: LinkIcon(), active: true }
//   { label: "Bookings", href: "#", icon: CalendarIcon() },
//   { label: "Availability", href: "#", icon: ClockIcon() },
//   { label: "Teams", href: "#", icon: UsersIcon() },
//   { label: "Apps", href: "#", icon: GridIcon() },
//   { label: "Routing", href: "#", icon: RouteIcon() },
//   { label: "Workflows", href: "#", icon: BoltIcon() },
//   { label: "Insights", href: "#", icon: ChartIcon() },
];

function getInitial(email) {
  if (!email) return "?";
  const part = email.split("@")[0];
  return (part && part[0]) ? part[0].toUpperCase() : "?";
}

export default function Sidebar() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(getMockSession());
  }, []);

  const displayLabel = session ? session.displayName : "Not logged in";
  const emailLabel = session ? session.email : "";
  const initial = getInitial(session?.email);

  return (
    <aside className="w-72 border-r border-zinc-200 bg-zinc-50 min-h-screen">
      {/* top user row */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-200 bg-white">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-8 w-8 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-semibold shrink-0">
            {initial}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{displayLabel}</div>
            {emailLabel ? (
              <div className="text-xs text-zinc-500 truncate">{emailLabel}</div>
            ) : null}
            {session?.membershipType ? (
              <span className="inline-block mt-0.5 text-[10px] font-medium text-zinc-600 bg-zinc-200 px-1.5 py-0.5 rounded">
                {session.membershipType}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2 text-zinc-500">
          <button className="p-2 rounded-lg hover:bg-zinc-100">{SearchIcon()}</button>
          <button className="p-2 rounded-lg hover:bg-zinc-100">{SettingsIcon()}</button>
        </div>
      </div>

      {/* nav */}
      <nav className="p-3 space-y-1">
        {NAV.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={[
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
              item.active ? "bg-zinc-200/70 text-zinc-900" : "text-zinc-700 hover:bg-zinc-200/40",
            ].join(" ")}
          >
            <span className="text-zinc-600">{item.icon}</span>
            <span>{item.label}</span>
            {item.label === "Apps" || item.label === "Insights" ? (
              <span className="ml-auto text-xs text-zinc-500">›</span>
            ) : null}
          </Link>
        ))}
      </nav>

      {/* bottom links */}
      {/* <div className="mt-auto p-3">
        <div className="pt-3 border-t border-zinc-200 space-y-1">
          <button className="w-full text-left text-sm text-zinc-700 hover:bg-zinc-200/40 rounded-lg px-3 py-2">
            View public page
          </button>
          <button className="w-full text-left text-sm text-zinc-700 hover:bg-zinc-200/40 rounded-lg px-3 py-2">
            Copy public page link
          </button>
          <button className="w-full text-left text-sm text-zinc-700 hover:bg-zinc-200/40 rounded-lg px-3 py-2">
            Refer and earn
          </button>
          <button className="w-full text-left text-sm text-zinc-700 hover:bg-zinc-200/40 rounded-lg px-3 py-2">
            Settings
          </button>
        </div>

      </div> */}
    </aside>
  );
}

/* icons */
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

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M19.4 15a7.97 7.97 0 0 0 .1-1 7.97 7.97 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a8.4 8.4 0 0 0-1.7-1l-.3-2.6h-4l-.3 2.6a8.4 8.4 0 0 0-1.7 1l-2.4-1-2 3.5 2 1.5a7.97 7.97 0 0 0-.1 1 7.97 7.97 0 0 0 .1 1l-2 1.5 2 3.5 2.4-1a8.4 8.4 0 0 0 1.7 1l.3 2.6h4l.3-2.6a8.4 8.4 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3v3M17 3v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M4 9h16" stroke="currentColor" strokeWidth="2"/>
      <path d="M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
      <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
function RouteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 18h6a4 4 0 0 0 4-4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 19V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 19V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 19H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
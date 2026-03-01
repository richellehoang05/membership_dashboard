"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getMockSession } from "@/lib/mock-users";
import { usePathname } from "next/navigation";

const DASHBOARD_NAV = [
  { label: "Event types", href: "/dashboard", icon: "link" },
  { label: "Membership plan", href: "/dashboard/membership", icon: "chart" },
  { label: "Progress Tasks", href: "/dashboard/progress", icon: "progress" },
  { label: "Resources", href: "/dashboard/resources", icon: "book" },
];

const ADMIN_NAV = [
  {
    section: "📊 Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: "chart" },
    ],
  },
  {
    section: "🎯 Engagement & Value",
    items: [
      { label: "Events", href: "/admin/events", icon: "calendar" },
      { label: "Participation Tracking", href: "/admin/participation", icon: "users" },
      { label: "Impact Metrics", href: "/admin/impact-metrics", icon: "chart" },
    ],
  },
  {
    section: "💳 Revenue & Plans",
    items: [
      { label: "Membership Plans", href: "/admin/plans", icon: "chart" },
      { label: "Billing", href: "/admin/billing", icon: "chart" },
      { label: "Discounts", href: "/admin/discounts", icon: "chart" },
    ],
  },
  {
    section: "⚙ System",
    items: [
      { label: "Admin Roles", href: "/admin/admins", icon: "users" },
      { label: "Settings", href: "/admin/settings", icon: "settings" },
      { label: "Audit Log", href: "/admin/audit-log", icon: "chart" },
    ],
  },
];

const ICONS = {
  link: LinkIcon,
  book: BookIcon,
  progress: ProgressIcon,
  chart: ChartIcon,
  users: UsersIcon,
  calendar: CalendarIcon,
  settings: SettingsIcon,
};

function getInitial(email) {
  if (!email) return "?";
  const part = email.split("@")[0];
  return (part && part[0]) ? part[0].toUpperCase() : "?";
}

export default function Sidebar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
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
            {session?.membershipType && session?.role !== "admin" ? (
              <span className="inline-block mt-0.5 text-[10px] font-medium text-zinc-600 bg-zinc-200 px-1.5 py-0.5 rounded">
                {session.membershipType}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2 text-zinc-500">
          <button className="p-2 rounded-lg hover:bg-zinc-100"><SearchIcon /></button>
          <button className="p-2 rounded-lg hover:bg-zinc-100"><SettingsIcon /></button>
        </div>
      </div>

      {/* nav */}
      <nav className="p-3 overflow-y-auto max-h-[calc(100vh-4rem)]">
        {!isAdmin ? (
          <div className="space-y-1">
            {DASHBOARD_NAV.map((item) => {
              const active = pathname === item.href;
              const Icon = ICONS[item.icon] || LinkIcon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={[
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                    active ? "bg-zinc-200/70 text-zinc-900" : "text-zinc-700 hover:bg-zinc-200/40",
                  ].join(" ")}
                >
                  <span className="text-zinc-600"><Icon /></span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {ADMIN_NAV.map((group) => (
              <div key={group.section}>
                <div className="px-3 py-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  {group.section}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    const Icon = ICONS[item.icon] || ChartIcon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={[
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                          active ? "bg-zinc-200/70 text-zinc-900" : "text-zinc-700 hover:bg-zinc-200/40",
                        ].join(" ")}
                      >
                        <span className="text-zinc-600"><Icon /></span>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
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

/* icons — minimal, 1.5 stroke */
const iconProps = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true, stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };

function SearchIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg {...iconProps}>
      <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
      <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8M8 11h8" />
    </svg>
  );
}

function ProgressIcon() {
  return (
    <svg {...iconProps}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="9" cy="8" r="4" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 8a4 4 0 1 1 0 8" />
      <path d="M21 20c0-2.2-1.2-4-3-5" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function RouteIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 18h6a4 4 0 0 0 4-4V6" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="16" cy="4" r="2" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg {...iconProps}>
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 18v-4M10 18v-6M16 18v-2M22 18H2" />
    </svg>
  );
}
"use client";

import { useState, useEffect } from "react";
import { getMockSession } from "@/lib/mock-users";
import Link from "next/link";
import GovernmentResources from "@/components/GovernmentResources";

const RESEARCH_ITEMS = [
  {
    id: "policy",
    title: "Policy & Regulatory Updates",
    badge: "Quarterly",
    description: "Curated summaries of circular economy and sustainability regulations affecting your sector, with implementation timelines and compliance checklists.",
    href: "#",
    icon: "policy",
  },
  {
    id: "industry",
    title: "Industry Reports",
    description: "Deep-dive reports on market trends, material flows, and circular business models—updated monthly with member-exclusive data.",
    href: "#",
    icon: "report",
  },
  {
    id: "benchmark",
    title: "Circular Maturity Benchmark",
    description: "Compare your organisation’s circular readiness against peers. Self-assessment tool plus anonymised benchmark data by sector and size.",
    href: "#",
    icon: "benchmark",
  },
  {
    id: "tech",
    title: "Technology Landscape Brief",
    description: "Overview of enabling technologies (traceability, recycling tech, design tools) with vendor shortlists and adoption case studies.",
    href: "#",
    icon: "tech",
  },
];

const FUNDING_ITEMS = [
  {
    id: "grants",
    title: "Active Government Grants",
    description: "Live list of national and regional grants relevant to circular economy, innovation, and sustainability—with deadlines and eligibility summaries.",
    href: "#",
    icon: "grants",
  },
  {
    id: "rfp",
    title: "RFP Tracker",
    description: "Track relevant requests for proposals and tenders. Filter by sector, value, and deadline; get alerts when new opportunities match your profile.",
    href: "#",
    icon: "rfp",
  },
  {
    id: "competitions",
    title: "Innovation Competitions",
    description: "Upcoming accelerators, challenges, and pitch competitions with prize funding—curated for circular and sustainable innovation.",
    href: "#",
    icon: "trophy",
  },
];

const iconProps = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };

function PolicyIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );
}
function ReportIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M12 18v-6" />
      <path d="M9 15h6" />
    </svg>
  );
}
function BenchmarkIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}
function TechIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
function GrantsIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function RfpIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function TrophyIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

const ICONS = {
  policy: PolicyIcon,
  report: ReportIcon,
  benchmark: BenchmarkIcon,
  tech: TechIcon,
  grants: GrantsIcon,
  rfp: RfpIcon,
  trophy: TrophyIcon,
};

function ResourceCard({ item }) {
  const Icon = ICONS[item.icon] || ReportIcon;
  return (
    <Link
      href={item.href}
      className="group block rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200 group-hover:text-zinc-900">
          <Icon />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-zinc-900 group-hover:text-zinc-700">
              {item.title}
            </h3>
            {item.badge && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                {item.badge}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">
            {item.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-zinc-700 group-hover:text-zinc-900">
            View resource
            <svg className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ResourcesPage() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(getMockSession());
  }, []);

  if (session?.membershipType === "Government") {
    return <GovernmentResources />;
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Resources</h1>
        <p className="text-sm text-zinc-500 mt-1">
          High-value intelligence and tools for business members—research, benchmarks, and funding opportunities.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          Research & Intelligence
        </h2>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {RESEARCH_ITEMS.map((item) => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          Funding & Opportunities
        </h2>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {FUNDING_ITEMS.map((item) => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

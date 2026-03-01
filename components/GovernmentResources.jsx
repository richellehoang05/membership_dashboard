"use client";

import Link from "next/link";

const POLICY_ITEMS = [
  {
    id: "federal",
    title: "Federal circular policy updates",
    description:
      "Timely briefings on federal circular economy and sustainability policy—strategies, targets, and cross-department initiatives with implementation timelines.",
    href: "#",
    icon: "policy",
  },
  {
    id: "provincial",
    title: "Provincial regulation tracker",
    description:
      "Track provincial and territorial regulations affecting circular economy, waste, and procurement. Compare jurisdictions and stay ahead of compliance deadlines.",
    href: "#",
    icon: "map",
  },
  {
    id: "legislative",
    title: "Legislative impact summaries",
    description:
      "Plain-language summaries of new and amended legislation: what changed, who it affects, and what your organisation needs to do next.",
    href: "#",
    icon: "report",
  },
];

const PLAYBOOK_ITEMS = [
  {
    id: "procurement",
    title: "Circular procurement guide",
    description:
      "Step-by-step guide to embedding circular criteria in procurement: specifications, evaluation, and contract clauses with templates and examples.",
    href: "#",
    icon: "cart",
  },
  {
    id: "waste",
    title: "Waste reduction roadmap",
    description:
      "Phased roadmap for reducing waste in operations and facilities—metrics, quick wins, and long-term targets aligned with government commitments.",
    href: "#",
    icon: "route",
  },
  {
    id: "infrastructure",
    title: "Infrastructure transition toolkit",
    description:
      "Tools and checklists for planning and delivering circular infrastructure: design, materials, and lifecycle considerations for public assets.",
    href: "#",
    icon: "toolbox",
  },
];

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

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
function MapIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 2v4M16 2v4M3 10h18M21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9" />
      <path d="M5 14h14M5 18h14" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
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
function ToolboxIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M3 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M21 8v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
      <path d="M12 12v6M9 15h6" />
    </svg>
  );
}

const ICONS = {
  policy: PolicyIcon,
  report: ReportIcon,
  map: MapIcon,
  cart: CartIcon,
  route: RouteIcon,
  toolbox: ToolboxIcon,
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
            <svg
              className="h-4 w-4 transition group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function GovernmentResources() {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Resources</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Policy briefings, regulation trackers, and implementation playbooks for government members.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          Policy & Regulatory Briefings
        </h2>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {POLICY_ITEMS.map((item) => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">
          Implementation Playbooks
        </h2>
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {PLAYBOOK_ITEMS.map((item) => (
            <ResourceCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

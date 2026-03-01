"use client";

/**
 * Renders the four membership plan levels. Pass currentLevel (1–4) to highlight
 * the member’s current level (e.g. 1 for Business, 2 for Government).
 */
export default function MembershipPlanLevels({ currentLevel = null }) {
  const levels = [
    {
      level: 1,
      label: "Level 1",
      title: "Arrival Visa",
      who: "Who: brand new members (first 0-3 months)",
      colorClass: "text-amber-600",
      purpose: "Orientation and first quick win.",
      body: (
        <>
          <div>
            <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">What they get</p>
            <p className="mt-1">
              "Start Here" page: 3 relevant resources + 1 event recommendation + 1 connection suggestion
              (network + info + reduced rates).
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">To move up</p>
            <p className="mt-1">Earn 3 stamps in 90 days:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Stamp A: choose 1 "Door" (goal) (Policy / Pilots / Visibility).</li>
              <li>Stamp B: attend 1 event or open 2 curated resources.</li>
              <li>Stamp C: request 1 intro (or message 1 suggested member).</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      level: 2,
      label: "Level 2",
      title: "Transit Pass",
      who: "Who: engaged Year 1 members (months 4-12)",
      colorClass: "text-sky-600",
      purpose: "Build habit and relevance (stop the \"one-and-done\" drop-off).",
      body: (
        <>
          <div>
            <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">What changes</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Monthly "Your Next 3 Steps" prompt.</li>
              <li>"Connection shortcuts": 2 recommended matches/month.</li>
              <li>Progress tracker visible on their Passport page.</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">To move up</p>
            <p className="mt-1">
              Earn 6 stamps total by month 12, including 1 Influence stamp (vote/AGM action, committee
              interest form, submit 1 policy input template).
            </p>
          </div>
        </>
      ),
    },
    {
      level: 3,
      label: "Level 3",
      title: "Residency Permit",
      who: "Who: Year 2+ members",
      colorClass: "text-indigo-600",
      purpose: "Renewal feels like status, influence, and recognition.",
      body: (
        <>
          <div>
            <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">What changes</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Priority access to 1 working group / committee cycle.</li>
              <li>Eligible for "Member Spotlight" listing.</li>
              <li>"Residency badge" in directory.</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">To move up</p>
            <p className="mt-1">
              Earn 10 stamps total + 1 contribution stamp: submit a 200-word "circular win" using a
              template.
            </p>
          </div>
        </>
      ),
    },
    {
      level: 4,
      label: "Level 4",
      title: "Diplomatic Passport (invite-only)",
      who: "Who: larger orgs / high-influence members (limited seats) - or pay more",
      colorClass: "text-emerald-600",
      purpose: "Leadership positioning and decision-maker access.",
      body: (
        <>
          <div>
            <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">What changes</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Advisory roundtable seat (1-2x/year).</li>
              <li>Speaking priority or co-host option (limited slots).</li>
              <li>"Leadership" recognition badge.</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">Entry rule</p>
            <p className="mt-1">
              Invite-only based on contribution + strategic fit (protects CIC capacity).
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {levels.map((item) => {
        const isCurrent = currentLevel === item.level;
        return (
          <div
            key={item.level}
            className={`rounded-xl border bg-white p-5 relative ${
              isCurrent ? "border-2 border-emerald-500" : "border border-zinc-200"
            }`}
          >
            {isCurrent && (
              <span className="absolute right-4 top-4 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Current level
              </span>
            )}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${item.colorClass}`}>
                  {item.label}
                </p>
                <h3 className="text-base font-semibold text-zinc-900 mt-1">{item.title}</h3>
                <p className="text-xs text-zinc-500 mt-1">{item.who}</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <div>
                <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">Purpose</p>
                <p className="mt-1">{item.purpose}</p>
              </div>
              {item.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}

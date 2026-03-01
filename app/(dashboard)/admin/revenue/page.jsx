"use client";

import AdminSection from "@/components/AdminSection";

export default function RevenuePage() {
  return (
    <AdminSection
      title="Revenue Analytics"
      description="Revenue trends, MRR, and forecasts."
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">Membership plan</h2>
          <p className="text-xs text-zinc-500 mt-1">Four levels and progression rules.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Level 1</p>
                <h3 className="text-base font-semibold text-zinc-900 mt-1">Arrival Visa</h3>
                <p className="text-xs text-zinc-500 mt-1">Who: brand new members (first 0-3 months)</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <div>
                <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">Purpose</p>
                <p className="mt-1">Orientation and first quick win.</p>
              </div>
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
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-sky-600 uppercase tracking-wide">Level 2</p>
                <h3 className="text-base font-semibold text-zinc-900 mt-1">Transit Pass</h3>
                <p className="text-xs text-zinc-500 mt-1">Who: engaged Year 1 members (months 4-12)</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <div>
                <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">Purpose</p>
                <p className="mt-1">Build habit and relevance (stop the "one-and-done" drop-off).</p>
              </div>
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
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Level 3</p>
                <h3 className="text-base font-semibold text-zinc-900 mt-1">Residency Permit</h3>
                <p className="text-xs text-zinc-500 mt-1">Who: Year 2+ members</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <div>
                <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">Purpose</p>
                <p className="mt-1">Renewal feels like status, influence, and recognition.</p>
              </div>
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
            </div>
          </div>

          <div className="rounded-xl border-2 border-emerald-500 bg-white p-5 relative">
            <span className="absolute right-4 top-4 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              Current level
            </span>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Level 4</p>
                <h3 className="text-base font-semibold text-zinc-900 mt-1">Diplomatic Passport (invite-only)</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Who: larger orgs / high-influence members (limited seats) - or pay more
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm text-zinc-600">
              <div>
                <p className="text-xs font-semibold text-zinc-900 uppercase tracking-wide">Purpose</p>
                <p className="mt-1">Leadership positioning and decision-maker access.</p>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </AdminSection>
  );
}

"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const TASKS = [
  { id: "1", title: "Complete organization profile", subtitle: "Profile & settings" },
  { id: "2", title: "Confirm membership payment", subtitle: "Billing" },
  { id: "3", title: "Attend 1 CIC event", subtitle: "Events" },
  { id: "4", title: "Join 1 working group", subtitle: "Working groups" },
  { id: "5", title: "Submit 1 insight/case study", subtitle: "Contributions" },
];

const TOTAL = TASKS.length;
const COMPLETED = 5; // Demo: all 5 done

/**
 * Level 1 → Level 2 upgrade tasks card for Business members.
 * @param {() => void} onUpgrade - Callback when user clicks "Upgrade to Level 2" (demo: advance MembershipProgress).
 * @param {boolean} isUpgraded - When true, show upgraded state and lock button.
 */
export default function LevelUpTasksCard({ onUpgrade, isUpgraded = false }) {
  const [localUpgraded, setLocalUpgraded] = useState(false);
  const upgraded = isUpgraded || localUpgraded;

  function handleUpgrade() {
    if (upgraded) return;
    onUpgrade?.();
    setLocalUpgraded(true);
  }

  return (
    <div className="w-full rounded-xl border border-zinc-200 bg-white px-6 py-4 mt-3">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-zinc-900">Level 1 → Level 2 Upgrade</h3>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs text-zinc-500">{COMPLETED}/{TOTAL} completed</span>
          <div className="flex-1 h-1.5 max-w-[120px] rounded-full bg-zinc-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-zinc-900 transition-all"
              style={{ width: "100%" }}
              role="progressbar"
              aria-valuenow={COMPLETED}
              aria-valuemin={0}
              aria-valuemax={TOTAL}
            />
          </div>
        </div>
      </div>

      {/* Task list */}
      <ul className="space-y-3">
        {TASKS.map((task) => (
          <li key={task.id} className="flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
            <div className="min-w-0 flex-1">
              <span className="text-sm font-medium text-zinc-900">{task.title}</span>
              {task.subtitle && (
                <span className="block text-xs text-zinc-500">{task.subtitle}</span>
              )}
            </div>
            <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
              Done
            </span>
          </li>
        ))}
      </ul>

      {/* Success message (inline, when upgraded) */}
      {upgraded && (
        <p className="mt-4 text-sm font-medium text-emerald-600" role="status">
          Upgraded to Level 2
        </p>
      )}

      {/* CTA */}
      <div className="mt-4">
        <button
          type="button"
          onClick={handleUpgrade}
          disabled={upgraded}
          className={[
            "rounded-lg px-4 py-2 text-sm font-medium transition",
            upgraded
              ? "cursor-default bg-zinc-100 text-zinc-500"
              : "bg-zinc-900 text-white hover:bg-zinc-800",
          ].join(" ")}
        >
          {upgraded ? "Upgraded" : "Upgrade to Level 2"}
        </button>
      </div>
    </div>
  );
}

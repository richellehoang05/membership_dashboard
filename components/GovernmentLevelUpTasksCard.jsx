"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const TASKS = [
  { id: "1", title: "Complete department profile & mandate", subtitle: "Profile & mandate" },
  { id: "2", title: "Assign primary and secondary CIC contacts", subtitle: "Contacts" },
  { id: "3", title: "Attend 1 policy roundtable / briefing", subtitle: "Policy engagement" },
  { id: "4", title: "Join 1 cross-jurisdiction working group", subtitle: "Working groups" },
  { id: "5", title: "Submit 1 priority challenge or pilot concept", subtitle: "Contributions" },
];

const TOTAL = TASKS.length;
const COMPLETED = 5; // Demo: all 5 done

/**
 * Level 2 → Level 3 progression tasks card for Government members.
 * @param {() => void} onConfirm - Callback when user clicks "Confirm Level 3 Status".
 * @param {boolean} isConfirmed - When true, show confirmed state and lock button.
 */
export default function GovernmentLevelUpTasksCard({ onConfirm, isConfirmed = false }) {
  const [localConfirmed, setLocalConfirmed] = useState(false);
  const confirmed = isConfirmed || localConfirmed;

  function handleConfirm() {
    if (confirmed) return;
    onConfirm?.();
    setLocalConfirmed(true);
  }

  return (
    <div className="w-full rounded-xl border border-zinc-200 bg-white px-6 py-4 mt-3">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-zinc-900">Level 2 → Level 3 Progression</h3>
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

      {/* Success message (inline, when confirmed) */}
      {confirmed && (
        <p className="mt-4 text-sm font-medium text-emerald-600" role="status">
          Confirmed: Level 3 (Residency Permit)
        </p>
      )}

      {/* CTA */}
      <div className="mt-4">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={confirmed}
          className={[
            "rounded-lg px-4 py-2 text-sm font-medium transition",
            confirmed
              ? "cursor-default bg-zinc-100 text-zinc-500"
              : "bg-zinc-900 text-white hover:bg-zinc-800",
          ].join(" ")}
        >
          {confirmed ? "Confirmed" : "Confirm Level 3 Status"}
        </button>
      </div>
    </div>
  );
}

"use client";

const STAGES = ["Applied", "Active", "Onboarded", "Level 2"];

/**
 * Horizontal stepper for Business Membership progression.
 * @param {string} currentStage - One of STAGES; steps up to and including this are completed.
 */
export default function MembershipProgress({ currentStage = "Applied" }) {
  const currentIndex = STAGES.indexOf(currentStage);
  const resolvedIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="w-full rounded-xl border border-zinc-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between gap-2">
        {STAGES.map((label, i) => {
          const isCompleted = i < resolvedIndex;
          const isCurrent = i === resolvedIndex;
          const isPending = i > resolvedIndex;
          const isLast = i === STAGES.length - 1;

          return (
            <div key={label} className="flex flex-1 items-center min-w-0">
              {/* Step: dot + label */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={[
                    "h-3 w-3 rounded-full border-2 transition-colors",
                    isCompleted && "bg-zinc-900 border-zinc-900",
                    isCurrent && "bg-white border-zinc-900 ring-4 ring-zinc-200",
                    isPending && "bg-white border-zinc-200",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden
                />
                <span
                  className={[
                    "mt-2 text-xs font-medium truncate max-w-[4.5rem] text-center",
                    isCompleted && "text-zinc-900",
                    isCurrent && "text-zinc-900",
                    isPending && "text-zinc-400",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className={[
                    "flex-1 min-w-[8px] h-0.5 mx-1 rounded transition-colors",
                    i < resolvedIndex ? "bg-zinc-900" : "bg-zinc-200",
                  ].join(" ")}
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

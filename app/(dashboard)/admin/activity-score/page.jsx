"use client";

import AdminSection from "@/components/AdminSection";

export default function ActivityScorePage() {
  return (
    <AdminSection
      title="Activity Score"
      description="Member activity scoring and leaderboards."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Activity score rules and rankings will go here.
      </div>
    </AdminSection>
  );
}

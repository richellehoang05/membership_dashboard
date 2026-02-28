"use client";

import AdminSection from "@/components/AdminSection";

export default function MemberStagesPage() {
  return (
    <AdminSection
      title="Member Stages"
      description="Track members through stages (lead, trial, active, churned)."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Stage pipeline and counts will go here.
      </div>
    </AdminSection>
  );
}

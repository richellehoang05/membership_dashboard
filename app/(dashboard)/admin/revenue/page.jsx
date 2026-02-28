"use client";

import AdminSection from "@/components/AdminSection";

export default function RevenuePage() {
  return (
    <AdminSection
      title="Revenue Analytics"
      description="Revenue trends, MRR, and forecasts."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Revenue charts and breakdowns will go here.
      </div>
    </AdminSection>
  );
}

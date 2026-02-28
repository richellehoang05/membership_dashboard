"use client";

import AdminSection from "@/components/AdminSection";

export default function PlansPage() {
  return (
    <AdminSection
      title="Plans"
      description="Manage membership tiers and pricing plans."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Plan list, pricing, and features will go here.
      </div>
    </AdminSection>
  );
}

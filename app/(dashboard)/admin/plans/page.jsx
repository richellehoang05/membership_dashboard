"use client";

import AdminSection from "@/components/AdminSection";
import MembershipPlanLevels from "@/components/MembershipPlanLevels";

export default function PlansPage() {
  return (
    <AdminSection
      title="Plans"
      description="Manage membership tiers and pricing plans."
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">Membership plan</h2>
          <p className="text-xs text-zinc-500 mt-1">Four levels and progression rules.</p>
        </div>
        <MembershipPlanLevels />
      </div>
    </AdminSection>
  );
}

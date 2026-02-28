"use client";

import AdminSection from "@/components/AdminSection";

export default function UpgradeRequestsPage() {
  return (
    <AdminSection
      title="Upgrade Requests"
      description="Review and approve member upgrade requests."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Pending upgrade requests and approval actions will go here.
      </div>
    </AdminSection>
  );
}

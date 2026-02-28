"use client";

import AdminSection from "@/components/AdminSection";

export default function RenewalsPage() {
  return (
    <AdminSection
      title="Renewals"
      description="Manage upcoming and past membership renewals."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Renewal calendar and reminder settings will go here.
      </div>
    </AdminSection>
  );
}

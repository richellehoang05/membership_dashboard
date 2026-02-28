"use client";

import AdminSection from "@/components/AdminSection";

export default function ReportsPage() {
  return (
    <AdminSection
      title="Reports"
      description="Generate and download membership and revenue reports."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Report filters, date range, and export options will go here.
      </div>
    </AdminSection>
  );
}

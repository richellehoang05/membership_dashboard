"use client";

import AdminSection from "@/components/AdminSection";

export default function AuditLogPage() {
  return (
    <AdminSection
      title="Audit Log"
      description="History of admin actions and system changes."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Filterable audit log table will go here.
      </div>
    </AdminSection>
  );
}

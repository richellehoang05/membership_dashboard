"use client";

import AdminSection from "@/components/AdminSection";

export default function AdminEventsPage() {
  return (
    <AdminSection
      title="Events"
      description="Manage events and attendance."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Event list and registration stats will go here.
      </div>
    </AdminSection>
  );
}

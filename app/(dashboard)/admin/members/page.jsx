"use client";

import AdminSection from "@/components/AdminSection";

export default function AllMembersPage() {
  return (
    <AdminSection
      title="All Members"
      description="View and manage all membership accounts."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Member list with search, filters, and bulk actions will go here.
      </div>
    </AdminSection>
  );
}

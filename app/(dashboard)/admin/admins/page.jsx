"use client";

import AdminSection from "@/components/AdminSection";

export default function AdminsPage() {
  return (
    <AdminSection
      title="Admins"
      description="Manage admin users and permissions."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Admin list and role assignment will go here.
      </div>
    </AdminSection>
  );
}

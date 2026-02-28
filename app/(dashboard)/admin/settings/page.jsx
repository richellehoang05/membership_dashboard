"use client";

import AdminSection from "@/components/AdminSection";

export default function AdminSettingsPage() {
  return (
    <AdminSection
      title="Settings"
      description="Organization and system settings."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        General, notifications, and integration settings will go here.
      </div>
    </AdminSection>
  );
}

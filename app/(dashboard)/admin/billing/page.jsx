"use client";

import AdminSection from "@/components/AdminSection";

export default function BillingPage() {
  return (
    <AdminSection
      title="Billing"
      description="Invoices, payments, and billing configuration."
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Billing history and payment methods will go here.
      </div>
    </AdminSection>
  );
}

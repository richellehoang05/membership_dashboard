"use client";

import AdminSection from "@/components/AdminSection";
import { getMockSession } from "@/lib/mock-users";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getMockSession());
  }, []);

  return (
    <AdminSection
      title="Dashboard"
      description={user?.role === "admin" ? `Signed in as ${user.email} (${user.role}).` : "Overview of membership and key metrics."}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Members" value="—" />
        <StatCard label="Active This Month" value="—" />
        <StatCard label="Revenue (MTD)" value="—" />
        <StatCard label="Pending Renewals" value="—" />
      </div>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
        Charts and summary widgets can go here.
      </div>
    </AdminSection>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
    </div>
  );
}

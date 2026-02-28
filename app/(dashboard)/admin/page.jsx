"use client";

import AdminSection from "@/components/AdminSection";
import { getMockSession, getMockMembers } from "@/lib/mock-users";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setUser(getMockSession());
    setMembers(getMockMembers());
  }, []);

  const totalMembers = members.length;
  const memberAccounts = members.filter((m) => m.role !== "admin");

  return (
    <AdminSection
      title="Dashboard"
      description={user?.role === "admin" ? `Signed in as ${user.email} (${user.role}).` : "Overview of membership and key metrics."}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Members" value={totalMembers} />
        <StatCard label="Member Accounts" value={memberAccounts.length} />
        <StatCard label="Revenue (MTD)" value="—" />
        <StatCard label="Pending Renewals" value="—" />
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50">
          <h2 className="text-sm font-semibold text-zinc-900">Current members</h2>
          <p className="text-xs text-zinc-500 mt-0.5">All accounts in the system</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Membership type</th>
                <th className="px-4 py-3 font-medium">Role</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.email} className="border-b border-zinc-100 hover:bg-zinc-50">
                  <td className="px-4 py-3 text-zinc-900">{member.displayName}</td>
                  <td className="px-4 py-3 text-zinc-600">{member.email}</td>
                  <td className="px-4 py-3 text-zinc-600">{member.membershipType}</td>
                  <td className="px-4 py-3">
                    {member.role ? (
                      <span className="inline-block text-xs font-medium text-zinc-700 bg-zinc-200 px-2 py-0.5 rounded">
                        {member.role}
                      </span>
                    ) : (
                      <span className="text-zinc-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

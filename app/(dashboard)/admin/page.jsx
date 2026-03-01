"use client";

import AdminSection from "@/components/AdminSection";
import { getMockSession, getMockMembers, MEMBERSHIP_TYPES, ROLES } from "@/lib/mock-users";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cic_mock_members";

function loadMembers() {
  if (typeof window === "undefined") return getMockMembers();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}
  return getMockMembers();
}

function saveMembers(members) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  } catch (_) {}
}

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    setUser(getMockSession());
    setMembers(loadMembers());
  }, []);

  const totalMembers = members.length;
  const memberAccounts = members.filter((m) => m.role !== "admin");

  const handleEdit = (member) => setEditingMember({ ...member, _originalEmail: member.email });
  const handleCancelEdit = () => setEditingMember(null);

  const handleSaveEdit = () => {
    if (!editingMember) return;
    const originalEmail = editingMember._originalEmail ?? editingMember.email;
    const { _originalEmail, ...memberData } = editingMember;
    const next = members.map((m) =>
      m.email === originalEmail ? memberData : m
    );
    setMembers(next);
    saveMembers(next);
    setEditingMember(null);
  };

  const handleResetToDefault = () => {
    const defaultMembers = getMockMembers();
    setMembers(defaultMembers);
    saveMembers(defaultMembers);
    setEditingMember(null);
  };

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
        <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900">Current members</h2>
            <p className="text-xs text-zinc-500 mt-0.5">All accounts in the system (editable)</p>
          </div>
          <button
            type="button"
            onClick={handleResetToDefault}
            className="text-xs font-medium text-zinc-600 hover:text-zinc-900 border border-zinc-300 rounded-lg px-2 py-1.5"
          >
            Reset to default
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-zinc-500">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Membership type</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium w-20">Actions</th>
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
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(member)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingMember && (
        <EditMemberModal
          member={editingMember}
          onChange={setEditingMember}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </AdminSection>
  );
}

function EditMemberModal({ member, onChange, onSave, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onCancel}>
      <div
        className="rounded-xl border border-zinc-200 bg-white shadow-xl w-full max-w-md p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-zinc-900 mb-4">Edit member</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Display name</label>
            <input
              type="text"
              value={member.displayName}
              onChange={(e) => onChange({ ...member, displayName: e.target.value })}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Email</label>
            <input
              type="email"
              value={member.email}
              onChange={(e) => onChange({ ...member, email: e.target.value })}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Membership type</label>
            <select
              value={member.membershipType}
              onChange={(e) => onChange({ ...member, membershipType: e.target.value })}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            >
              {MEMBERSHIP_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1">Role</label>
            <select
              value={member.role ?? ""}
              onChange={(e) => onChange({ ...member, role: e.target.value || undefined })}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            >
              <option value="">—</option>
              <option value={ROLES.ADMIN}>{ROLES.ADMIN}</option>
              <option value={ROLES.MEMBER}>{ROLES.MEMBER}</option>
            </select>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 rounded-lg border border-zinc-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-3 py-1.5 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
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

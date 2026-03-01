"use client";

import { useState, useEffect } from "react";
import { getMockSession } from "@/lib/mock-users";
import { useMemberProgress } from "@/context/MemberProgressContext";
import MembershipPlanLevels from "@/components/MembershipPlanLevels";

export default function MembershipPlanPage() {
  const [session, setSession] = useState(null);
  const { governmentLevel, businessStage } = useMemberProgress();

  useEffect(() => {
    setSession(getMockSession());
  }, []);

  const businessLevel = businessStage === "Level 2" ? 2 : 1;
  const membershipPlanLevel = session?.membershipType === "Government" ? governmentLevel : businessLevel;

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Membership plan</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Four levels and progression rules. Your current level is highlighted.
        </p>
      </div>
      <MembershipPlanLevels currentLevel={membershipPlanLevel} />
    </div>
  );
}

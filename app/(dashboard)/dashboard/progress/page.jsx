"use client";

import { useState, useEffect } from "react";
import { getMockSession } from "@/lib/mock-users";
import { useMemberProgress } from "@/context/MemberProgressContext";
import LevelUpTasksCard from "@/components/LevelUpTasksCard";
import GovernmentLevelUpTasksCard from "@/components/GovernmentLevelUpTasksCard";

export default function ProgressPage() {
  const [session, setSession] = useState(null);
  const { businessStage, setBusinessStage, governmentLevel, setGovernmentLevel } = useMemberProgress();

  useEffect(() => {
    setSession(getMockSession());
  }, []);

  const isGovernment = session?.membershipType === "Government";

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Progress Tasks</h1>
        <p className="text-sm text-zinc-500 mt-1">
          {isGovernment
            ? "You are in Level 2. Complete the requirements below to progress to Level 3 (Residency Permit)."
            : "Complete the requirements below to upgrade from Level 1 to Level 2."}
        </p>
      </div>

      {isGovernment ? (
        <GovernmentLevelUpTasksCard
          onConfirm={() => setGovernmentLevel(3)}
          isConfirmed={governmentLevel === 3}
        />
      ) : (
        <LevelUpTasksCard
          onUpgrade={() => setBusinessStage("Level 2")}
          isUpgraded={businessStage === "Level 2"}
        />
      )}
    </div>
  );
}

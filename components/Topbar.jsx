"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getMockSession } from "@/lib/mock-users";
import { useMemberProgress } from "@/context/MemberProgressContext";
import MembershipProgress from "@/components/MembershipProgress";
import GovernmentMembershipProgress from "@/components/GovernmentMembershipProgress";

export default function Topbar() {
  const pathname = usePathname();
  const [session, setSession] = useState(null);
  const { businessStage, governmentLevel } = useMemberProgress();

  useEffect(() => {
    setSession(getMockSession());
  }, []);

  const isAdminRoute = pathname?.startsWith("/admin");
  const isGovernment = session?.membershipType === "Government";
  // Government: Level 2 = Policy Engaged (current), next = Level 3 (Implementation Active)
  const governmentStage = governmentLevel === 3 ? "Implementation Active" : "Policy Engaged";

  return (
    <header className="border-b border-zinc-200 bg-white flex items-center px-8 py-4">
      <div className="flex-1 min-w-0">
        {!isAdminRoute && (
          isGovernment ? (
            <GovernmentMembershipProgress currentStage={governmentStage} />
          ) : (
            <MembershipProgress currentStage={businessStage} />
          )
        )}
      </div>
    </header>
  );
}
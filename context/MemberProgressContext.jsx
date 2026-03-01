"use client";

import { createContext, useContext, useState } from "react";

const MemberProgressContext = createContext(null);

export function MemberProgressProvider({ children }) {
  // Demo: Business Level 1 (Onboarded) → Level 2
  const [businessStage, setBusinessStage] = useState("Onboarded");
  // Demo: Government Level 2 → Level 3 (Residency Permit)
  const [governmentStage, setGovernmentStage] = useState("Enrolled");
  const [governmentLevel, setGovernmentLevel] = useState(2);

  return (
    <MemberProgressContext.Provider
      value={{
        businessStage,
        setBusinessStage,
        governmentStage,
        setGovernmentStage,
        governmentLevel,
        setGovernmentLevel,
      }}
    >
      {children}
    </MemberProgressContext.Provider>
  );
}

export function useMemberProgress() {
  const ctx = useContext(MemberProgressContext);
  if (!ctx) {
    throw new Error("useMemberProgress must be used within MemberProgressProvider");
  }
  return ctx;
}

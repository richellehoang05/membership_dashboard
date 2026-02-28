/**
 * Mock membership accounts for development / POC only.
 * Replace with Supabase (or other) auth in production; do not store real passwords.
 */

export const MEMBERSHIP_TYPES = ["Business", "Government"] as const;
export type MembershipType = (typeof MEMBERSHIP_TYPES)[number];

export interface MockUser {
  email: string;
  password: string;
  membershipType: MembershipType;
  displayName: string;
}

/** Mock users – development only; remove when switching to real auth. */
export const MOCK_USERS: MockUser[] = [
  {
    email: "hoanghan0613@gmail.com",
    password: "businessaccount",
    membershipType: "Business",
    displayName: "Business Account",
  },
  {
    email: "happy.town@canada.ca",
    password: "govenmentaccount",
    membershipType: "Government",
    displayName: "Government Account",
  },
];

/**
 * Validates credentials against mock users. Returns user (without password) or null.
 * Use only for mock/POC; replace with Supabase auth in production.
 */
export function validateMockUser(
  email: string,
  password: string
): Omit<MockUser, "password"> | null {
  const normalizedEmail = email.trim().toLowerCase();
  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
  );
  if (!user) return null;
  const { password: _, ...safe } = user;
  return safe;
}

/** Session key for mock auth; only used client-side (sessionStorage). */
export const MOCK_SESSION_KEY = "cic_mock_session";

export type MockSession = Omit<MockUser, "password">;

export function getMockSession(): MockSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(MOCK_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as MockSession;
  } catch {
    return null;
  }
}

export function setMockSession(user: MockSession): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(user));
}

export function clearMockSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(MOCK_SESSION_KEY);
}

/**
 * Mock accounts for POC. Replace with Supabase auth later.
 * Roles: "admin" | "business" | "government"
 */
export const ROLES = {
  ADMIN: "admin",
  BUSINESS: "business",
  GOVERNMENT: "government",
};

export const MOCK_ACCOUNTS = [
  {
    email: "admin@cic.com",
    password: "adminaccount",
    role: ROLES.ADMIN,
    name: "Admin",
  },
  // Example placeholders for other roles:
  // { email: "business@example.com", password: "...", role: ROLES.BUSINESS, name: "Business" },
  // { email: "gov@example.com", password: "...", role: ROLES.GOVERNMENT, name: "Government" },
];

const STORAGE_KEY = "cic_mock_user";

/**
 * Validate credentials against mock accounts. Returns user object or null.
 * @param {{ email: string, password: string }} credentials
 * @returns {{ email: string, role: string, name: string } | null}
 */
export function validateMockLogin(credentials) {
  const { email, password } = credentials;
  const normalizedEmail = email?.trim().toLowerCase();
  const account = MOCK_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === normalizedEmail && a.password === password
  );
  if (!account) return null;
  return {
    email: account.email,
    role: account.role,
    name: account.name,
  };
}

/**
 * Store logged-in user in sessionStorage (client-only).
 * @param {{ email: string, role: string, name: string }} user
 */
export function setMockUser(user) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (_) {}
}

/**
 * Get current user from sessionStorage (client-only).
 * @returns {{ email: string, role: string, name: string } | null}
 */
export function getMockUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

/**
 * Clear stored user (logout).
 */
export function clearMockUser() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (_) {}
}

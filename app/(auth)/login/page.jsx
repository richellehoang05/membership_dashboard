"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { validateMockUser, setMockSession, ROLES } from "@/lib/mock-users";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length > 0 && !loading;
  }, [email, password, loading]);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // POC: simulate request delay
    await new Promise((r) => setTimeout(r, 700));

    const user = validateMockUser(email.trim(), password);
    if (!user) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    setMockSession(user);
    setLoading(false);
    if (user.role === ROLES.ADMIN) {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setLoading(true);

    // POC: simulate OAuth delay
    await new Promise((r) => setTimeout(r, 600));

    // TODO: replace with supabase.auth.signInWithOAuth({ provider: "google" })
    setLoading(false);
    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-8">
      {/* Brand */}
      <div className="text-2xl font-semibold tracking-tight">CIC Membership Login</div>

      {/* Heading */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>
        <p className="text-sm text-zinc-500 leading-relaxed">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline text-zinc-800 hover:text-zinc-950">
            Create a new account now
          </Link>
        </p>
      </div>

      {/* Error */}
      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <div className="space-y-1">
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="h-12 w-full border-0 border-b border-zinc-300 rounded-none px-0 text-sm outline-none focus:ring-0 focus:border-zinc-900"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="h-12 w-full border-0 border-b border-zinc-300 rounded-none px-0 text-sm outline-none focus:ring-0 focus:border-zinc-900"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            disabled={loading}
          />
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={!canSubmit}
          className={[
            "w-full h-12 rounded-md text-sm font-semibold transition-colors",
            canSubmit
              ? "bg-zinc-900 text-white hover:bg-zinc-800"
              : "bg-zinc-200 text-zinc-500 cursor-not-allowed",
          ].join(" ")}
        >
          {loading ? "Logging in..." : "Login Now"}
        </button>
      </form>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full h-12 rounded-md border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors text-sm font-medium flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <FaGoogle className="size-[18px]" />
        Login with Google
      </button>

      {/* Forgot password */}
      <p className="text-center text-sm text-zinc-500">
        Forget password?{" "}
        <Link href="#" className="underline text-zinc-800 hover:text-zinc-950 font-medium">
          Click here
        </Link>
      </p>
    </div>
  );
}
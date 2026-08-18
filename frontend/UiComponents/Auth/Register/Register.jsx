"use client";

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "../../../lib/auth";
import { useAuth } from "../../../app/context/AuthContext";

export default function Register() {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    re_password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    // Password validation
    if (formData.password !== formData.re_password) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      // Register user
      await registerUser(formData);

      setSuccess("Account created successfully. Logging you in...");

      // Automatically login after registration
      await login(
        formData.username.trim(),
        formData.password
      );

    } catch (err) {
      setError(
        err?.message ||
        "Registration failed. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50 to-blue-50 flex items-center justify-center px-6 py-20">

      {/* Background decoration */}
      <div className="pointer-events-none absolute top-20 left-10 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="pointer-events-none absolute bottom-10 right-10 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="rounded-3xl border border-white/40 bg-white/70 p-8 shadow-[0_20px_70px_rgba(31,38,135,0.15)] backdrop-blur-2xl sm:p-10">

          {/* Logo */}
          <Link href="/" className="mb-8 block text-center">
            <h1 className="text-3xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-violet-700 to-blue-600 bg-clip-text text-transparent">
                CareerHub
              </span>
            </h1>
          </Link>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Create Account
            </h2>

            <p className="mt-2 text-slate-500">
              Create your CareerHub account and start your journey
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div
              role="status"
              className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600"
            >
              {success}
            </div>
          )}

          {/* Register Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
          >

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                required
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="re_password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Confirm Password
              </label>

              <input
                id="re_password"
                name="re_password"
                type="password"
                placeholder="Confirm your password"
                value={formData.re_password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                disabled={loading}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />

              <label
                htmlFor="terms"
                className="text-sm leading-5 text-slate-600"
              >
                I agree to the{" "}

                <Link
                  href="/terms"
                  className="font-semibold text-violet-600 hover:text-violet-700"
                >
                  Terms & Conditions
                </Link>{" "}

                and{" "}

                <Link
                  href="/privacy"
                  className="font-semibold text-violet-600 hover:text-violet-700"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={
                loading ||
                !formData.username ||
                !formData.password ||
                !formData.re_password
              }
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-sm text-slate-400">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google */}
          <button
            type="button"
            disabled
            title="Google authentication will be enabled soon"
            className="flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-400"
          >
            Continue with Google

            <span className="text-xs font-normal">
              (Coming soon)
            </span>
          </button>

          {/* Login */}
          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold text-violet-600 hover:text-violet-700"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}
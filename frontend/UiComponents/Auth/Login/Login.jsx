"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../../app/context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await login(formData.username.trim(), formData.password);
    } catch (err) {
      setError(err?.message || "Invalid username or password.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-200/80 border border-slate-100 grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        
        {/* LEFT PANEL: Distinct Visual Anchor (Sign In Only) */}
        <div className="md:col-span-5 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <Link href="/" className="inline-block mb-12">
              <span className="text-2xl font-black tracking-tight text-white">
                CareerHub
              </span>
            </Link>
            
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-md mb-4 text-violet-100">
              Welcome Back
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              Manage your job search with confidence.
            </h2>
          </div>

          <div className="space-y-4 my-8 md:my-0">
            <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-violet-100 font-medium">
                Over 12,000+ active job applications tracked today.
              </p>
            </div>
          </div>

          <p className="text-xs text-violet-200/80">
            &copy; {new Date().getFullYear()} CareerHub Inc. All rights reserved.
          </p>
        </div>

        {/* RIGHT PANEL: Streamlined Sign-In Form */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full">
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900">Sign in to account</h3>
              <p className="text-sm text-slate-500 mt-1">
                Enter your credentials to access your dashboard
              </p>
            </div>

            {error && (
              <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="username" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="e.g. alex_dev"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none transition-all focus:bg-white focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs font-semibold text-violet-600 hover:text-violet-700">
                    Forgot?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none transition-all focus:bg-white focus:border-violet-600 focus:ring-4 focus:ring-violet-600/10"
                />
              </div>

              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  />
                  <span className="text-xs text-slate-600 font-medium">Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || !formData.username || !formData.password}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-violet-700 transition-colors shadow-lg shadow-slate-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                New to CareerHub?{" "}
                <Link href="/register" className="font-bold text-violet-600 hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
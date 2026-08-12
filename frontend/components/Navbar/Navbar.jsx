"use client";

import Link from "next/link";

export default function Navbar() {
  // Change this to true when you want to preview the logged-in UI
  const isLoggedIn = false;

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(31,38,135,0.18)] px-8 py-4">

        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-violet-700 to-blue-600 bg-clip-text text-transparent">
              CareerHub
            </span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-3">

          <Link
            href="/"
            className="rounded-full px-5 py-2.5 text-slate-800 font-semibold transition-all duration-300 hover:bg-white/30 hover:backdrop-blur-md hover:text-violet-700"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="rounded-full px-5 py-2.5 text-slate-800 font-semibold transition-all duration-300 hover:bg-white/30 hover:backdrop-blur-md hover:text-violet-700"
          >
            About
          </Link>

          <Link
            href="/services"
            className="rounded-full px-5 py-2.5 text-slate-800 font-semibold transition-all duration-300 hover:bg-white/30 hover:backdrop-blur-md hover:text-violet-700"
          >
            Services
          </Link>

          <Link
            href="/study-destinations"
            className="rounded-full px-5 py-2.5 text-slate-800 font-semibold transition-all duration-300 hover:bg-white/30 hover:backdrop-blur-md hover:text-violet-700"
          >
            Destinations
          </Link>

          <Link
            href="/blogs"
            className="rounded-full px-5 py-2.5 text-slate-800 font-semibold transition-all duration-300 hover:bg-white/30 hover:backdrop-blur-md hover:text-violet-700"
          >
            Blogs
          </Link>

        </nav>

        {/* Authentication UI */}
        {isLoggedIn ? (
          <div className="flex items-center gap-3">

            {/* Dashboard */}
            <Link
              href="/dashboard"
              className="rounded-full border border-white/30 bg-white/20 px-6 py-3 font-semibold text-slate-800 backdrop-blur-md transition-all duration-300 hover:bg-white/40 hover:text-violet-700"
            >
              Dashboard
            </Link>

            {/* Logout */}
            <button
              type="button"
              className="rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
            >
              Logout
            </button>

          </div>
        ) : (
          <div className="flex items-center gap-3">

            {/* Login */}
            <Link
              href="/login"
              className="rounded-full border border-white/30 bg-white/20 px-6 py-3 font-semibold text-slate-800 backdrop-blur-md transition-all duration-300 hover:bg-white/40 hover:text-violet-700"
            >
              Login
            </Link>

            {/* Register */}
            <Link
              href="/register"
              className="rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
            >
              Register
            </Link>

          </div>
        )}

      </div>
    </header>
  );
}
"use client";

import Link from "next/link";
import { useAuth } from "../../app/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  
 

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

       
       {/* Dynamic Auth Section */}
        <div className="flex items-center gap-3">
          {user ? (
            /* Show when LOGGED IN */
            <>
              <Link
                href="/dashboard"
                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-sm font-medium text-gray-500 hover:text-red-600 transition px-2 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            /* Show when LOGGED OUT */
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
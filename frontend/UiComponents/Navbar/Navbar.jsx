"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../app/context/AuthContext";
import { ArrowRight, Menu, X, LayoutDashboard, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Destinations", href: "/study-destinations" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl">
      {/* Main Floating Glass Capsule Container */}
      <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full px-5 py-2.5 shadow-xl shadow-slate-900/5 flex items-center justify-between transition-all duration-300">
        
        {/* Logo */}
        <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-1 pl-2">
          <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Career<span className="text-violet-600">Hub</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Dynamic Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 bg-violet-50 hover:bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-xs font-bold transition border border-violet-200/60"
              >
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-bold text-slate-700 hover:text-violet-600 transition px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="group flex items-center gap-2 bg-slate-900 hover:bg-violet-600 text-white pl-4 pr-1.5 py-1.5 rounded-full text-xs font-bold shadow-md transition-all duration-300"
              >
                <span>Register</span>
                <span className="bg-white/20 p-1.5 rounded-full group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={12} />
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-slate-700 hover:text-violet-600 hover:bg-slate-100 rounded-full transition"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <hr className="border-slate-100" />

          {/* Mobile Auth Links */}
          <div className="flex flex-col gap-2 pt-1">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 bg-violet-50 text-violet-700 py-3 rounded-full text-xs font-bold border border-violet-200/60"
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="flex items-center justify-center gap-2 text-rose-600 bg-rose-50 hover:bg-rose-100 py-3 rounded-full text-xs font-bold transition"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center bg-slate-100 text-slate-800 py-3 rounded-full text-xs font-bold hover:bg-slate-200 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white py-3 rounded-full text-xs font-bold shadow-md shadow-violet-500/20"
                >
                  <span>Register</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
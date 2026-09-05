"use client";

import React from 'react';
import { Home, ArrowLeft, Compass } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden">
      {/* Background Decor - Subtle Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header / Brand Minimal Strip */}
      <header className="px-8 py-6 relative z-10 max-w-7xl mx-auto w-full">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
          <Compass className="w-6 h-6 text-amber-500" />
          <span className="font-semibold text-lg tracking-tight">CAREER PORTAL</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 text-center py-12 my-auto">
        {/* Error Code Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-900/80 text-amber-400 text-sm font-medium mb-8 backdrop-blur-sm shadow-inner">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Error 404 — Page Not Found
        </div>

        {/* Large Display Title */}
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          Looking for a missing page?
        </h1>

        <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
          The page or resource you are seeking has been moved, renamed, or is temporarily unavailable. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 transition-all duration-200 shadow-lg shadow-amber-500/10 active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-semibold hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-all duration-200 active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Page
          </button>
        </div>

        {/* Helpful Links Grid */}
        <div className="mt-16 pt-12 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <Link 
            href="/services" 
            className="p-4 rounded-lg bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 transition-all group"
          >
            <h3 className="text-sm font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">Our Services</h3>
            <p className="text-xs text-slate-500 mt-1">Explore university admissions and guidance.</p>
          </Link>

          <Link 
            href="/study-destinations" 
            className="p-4 rounded-lg bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 transition-all group"
          >
            <h3 className="text-sm font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">Study Destinations</h3>
            <p className="text-xs text-slate-500 mt-1">Discover universities by location.</p>
          </Link>

          
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-6 relative z-10 max-w-7xl mx-auto w-full text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Career Portal. All rights reserved.
      </footer>
    </div>
  );
}
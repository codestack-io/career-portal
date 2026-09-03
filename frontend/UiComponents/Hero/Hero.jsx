"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, GraduationCap, Award, Compass } from "lucide-react";

export default function HomeHero() {
  return (
    <div className="relative overflow-hidden bg-slate-50 pt-32 pb-20">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="absolute top-1/3 -left-20 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-semibold text-violet-700">
          <Sparkles className="h-3.5 w-3.5 text-violet-600" />
          <span>Trusted by 10,000+ Students</span>
        </div>

        {/* Hero Title */}
        <h1 className="mt-8 text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          One step ahead of your <br />
          <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            career thinking
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
          Turn your study abroad dreams into a clear, actionable roadmap with expert admissions guidance and visa support.
        </p>

        {/* Call To Action Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/study-destinations"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:scale-105"
          >
            Explore Destinations
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >
            Contact Us
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
              <GraduationCap size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-900">Top Universities</h3>
              <p className="text-xs text-slate-500">Direct admission guidance</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Award size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-900">99% Visa Success</h3>
              <p className="text-xs text-slate-500">Proven track record</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600">
              <Compass size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-900">Scholarships</h3>
              <p className="text-xs text-slate-500">Up to 100% financial aid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
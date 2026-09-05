"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, GraduationCap, Award, Compass } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function HomeHero() {
  // Triggers the animation when the badge enters the viewport
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const cloudinaryImageUrl = "https://res.cloudinary.com/ciiop60x/image/upload/v1787893469/hero_qyozhd.jpg";

  return (
    <div className="relative overflow-hidden pt-32 pb-20 text-white min-h-[90vh] flex flex-col justify-center">
      {/* Cloudinary Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={cloudinaryImageUrl}
          alt="Study Abroad Background"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-950/90 via-red-600/80 to-rose-900/85 mix-blend-multiply" />
      <div className="absolute inset-0 -z-10 bg-slate-950/40" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        
        {/* Animated Badge */}
        <div 
          ref={ref}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-white"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span>
            Trusted by{" "}
            {inView ? (
              <CountUp start={0} end={10000} duration={2.5} separator="," />
            ) : (
              "0"
            )}
            + Students
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="mt-8 text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
          One step ahead of your <br />
          <span className="text-amber-300">
            career thinking
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-100/90 leading-relaxed font-normal">
          Turn your study abroad dreams into a clear, actionable roadmap with expert admissions guidance and visa support.
        </p>

        {/* Call To Action Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/study-destinations"
            className="group flex items-center gap-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 px-8 py-4 font-bold shadow-xl transition hover:scale-105"
          >
            <span>Explore Destinations</span>
            <span className="bg-slate-950 text-white p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
              <ArrowRight size={16} />
            </span>
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-8 py-4 font-semibold text-white transition hover:bg-white/20"
          >
            Contact Us
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 shadow-lg text-left">
            <div className="rounded-xl bg-violet-500/20 p-3 text-violet-300 border border-violet-400/30">
              <GraduationCap size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white">Top Universities</h3>
              <p className="text-xs text-slate-200">Direct admission guidance</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 shadow-lg text-left">
            <div className="rounded-xl bg-blue-500/20 p-3 text-blue-300 border border-blue-400/30">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white">99% Visa Success</h3>
              <p className="text-xs text-slate-200">Proven track record</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 shadow-lg text-left">
            <div className="rounded-xl bg-emerald-500/20 p-3 text-emerald-300 border border-emerald-400/30">
              <Compass size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white">Scholarships</h3>
              <p className="text-xs text-slate-200">Up to 100% financial aid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
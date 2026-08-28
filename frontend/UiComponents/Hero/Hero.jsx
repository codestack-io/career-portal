"use client";

import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, GraduationCap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export default function Hero({ hero }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  if (!hero) return null;

  return (
    <section ref={ref} className="relative min-h-[90vh] w-full overflow-hidden bg-slate-950 text-white">
      {/* 1. Full-Bleed Background Image with Deep Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.hero_image}
          alt={hero.title}
          className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        
        {/* Soft Vignette & Gradient Mask to ensure contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950/80 via-rose-950/50 to-transparent mix-blend-multiply" />
      </div>

      {/* Decorative Glow Orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 -right-20 h-96 w-96 rounded-full bg-rose-500/20 blur-[120px]" />

      {/* 2. Hero Content Area */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-6 pt-24 pb-16">
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Animated Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.1}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white shadow-2xl backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>{hero.badge?.replace(/[0-9,+/]+/g, "").trim()}</span>
              {inView && (
                <span className="font-bold text-amber-300">
                  <CountUp
                    end={hero.badge_count}
                    duration={2.5}
                    separator=","
                    suffix="+"
                  />
                </span>
              )}
            </div>
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.2}
            className="text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08]"
          >
            {hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.35}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-200 sm:text-xl font-normal leading-relaxed drop-shadow"
          >
            {hero.subtitle}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.5}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            {/* Primary Action Button */}
            <Link
              href={hero.primary_button_link || "#"}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-amber-400 px-8 py-4 font-bold text-slate-950 shadow-xl transition-all duration-300 hover:bg-amber-300 hover:shadow-amber-500/25 active:scale-95"
            >
              <span>{hero.primary_button_text}</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>

            {/* Secondary Action Button */}
            {hero.secondary_button_text && hero.secondary_button_link && (
              <Link
                href={hero.secondary_button_link}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white/20 active:scale-95"
              >
                {hero.secondary_button_text}
              </Link>
            )}
          </motion.div>
        </div>

        {/* 3. Floating Glass Cards (Bottom Highlight Bar) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Top Universities</p>
              <p className="text-xs text-slate-400">Direct admission guidance</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">99% Visa Success</p>
              <p className="text-xs text-slate-400">Proven track record</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <ArrowUpRight className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Scholarships</p>
              <p className="text-xs text-slate-400">Up to 100% financial aid</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
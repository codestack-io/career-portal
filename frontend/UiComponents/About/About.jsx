"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Flame } from "lucide-react";


export default function About({ about }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  if (!about) {
    return null;
  }

  const cloudinaryBgUrl =
    "https://res.cloudinary.com/ciiop60x/image/upload/v1785944827/bg-1_fpob5g.jpg";

  return (
    <section ref={ref} className="relative py-20 px-4 md:px-8 bg-slate-50/50">
      {/* Background Graphic */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-5">
        <Image
          src={cloudinaryBgUrl}
          alt="Background visual pattern"
          fill
          unoptimized
          className="object-contain mix-blend-multiply"
        />
      </div>

      {/* Main Unified Floating Container Card */}
      <div className="relative z-10 max-w-7xl mx-auto rounded-[36px] bg-white p-8 md:p-14 border border-slate-200/80 shadow-xl shadow-slate-900/5 overflow-hidden">
        
        {/* Glow Effects within Card */}
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-violet-200/30 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-200/30 blur-[100px] pointer-events-none" />

        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT: IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[480px] md:h-[560px] w-full overflow-hidden rounded-[28px]">
              <Image
                src={about.image}
                alt={about.title || "About us"}
                fill
                unoptimized
                className="object-cover object-center"
              />
            </div>

            {/* Glassmorphism Floating Experience Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-2 md:bottom-6 md:right-6 rounded-2xl bg-white/95 backdrop-blur-md p-6 shadow-xl border border-slate-100 flex items-center gap-4"
            >
              <div className="rounded-xl bg-amber-400/20 p-3 text-slate-950 font-bold">
               <Flame size={24} className="text-amber-500" />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-none">
                  {inView && (
                    <CountUp
                      end={Number(about.years_of_experience) || 16}
                      duration={2.5}
                      suffix="+"
                    />
                  )}
                </h3>
                <p className="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Years Experience
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: CONTENT & STAT TILES */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            {/* Pill Header Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-bold text-violet-700">
              <span>Who We Are</span>
            </div>

            {/* Section Title */}
            <h2 className="mt-6 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              {about.title || "One step ahead of your career thinking"}
            </h2>

            {/* Description */}
            <p className="mt-6 text-slate-600 text-base md:text-lg leading-relaxed font-normal">
              {about.description}
            </p>

            {/* Standard Primary Action CTA Button */}
            <div className="mt-8">
              <Link
                href="/about"
                className="group flex items-center gap-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 px-7 py-3.5 font-bold shadow-lg shadow-amber-400/20 transition hover:scale-105"
              >
                <span>Learn More</span>
                <span className="bg-slate-950 text-white p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>

            {/* Structured Stat Cards Grid */}
            <div className="mt-10 w-full grid grid-cols-2 gap-4">
              <StatTile
                end={about.students_recruited || 10000}
                suffix="+"
                title="Students Guided"
                inView={inView}
              />
              <StatTile
                end={98}
                suffix="%"
                title="Visa Success Rate"
                inView={inView}
              />
              <StatTile
                end={18}
                suffix="+"
                title="Study Destinations"
                inView={inView}
              />
              <StatTile
                end={about.university_partners || 500}
                suffix="+"
                title="Partner Universities"
                inView={inView}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}



function StatTile({ end, suffix, title, inView }) {
  const numericVal = typeof end === "string" ? end.replace(/[^0-9]/g, "") : end;

  return (
    <div className="rounded-2xl bg-slate-50/80 border border-slate-100 p-4 transition-all hover:bg-white hover:shadow-md">
      <h3 className="text-2xl md:text-3xl font-extrabold text-violet-600">
        {inView ? (
          <CountUp
            end={Number(numericVal) || 0}
            duration={2}
            suffix={suffix}
            separator=","
          />
        ) : (
          `0${suffix}`
        )}
      </h3>
      <p className="mt-1 text-xs font-semibold text-slate-500">{title}</p>
    </div>
  );
}
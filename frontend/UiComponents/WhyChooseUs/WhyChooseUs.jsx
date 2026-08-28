"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function WhyChooseUs({ 
  features = [], 
  stats = { experience: "15+", students: "20K+" } 
}) {
  const cardVariants = {
    rest: {},
    hover: {},
  };

  const iconVariants = {
    rest: {
      x: 0,
      rotate: 0,
      scale: 1,
    },
    hover: {
      x: [0, -35, 12, -8, 3, 0],
      rotate: [0, -10, 10, -6, 0],
      scale: [1, 1.2, 1.1, 1.15, 1.1],
      transition: {
        duration: 0.9,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 text-white">
      {/* Dynamic Background Glows matching /services palette */}
      <div className="pointer-events-none absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Pill Label */}
            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 font-semibold text-violet-400">
              Why Choose Us
            </span>

            {/* Main Title */}
            <h2 className="mt-6 text-5xl font-extrabold leading-tight text-white">
              Your Trusted Study Abroad Partner
            </h2>

            {/* Subtitle Description */}
            <p className="mt-7 text-lg leading-9 text-slate-400">
              We help students achieve their dream of studying abroad with
              expert counseling, university selection, scholarships, visa
              processing, and complete admission support.
            </p>

            {/* Dynamic Statistics */}
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <h3 className="text-5xl font-bold text-violet-500">
                  {stats.experience}
                </h3>
                <p className="mt-2 font-medium text-slate-400">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-5xl font-bold text-violet-500">
                  {stats.students}
                </h3>
                <p className="mt-2 font-medium text-slate-400">
                  Students Guided
                </p>
              </div>
            </div>

            {/* Dynamic CTA Redirect */}
            <Link
              href="/contact"
              className="mt-12 inline-flex items-center gap-3 rounded-full bg-violet-600 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:scale-105 hover:bg-violet-500"
            >
              Free Consultation
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* RIGHT CARDS GRID */}
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((item, index) => {
              // Ensure icon resolved safely
              const iconUrl = typeof item.icon === "string" ? item.icon : item.icon?.url;

              return (
                <motion.div
                  key={item.id || index}
                  variants={cardVariants}
                  initial="rest"
                  whileHover="hover"
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                  }}
                  className="group rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-violet-500/10"
                >
                  {/* Icon Card */}
                  {iconUrl && (
                    <motion.div
                      variants={iconVariants}
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-violet-500/20 bg-slate-800/80 shadow-md group-hover:border-violet-500/40"
                    >
                      <img
                        src={iconUrl}
                        alt={item.title}
                        className="h-10 w-10 object-contain"
                      />
                    </motion.div>
                  )}

                  <h3 className="text-2xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
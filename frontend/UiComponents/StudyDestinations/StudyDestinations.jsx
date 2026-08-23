"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* -----------------------------
   Country Card Component
------------------------------*/

function CountryCard({ country, index }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="group overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-5 text-slate-900 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all"
    >
      <div className="relative h-48 w-full overflow-hidden rounded-2xl">
        <img
          src={country.image}
          alt={country.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Flag Badge */}
        <motion.img
          src={country.flag}
          alt=""
          animate={{
            y: [0, -6, 0],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
          className="absolute left-4 top-4 h-12 w-12 rounded-full border-2 border-white object-cover shadow-md"
        />
      </div>

      {/* Card Info */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{country.name}</h3>
          {country.universities && (
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {country.universities} Universities
            </p>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-sm font-semibold text-violet-600 transition-transform group-hover:translate-x-1">
          <span>Explore</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </motion.div>
  );
}

export default function StudyDestinations({ destinations = [] }) {
  const marqueeUp = {
    animate: {
      y: ["0%", "-50%"],
      transition: {
        duration: 22,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  const marqueeDown = {
    animate: {
      y: ["-50%", "0%"],
      transition: {
        duration: 22,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  const [activeCountry, setActiveCountry] = useState(
    destinations[0] || null
  );

  if (!activeCountry) return null;

  const firstColumn = destinations.filter((_, i) => i % 2 === 0);
  const secondColumn = destinations.filter((_, i) => i % 2 !== 0);

  return (
    <section className="relative overflow-hidden py-24 text-slate-900">
      {/* Background Ambient Glows */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-400/10 blur-[140px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold text-violet-700">
              Study Destinations
            </span>

            <h2 className="mt-6 text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Global Study <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
                Destinations
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-600">
              Discover the world&apos;s leading education destinations and
              achieve your dream with expert admission guidance.
            </p>

            {/* Standardized Gradient Button */}
            <button className="mt-8 flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/30">
              <span>Explore Destinations</span>
              <ArrowRight size={18} />
            </button>

            {/* Statistics */}
            <div className="mt-14 grid grid-cols-3 gap-8 border-t border-slate-200/80 pt-8">
              <div>
                <h3 className="text-4xl font-black text-slate-900">
                  {destinations.length}+
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  Countries
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-slate-900">
                  500+
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  Universities
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-slate-900">
                  20K+
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  Students
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT MARQUEE */}
          <div className="relative h-[680px] overflow-hidden">
            {/* Top Fade Mask */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 z-20 h-24 bg-gradient-to-b from-slate-50 via-slate-50/80 to-transparent" />

            {/* Bottom Fade Mask */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent" />

            <div className="grid grid-cols-2 gap-6">
            {/* LEFT COLUMN */}
<motion.div
  variants={marqueeUp}
  animate="animate"
  className="flex flex-col gap-6"
>
  {[...firstColumn, ...firstColumn].map((country, index) => (
    <CountryCard
      key={`${country.id || country.name}-${index}-left`}
      country={country}
      index={index}
    />
  ))}
</motion.div>

{/* RIGHT COLUMN */}
<motion.div
  variants={marqueeDown}
  animate="animate"
  className="mt-16 flex flex-col gap-6"
>
  {[...secondColumn, ...secondColumn].map((country, index) => (
    <CountryCard
      key={`${country.id || country.name}-${index}-right`}
      country={country}
      index={index}
    />
  ))}
</motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
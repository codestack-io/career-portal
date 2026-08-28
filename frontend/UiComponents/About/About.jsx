"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function About({ about }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Prevent crash if API returns null
  if (!about) {
    return null;
  }

  // PASTE YOUR CLOUDINARY IMAGE URL HERE
  const cloudinaryBgUrl =
    "https://res.cloudinary.com/ciiop60x/image/upload/v1785944827/bg-1_fpob5g.jpg";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-28"
    >
      {/* 1. Centered Cloudinary Background Image */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-10">
        <img
          src={cloudinaryBgUrl}
          alt="About background graphic"
          className="h-full w-full max-w-6xl object-contain mix-blend-multiply"
        />
      </div>

      {/* Background Fade Overlays */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-white/60 to-white"
        aria-hidden="true"
      />

      {/* Background Glow Decorations */}
      <div className="absolute -top-32 -left-40 h-[420px] w-[420px] rounded-full bg-violet-200/40 blur-[120px]" />
      <div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-[120px]" />
      <div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-violet-100/40 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src={about.image}
              alt={about.title || "About us"}
              className="h-[620px] w-full rounded-[32px] object-cover shadow-2xl"
            />

            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 rounded-3xl bg-white p-8 shadow-xl border border-slate-100"
            >
              <h2 className="text-5xl font-bold text-violet-600">
                {inView && (
                  <CountUp
                    end={Number(about.years_of_experience) || 10}
                    duration={2.5}
                    suffix="+"
                  />
                )}
              </h2>

              <p className="mt-2 text-slate-500 font-medium">
                Years Experience
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Label */}
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 rounded-full bg-violet-500" />
              <span className="rounded-full bg-violet-100 px-5 py-2 font-semibold text-violet-700">
                About Us
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900">
              {about.title}
            </h2>

            {/* Description */}
            <p className="mt-8 text-lg leading-8 text-slate-600">
              {about.description}
            </p>

            {/* Button */}
            <Link
              href="/about"
              className="mt-10 inline-flex rounded-full bg-violet-600 px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-violet-700 shadow-lg shadow-violet-500/20"
            >
              Learn More →
            </Link>

            {/* Statistics */}
            <div className="mt-16 grid grid-cols-2 gap-6">
              <Stat
                end={about.students_recruited}
                suffix="+"
                title="Students Guided"
                inView={inView}
              />

              <Stat
                end={98}
                suffix="%"
                title="Visa Success Rate"
                inView={inView}
              />

              <Stat
                end={18}
                suffix="+"
                title="Study Destinations"
                inView={inView}
              />

              <Stat
                end={about.university_partners}
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

/* =========================
   STAT COMPONENT
========================= */

function Stat({ end, suffix, title, inView }) {
  // Strip non-numeric characters so CountUp gets a valid number
  const numericVal = typeof end === "string" ? end.replace(/[^0-9]/g, "") : end;

  return (
    <div>
      <h3 className="text-4xl font-bold text-violet-600">
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

      <p className="mt-2 text-slate-500 font-medium">
        {title}
      </p>
    </div>
  );
}
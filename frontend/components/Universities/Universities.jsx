"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Universities({ universities = [] }) {
  const [isPaused, setIsPaused] = useState(false);

  // Fallback check to ensure 'universities' is an array
  const list = Array.isArray(universities) ? universities : [];

  if (list.length === 0) {
    return null;
  }

  // Duplicate for seamless infinite scrolling loop
  const duplicatedList = [...list, ...list];

  // 1. PASTE YOUR CLOUDINARY URL HERE
  const cloudinaryBgUrl = "https://res.cloudinary.com/ciiop60x/image/upload/v1785944827/bg-1_fpob5g.jpg";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-violet-50 py-28">
      {/* Background Glows */}
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-violet-300/20 blur-[160px]" />
      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-300/20 blur-[160px]" />

      {/* Cloudinary Background Image (Centered) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
        <img
          src={cloudinaryBgUrl}
          alt="Background graphics"
          className="h-full w-full max-w-5xl object-contain mix-blend-multiply"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700">
            Partner Universities
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-slate-900">
            Study at World-Class Universities
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We proudly partner with internationally recognized universities
            to help students achieve their dream of studying abroad.
          </p>
        </motion.div>

        {/* Universities Slider */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            animate={isPaused ? { x: "0%" } : { x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex w-max gap-8 py-4"
          >
            {duplicatedList.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                className="group relative w-[320px] overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-xl"
              >
                {/* Glow Effects */}
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-500/20 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute -left-16 -bottom-16 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Logo Section */}
                <div className="flex h-56 items-center justify-center bg-gradient-to-br from-slate-50 to-violet-50">
                  <motion.img
                    src={item.logo}
                    alt={item.name}
                    whileHover={{
                      rotate: [0, -10, 8, -5, 0],
                      scale: 1.15,
                      y: -8,
                    }}
                    transition={{ duration: 0.8 }}
                    className="h-32 w-32 object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-7">
                  <span className="rounded-full bg-violet-100 px-4 py-1 text-sm font-semibold text-violet-700">
                    {item.country}
                  </span>

                  <h3 className="mt-5 text-2xl font-bold text-slate-900">
                    {item.name}
                  </h3>

                  <p className="mt-4 line-clamp-3 leading-7 text-slate-600">
                    {item.short_description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
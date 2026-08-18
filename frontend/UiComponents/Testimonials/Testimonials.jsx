"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, User, ChevronDown, ChevronUp } from "lucide-react";

export default function Testimonials({ testimonials = [] }) {
  const [showAll, setShowAll] = useState(false);

  const testimonialList = Array.isArray(testimonials)
    ? testimonials
    : testimonials?.results || [];

  if (!testimonialList || testimonialList.length === 0) return null;

  // Show initial 6 testimonials on homepage, toggle to full list
  const displayedTestimonials = showAll
    ? testimonialList
    : testimonialList.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-violet-50 py-28">
      {/* Background Blobs */}
      <div className="absolute -top-40 left-0 h-[420px] w-[420px] rounded-full bg-violet-300/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-300/20 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="rounded-full bg-violet-100 px-5 py-2 font-semibold text-violet-700">
            Testimonials
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">
            What Our Students Say
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Thousands of students have trusted us for admissions,
            scholarships and visa guidance. Here&apos;s what they think.
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {displayedTestimonials.map((item, index) => {
            const starCount = Math.max(1, Math.min(5, Number(item.rating) || 5));
            const universityName =
              typeof item.university === "object"
                ? item.university?.name
                : item.university;

            return (
              <motion.div
                key={item.id || index}
                initial={{
                  opacity: 0,
                  y: -100,
                  scale: 0.9,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: (index % 6) * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: 10,
                  scale: 1.03,
                  transition: {
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                  },
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300"
              >
                {/* Background Glow */}
                <motion.div
                  className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-gradient-to-r from-violet-500/30 to-blue-500/30 blur-3xl"
                  initial={{ scale: 0.6, opacity: 0.2 }}
                  whileHover={{ scale: 1.4, opacity: 0.6 }}
                  transition={{ duration: 0.5 }}
                />

                <div>
                  {/* Movable Animated Quote Icon */}
                  <motion.div
                    initial={{ y: 0, rotate: 0 }}
                    whileHover={{
                      y: [-4, 4, -4],
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    className="mb-6 inline-block"
                  >
                    <Quote size={40} className="text-violet-500 opacity-30 transition-colors group-hover:opacity-80" />
                  </motion.div>

                  {/* Review Text */}
                  <p className="leading-8 text-slate-600">
                    &ldquo;{item.feedback}&rdquo;
                  </p>

                  {/* Rating Stars */}
                  <div className="mt-6 flex gap-1">
                    {[...Array(starCount)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
                  {item.image ? (
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="h-14 w-14 rounded-full border-2 border-violet-500 object-cover shadow-md"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-violet-500 bg-violet-50 text-violet-600 shadow-md">
                      <User size={24} />
                    </div>
                  )}

                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {item.name}
                    </h4>

                    {item.designation && (
                      <p className="text-sm font-medium text-violet-600">
                        {item.designation}
                      </p>
                    )}

                    {universityName && (
                      <p className="text-xs text-slate-500">
                        {universityName}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Inline Toggle Button */}
        {testimonialList.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-7 py-3 font-semibold text-violet-700 hover:bg-violet-100 transition-colors shadow-sm"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp size={18} />
                </>
              ) : (
                <>
                  View More Testimonials ({testimonialList.length - 6} more) <ChevronDown size={18} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
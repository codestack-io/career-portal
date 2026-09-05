"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star, User, ChevronDown, ChevronUp } from "lucide-react";

export default function Testimonials({ testimonials = [] }) {
  const [showAll, setShowAll] = useState(false);

  const CLOUDINARY_BG_URL = "https://res.cloudinary.com/ciiop60x/image/upload/v1785944827/bg-1_fpob5g.jpg";
  const testimonialList = Array.isArray(testimonials)
    ? testimonials
    : testimonials?.results || [];

  if (!testimonialList || testimonialList.length === 0) return null;

  // Show initial 6 testimonials on homepage, toggle to full list
  const displayedTestimonials = showAll
    ? testimonialList
    : testimonialList.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-violet-50 py-12 md:py-16">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-2"
        style={{ backgroundImage: `url('${CLOUDINARY_BG_URL}')` }}
      />
      
      {/* Background Blobs */}
      <div className="absolute -top-40 left-0 h-[320px] w-[320px] rounded-full bg-violet-300/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-blue-300/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading Container */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold text-violet-700">
            Testimonials
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">
            What Our Students Say
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-6 text-slate-600">
            Thousands of students have trusted us for admissions,
            scholarships and visa guidance. Here&apos;s what they think.
          </p>
        </motion.div>

        {/* Cards Container */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
                  y: 30,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: (index % 6) * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  scale: 1.01,
                  transition: {
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                  },
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-md transition-all duration-300 hover:border-violet-300 hover:shadow-xl"
              >
                {/* Background Glow */}
                <motion.div
                  className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-gradient-to-r from-violet-500/20 to-blue-500/20 blur-3xl"
                  initial={{ scale: 0.6, opacity: 0.2 }}
                  whileHover={{ scale: 1.4, opacity: 0.6 }}
                  transition={{ duration: 0.5 }}
                />

                <div>
                  {/* Movable Animated Quote Icon */}
                  <motion.div
                    initial={{ y: 0, rotate: 0 }}
                    whileHover={{
                      y: [-2, 2, -2],
                      rotate: [0, -6, 6, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    className="mb-3 inline-block"
                  >
                    <Quote size={32} className="text-violet-500 opacity-40 transition-colors group-hover:opacity-80" />
                  </motion.div>

                  {/* Review Text */}
                  <p className="text-sm leading-6 text-slate-600">
                    &ldquo;{item.feedback}&rdquo;
                  </p>

                  {/* Rating Stars */}
                  <div className="mt-4 flex gap-1">
                    {[...Array(starCount)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                  {item.image ? (
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="h-11 w-11 rounded-full border-2 border-violet-500 object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-violet-500 bg-violet-50 text-violet-600 shadow-sm">
                      <User size={20} />
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.name}
                    </h4>

                    {item.designation && (
                      <p className="text-xs font-medium text-violet-600">
                        {item.designation}
                      </p>
                    )}

                    {universityName && (
                      <p className="text-[11px] text-slate-500">
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
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-6 py-2.5 text-xs font-semibold text-violet-700 hover:bg-violet-100 transition-colors shadow-sm"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp size={16} />
                </>
              ) : (
                <>
                  View More Testimonials ({testimonialList.length - 6} more) <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
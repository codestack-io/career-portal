"use client";

import { useSyncExternalStore } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Building2, CheckCircle2, GraduationCap, Globe, Award } from "lucide-react";

const iconMap = {
  "building-2": Building2,
  "check-circle-2": CheckCircle2,
  "graduation-cap": GraduationCap,
  "globe": Globe,
};

export default function Statistics({ statistics = [] }) {
  const hasMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Return a static placeholder matching the initial markup layout before mount
  if (!hasMounted) {
    return (
      <section className="relative overflow-hidden bg-slate-50/50 py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16 text-center">
            <span className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-purple-700">
              Our Achievements
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Trusted By Thousands
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
              We have successfully helped thousands of students build their international education journey.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((item, index) => {
              const IconComponent = iconMap[item.icon?.toLowerCase()] || Award;
              return (
                <div
                  key={item.id || index}
                  className="group relative flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-sm"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                    <IconComponent size={32} className="stroke-[2]" />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    0
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-semibold text-slate-600">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-16 sm:py-24">
      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Unified Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-purple-700">
            Our Achievements
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Trusted By Thousands
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            We have successfully helped thousands of students build their international education journey.
          </p>
        </motion.div>

        {/* Cards Grid Matching Design System */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((item, index) => {
            const IconComponent = iconMap[item.icon?.toLowerCase()] || Award;

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
              >
                {/* Unified Icon Style */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 transition-transform duration-300 group-hover:scale-110">
                  <IconComponent size={32} className="stroke-[2]" />
                </div>

                {/* Counter & Suffix */}
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {inView ? (
                    <>
                      <CountUp
                        end={Number(item.value) || 0}
                        duration={2}
                        separator=","
                      />
                      <span className="text-purple-600">{item.suffix || ""}</span>
                    </>
                  ) : (
                    "0"
                  )}
                </h3>

                {/* Title */}
                <p className="mt-2 text-sm sm:text-base font-semibold text-slate-600">
                  {item.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
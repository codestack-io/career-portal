"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, GraduationCap, Building2 } from "lucide-react";

const TERMINALS = [
  { key: "student", label: "Student Services", icon: GraduationCap },
  { key: "university", label: "University Services", icon: Building2 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function ServiceCard({ service }) {
  const categoryName =
    typeof service.category === "object"
      ? service.category?.name
      : service.category;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -10,
        scale: 1.02,
        rotateX: 3,
        rotateY: -3,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative h-full"
    >
      {/* Outer Gradient Glow */}
      <div className="pointer-events-none absolute -inset-px rounded-[28px] bg-gradient-to-br from-violet-500/40 via-blue-500/20 to-transparent opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

      <div
        className="
          relative flex h-full flex-col rounded-[28px] border border-slate-200/80
          bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-500
          group-hover:border-violet-200 group-hover:bg-white
          group-hover:shadow-[0_20px_50px_rgba(99,102,241,.15)]
        "
      >
        {/* Service Icon */}
        <div className="mb-6">
          <motion.div
            whileHover={{
              rotate: [0, -10, 8, -4, 0],
              scale: 1.08,
            }}
            transition={{ duration: 0.6 }}
            className="
              flex h-16 w-16 items-center justify-center rounded-2xl
              bg-gradient-to-br from-violet-100 via-slate-50 to-blue-100
              border border-violet-100/60 shadow-inner
            "
          >
            {service.icon ? (
              <img
                src={service.icon}
                alt={service.title}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <Sparkles className="h-7 w-7 text-violet-600" />
            )}
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
          {service.title}
        </h3>

        {/* Category Badge */}
        {categoryName && (
          <span className="mb-4 inline-flex w-fit rounded-full bg-violet-100/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-700">
            {categoryName}
          </span>
        )}

        {/* Description */}
        <p className="mb-8 flex-1 text-sm leading-relaxed text-slate-600">
          {service.description}
        </p>

        {/* Action Link */}
        <Link
          href={`/services/${service.slug || service.id}`}
          className="
            inline-flex w-fit items-center gap-1.5 text-sm font-semibold
            text-violet-600 transition-all duration-300
            group-hover:gap-2.5 group-hover:text-violet-700
          "
        >
          Learn More
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Services({ initialServices = [] }) {
  const [activeTerminal, setActiveTerminal] = useState("student");

  // Filter & Sort services based on active terminal
  const filteredServices = useMemo(() => {
    if (!Array.isArray(initialServices)) return [];

    return initialServices
      .filter((s) => {
        if (s.is_active === false) return false;
        if (!s.category) return true;

        const categorySlug =
          typeof s.category === "object"
            ? (s.category.slug || s.category.name || "").toLowerCase()
            : String(s.category).toLowerCase();

        return categorySlug.includes(activeTerminal.toLowerCase());
      })
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  }, [initialServices, activeTerminal]);

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] px-6 py-24 sm:px-10 lg:px-16">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-violet-200/40 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-600">
            <Sparkles className="h-3.5 w-3.5" />
            Our Services
          </span>

          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Everything you need for a{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              successful
            </span>{" "}
            journey abroad
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            From your first application to settling in, our experts guide you
            through every step of studying and building a career overseas.
          </p>
        </motion.div>

        {/* Terminal Switcher Tabs */}
        <div className="mb-14 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-200/70 p-1.5 border border-slate-300/50 backdrop-blur-md">
            {TERMINALS.map((t) => {
              const isActive = t.key === activeTerminal;
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTerminal(t.key)}
                  className={`relative flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 shadow-md shadow-violet-500/20"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTerminal}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-slate-500">
                No services available under this category.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
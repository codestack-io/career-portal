"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function ServiceCard({ service }) {
  // Safely extract string label whether category is an object or a plain string
  const categoryName =
    typeof service.category === "object"
      ? service.category?.name
      : service.category;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -14,
        scale: 1.03,
        rotateX: 4,
        rotateY: -4,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative h-full"
    >
      {/* Glow ring on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-[28px] bg-gradient-to-br from-violet-500/40 via-blue-500/20 to-transparent opacity-0 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

      <div
        className="
          relative flex h-full flex-col rounded-[28px] border border-slate-200/70
          bg-white/70 p-8 shadow-[0_2px_8px_rgba(15,23,42,0.04)]
          backdrop-blur-xl transition-all duration-500
          group-hover:border-violet-200 group-hover:bg-white/90
          group-hover:shadow-[0_30px_70px_rgba(99,102,241,.22)]
        "
      >
        {/* Icon */}
        <div className="mb-7">
          <motion.div
            whileHover={{
              rotate: [0, -12, 10, -6, 0],
              scale: 1.12,
              x: [-4, 6, -3, 0],
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              flex h-20 w-20 items-center justify-center
              rounded-3xl
              bg-gradient-to-br
              from-violet-100
              via-white
              to-blue-100
              shadow-xl
            "
          >
            <img
              src={service.icon}
              alt={service.title}
              className="h-20 w-20 object-contain"
            />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-900">
          {service.title}
        </h3>

        {/* Category Badge */}
        {categoryName && (
          <span className="mb-4 inline-flex w-fit rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-700">
            {categoryName}
          </span>
        )}

        {/* Description */}
        <p className="mb-8 flex-1 text-[15px] leading-relaxed text-slate-500">
          {service.description}
        </p>

        {/* Learn more link */}
        <a
          href="#"
          className="
            inline-flex w-fit items-center gap-1.5 text-sm font-medium
            text-violet-600 transition-all duration-300
            group-hover:gap-2.5 group-hover:text-violet-700
          "
        >
          Learn More
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Services({ services }) {
  const data =
    services
      ?.filter((s) => s.is_active)
      ?.sort((a, b) => a.display_order - b.display_order) || [];

  const cloudinaryBgUrl =
    "https://res.cloudinary.com/ciiop60x/image/upload/v1785944828/bg-2_rue33e.jpg";

  return (
    <section className="relative overflow-hidden bg-[#F8FAFF] px-6 py-28 sm:px-10 lg:px-16">
      {/* Ambient background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-violet-200/40 to-transparent blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-blue-200/40 to-transparent blur-3xl" />
      </div>

      {/* Centered Cloudinary Background Image */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15">
        <img
          src={cloudinaryBgUrl}
          alt="Services background image"
          className="h-full w-full max-w-5xl object-contain opacity-30"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span
            className="
              mb-5 inline-flex items-center gap-2 rounded-full border
              border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-medium
              tracking-wide text-violet-600
            "
          >
            <Sparkles className="h-3.5 w-3.5" />
            Our Services
          </span>

          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Everything you need for a{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              successful
            </span>{" "}
            journey abroad
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-slate-500">
            From your first application to settling in, our experts guide you
            through every step of studying and building a career overseas.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  FileText,
  Award,
  Plane,
  BookOpen,
  Users,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

/**
 * Maps icon names coming from the Django backend (service.icon)
 * to the actual lucide-react component. Add new entries here as
 * new services / icons are introduced in the CMS.
 */
const ICON_MAP = {
  GraduationCap,
  FileText,
  Award,
  Plane,
  BookOpen,
  Users,
};

const FALLBACK_ICON = Sparkles;

/**
 * Default services used when no `services` prop is supplied
 * (e.g. during local development before the Django API is wired up).
 * Shape mirrors exactly what the API returns.
 */
const DEFAULT_SERVICES = [
  {
    id: 1,
    title: "University Admission",
    description:
      "Help students choose the right university and complete applications successfully.",
    icon: "GraduationCap",
    order: 1,
    is_active: true,
  },
  {
    id: 2,
    title: "Visa Processing",
    description: "Complete visa documentation and application support.",
    icon: "FileText",
    order: 2,
    is_active: true,
  },
  {
    id: 3,
    title: "Scholarship Assistance",
    description: "Find scholarships and prepare scholarship applications.",
    icon: "Award",
    order: 3,
    is_active: true,
  },
  {
    id: 4,
    title: "Pre Departure Guidance",
    description:
      "Accommodation, travel planning and orientation before departure.",
    icon: "Plane",
    order: 4,
    is_active: true,
  },
  {
    id: 5,
    title: "IELTS & Language Preparation",
    description:
      "Training and guidance for IELTS and other English proficiency exams.",
    icon: "BookOpen",
    order: 5,
    is_active: true,
  },
  {
    id: 6,
    title: "Career Counseling",
    description:
      "Personalized counseling based on academic background and career goals.",
    icon: "Users",
    order: 6,
    is_active: true,
  },
];

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
  const Icon = ICON_MAP[service.icon] || FALLBACK_ICON;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.015 }}
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
          group-hover:shadow-[0_24px_48px_-12px_rgba(124,58,237,0.25)]
        "
      >
        {/* Icon */}
        <div className="mb-7">
          <motion.div
            whileHover={{ rotate: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="
              relative flex h-14 w-14 items-center justify-center rounded-2xl
              bg-gradient-to-br from-violet-600 to-blue-600
              shadow-[0_8px_20px_-4px_rgba(124,58,237,0.45)]
            "
          >
            <Icon className="h-6 w-6 text-white" strokeWidth={2} />
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-900">
          {service.title}
        </h3>

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
  const data = (
    services && services.length ? services : DEFAULT_SERVICES
  )
    .filter((s) => s.is_active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <section className="relative overflow-hidden bg-[#F8FAFF] px-6 py-28 sm:px-10 lg:px-16">
      {/* Ambient background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-violet-200/40 to-transparent blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-blue-200/40 to-transparent blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
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
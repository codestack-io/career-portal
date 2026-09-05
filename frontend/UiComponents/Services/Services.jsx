"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function stripHtml(value) {
  if (!value) return "";
  return value
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
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

  const description = stripHtml(service.description);

  return (
    <motion.div variants={cardVariants} className="group relative h-full">
      {/* Light-slate tile card with clean hover states */}
      <div className="relative flex h-full flex-col rounded-2xl border border-slate-200/70 bg-slate-50/80 p-7 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-violet-200 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-violet-500/10">
        
        {/* Icon & Category Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2.5 shadow-sm border border-slate-100 group-hover:border-violet-100 group-hover:bg-violet-50/50 transition-colors">
            {service.icon ? (
              <img
                src={service.icon}
                alt={service.title}
                className="h-full w-full object-contain"
              />
            ) : (
              <Sparkles className="h-6 w-6 text-violet-600" />
            )}
          </div>

          {categoryName && (
            <span className="rounded-full bg-violet-100/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-violet-700">
              {categoryName}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-900 group-hover:text-violet-700 transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
          {description}
        </p>

        {/* Card CTA Link */}
        <Link
          href={`/services/${service.slug || service.id}`}
          className="inline-flex w-fit items-center gap-1.5 text-xs font-bold text-violet-600 transition-all duration-300 group-hover:gap-2.5 group-hover:text-violet-800"
        >
          <span>Learn More</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Services({ services = [] }) {
  const data =
    services
      ?.filter((s) => s.is_active)
      ?.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
      ?.slice(0, 6) || [];

  const cloudinaryBgUrl =
    "https://res.cloudinary.com/ciiop60x/image/upload/v1785944828/bg-2_rue33e.jpg";

  return (
    <section className="relative py-20 px-4 md:px-8 bg-slate-50/50">
      {/* Background Graphic */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-5">
        <Image
          src={cloudinaryBgUrl}
          alt="Services background graphic"
          fill
          unoptimized
          className="object-contain mix-blend-multiply"
        />
      </div>

      {/* Main Unified Floating Container Card */}
      <div className="relative z-10 max-w-7xl mx-auto rounded-[36px] bg-white p-8 md:p-14 border border-slate-200/80 shadow-xl shadow-slate-900/5 overflow-hidden">
        
        {/* Glow Decorators inside Card */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-violet-200/30 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-200/30 blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-bold text-violet-700">
            <Sparkles className="h-3.5 w-3.5 text-violet-600" />
            <span>Our Services</span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl leading-tight">
            Everything you need for a{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              successful
            </span>{" "}
            journey abroad
          </h2>

          <p className="mt-4 text-base md:text-lg leading-relaxed text-slate-500">
            From your first application to settling in, our experts guide you
            through every step of studying and building a career overseas.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* Section Action Button */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 px-8 py-3.5 text-sm font-bold shadow-lg shadow-amber-400/20 transition-all duration-300 hover:scale-105"
          >
            <span>View All Services</span>
            <span className="bg-slate-950 text-white p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
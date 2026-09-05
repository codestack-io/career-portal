"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock3,
  ArrowUpRight,
  User,
} from "lucide-react";

export default function Blogs({ blogs = [] }) {
  if (!blogs.length) return null;

  const featured = blogs[0];
  const others = blogs.slice(1);

  const getAuthorName = (author) => {
    if (!author) return "Admin";
    if (typeof author === "object") {
      return author.username || author.email || "Admin";
    }
    return author;
  };

  const getCategoryName = (category) => {
    if (!category) return "General";
    if (typeof category === "object") {
      return category.name || "General";
    }
    return category;
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-50 py-16 md:py-24">
      {/* Container Background Pattern Layer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-8 sm:p-12 shadow-sm backdrop-blur-sm">
          
          {/* Subtle Geometric Background Blur Orbs */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10 text-center flex flex-col items-center"
          >
            <span className="inline-block rounded-full bg-violet-100/80 px-4 py-1 text-xs font-semibold text-violet-700 uppercase tracking-wider">
              Latest Articles
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Insights & <span className="text-violet-600">Study Abroad Guides</span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-slate-600">
              Explore expert advice, admission tips, scholarship updates,
              and visa guidance to help you achieve your dream.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">

            {/* Featured Article Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group lg:col-span-7 flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div>
                {/* Featured Image */}
                {featured.featured_image && (
                  <Link href={`/blogs/${featured.slug}`}>
                    <div className="relative overflow-hidden cursor-pointer h-64 sm:h-80 w-full">
                      <img
                        src={featured.featured_image}
                        alt={featured.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                )}

                <div className="p-6 sm:p-8">
                  <span className="inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
                    {getCategoryName(featured.category)}
                  </span>

                  <Link href={`/blogs/${featured.slug}`}>
                    <h3 className="mt-3 text-xl sm:text-2xl font-bold text-slate-900 transition hover:text-violet-600 cursor-pointer leading-snug">
                      {featured.title}
                    </h3>
                  </Link>

                  {featured.short_description && (
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {featured.short_description}
                    </p>
                  )}
                </div>
              </div>

              {/* Meta Details & Link */}
              <div className="p-6 sm:p-8 pt-0">
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <User size={14} className="text-violet-600" />
                      {getAuthorName(featured.author)}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-violet-600" />
                      {featured.published_date}
                    </span>

                    {featured.read_time && (
                      <span className="flex items-center gap-1.5">
                        <Clock3 size={14} className="text-violet-600" />
                        {featured.read_time}
                      </span>
                    )}
                  </div>

                  <Link 
                    href={`/blogs/${featured.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 transition hover:text-violet-800"
                  >
                    Read Article
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Side Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {others.map((blog, index) => (
                <motion.div
                  key={blog.id || blog.slug}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                  className="group flex gap-4 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm transition-all duration-300 hover:shadow-md items-center"
                >
                  {blog.featured_image && (
                    <Link href={`/blogs/${blog.slug}`} className="shrink-0 cursor-pointer">
                      <div className="overflow-hidden rounded-lg h-20 w-24 sm:h-24 sm:w-28">
                        <img
                          src={blog.featured_image}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          alt={blog.title}
                        />
                      </div>
                    </Link>
                  )}

                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-violet-600">
                      {getCategoryName(blog.category)}
                    </span>

                    <Link href={`/blogs/${blog.slug}`}>
                      <h4 className="mt-0.5 line-clamp-2 text-xs sm:text-sm font-bold text-slate-900 transition hover:text-violet-600 cursor-pointer leading-snug">
                        {blog.title}
                      </h4>
                    </Link>

                    <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <User size={12} className="text-violet-600" />
                        {getAuthorName(blog.author)}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {blog.published_date}
                      </span>

                      {blog.read_time && (
                        <span className="flex items-center gap-1">
                          <Clock3 size={12} />
                          {blog.read_time}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

          {/* View All Articles Action Button */}
          <div className="mt-10 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-7 py-3 text-xs font-semibold text-white shadow-md transition-all hover:bg-violet-700 hover:shadow-lg hover:scale-105"
            >
              View All Articles
              <ArrowUpRight size={15} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
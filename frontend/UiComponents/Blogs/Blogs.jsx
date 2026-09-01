"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock3,
  ArrowRight,
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
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-violet-50 py-12 sm:py-16">

      {/* Decorative Background */}
      <div className="absolute -left-44 top-0 h-[320px] w-[320px] rounded-full bg-violet-300/20 blur-[120px]" />
      <div className="absolute -right-44 bottom-0 h-[320px] w-[320px] rounded-full bg-blue-300/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <span className="rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold text-violet-700 uppercase tracking-wider">
            Latest Articles
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Insights & Study Abroad Guides
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
            Explore expert advice, admission tips, scholarship updates,
            and visa guidance to help you achieve your dream.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3 items-start">

          {/* Featured Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="group lg:col-span-2 overflow-hidden rounded-3xl bg-white shadow-xl h-auto"
          >
            {/* WRAPPED FEATURED IMAGE WITH LINK */}
            {featured.featured_image && (
              <Link href={`/blogs/${featured.slug}`}>
                <div className="overflow-hidden cursor-pointer">
                  <img
                    src={featured.featured_image}
                    alt={featured.title}
                    className="h-64 sm:h-80 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              </Link>
            )}

            <div className="p-6 sm:p-8">
              <span className="rounded-full bg-violet-100 px-3.5 py-1 text-xs font-semibold text-violet-700">
                {getCategoryName(featured.category)}
              </span>

              {/* WRAPPED TITLE WITH LINK */}
              <Link href={`/blogs/${featured.slug}`}>
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900 transition hover:text-violet-600 cursor-pointer leading-snug">
                  {featured.title}
                </h3>
              </Link>

              {/* Safe Conditional Short Description */}
              {featured.short_description && (
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 line-clamp-3">
                  {featured.short_description}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-500 border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <User size={15} className="text-violet-600" />
                  {getAuthorName(featured.author)}
                </span>

                <span className="flex items-center gap-1.5">
                  <Calendar size={15} className="text-violet-600" />
                  {featured.published_date}
                </span>

                {featured.read_time && (
                  <span className="flex items-center gap-1.5">
                    <Clock3 size={15} className="text-violet-600" />
                    {featured.read_time}
                  </span>
                )}
              </div>

              {/* READ ARTICLE BUTTON LINK */}
              <Link 
                href={`/blogs/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet-600 transition hover:text-violet-800"
              >
                Read Article
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>

          {/* Right Side Cards */}
          <div className="space-y-4">
            {others.map((blog, index) => (
              <motion.div
                key={blog.id || blog.slug}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 4 }}
                className="group flex gap-4 rounded-2xl bg-white p-4 shadow-lg border border-slate-100 items-center"
              >
                {/* WRAPPED SIDE CARD IMAGE WITH LINK */}
                {blog.featured_image && (
                  <Link href={`/blogs/${blog.slug}`} className="shrink-0 cursor-pointer">
                    <img
                      src={blog.featured_image}
                      className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl object-cover transition duration-500 group-hover:scale-105"
                      alt={blog.title}
                    />
                  </Link>
                )}

                <div className="flex flex-col justify-center min-w-0 flex-1">
                  <span className="text-xs font-semibold text-violet-600">
                    {getCategoryName(blog.category)}
                  </span>

                  {/* WRAPPED SIDE CARD TITLE WITH LINK */}
                  <Link href={`/blogs/${blog.slug}`}>
                    <h4 className="mt-1 line-clamp-2 text-sm sm:text-base font-bold transition hover:text-violet-600 cursor-pointer text-slate-900 leading-snug">
                      {blog.title}
                    </h4>
                  </Link>

                  {blog.short_description && (
                    <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                      {blog.short_description}
                    </p>
                  )}

                  <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {blog.published_date}
                    </span>

                    {blog.read_time && (
                      <span className="flex items-center gap-1">
                        <Clock3 size={13} />
                        {blog.read_time}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* View All Articles Link */}
        <div className="mt-10 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
          >
            View All Articles
            <ArrowRight size={16}/>
          </Link>
        </div>

      </div>
    </section>
  );
}
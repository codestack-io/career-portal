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

  // Helper function to safely extract author display name
  const getAuthorName = (author) => {
    if (!author) return "Admin";
    if (typeof author === "object") {
      return author.username || author.email || "Admin";
    }
    return author;
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-violet-50 py-28">

      {/* Decorative Background */}
      <div className="absolute -left-44 top-0 h-[420px] w-[420px] rounded-full bg-violet-300/20 blur-[160px]" />

      <div className="absolute -right-44 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-300/20 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >

          <span className="rounded-full bg-violet-100 px-5 py-2 font-semibold text-violet-700">
            Latest Articles
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">
            Insights & Study Abroad Guides
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Explore expert advice, admission tips, scholarship updates,
            and visa guidance to help you achieve your dream.
          </p>

        </motion.div>

        <div className="grid gap-10 lg:grid-cols-3">

          {/* Featured */}

          <motion.div
            whileHover={{ y: -8 }}
            className="group lg:col-span-2 overflow-hidden rounded-[36px] bg-white shadow-2xl"
          >

            <div className="overflow-hidden">

              <img
                src={featured.featured_image}
                alt={featured.title}
                className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-110"
              />

            </div>

            <div className="p-10">

              <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
                {featured.category}
              </span>

              <h3 className="mt-6 text-3xl font-bold text-slate-900">
                {featured.title}
              </h3>

              <p className="mt-5 leading-8 text-slate-600">
                {featured.short_description}
              </p>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">

                <span className="flex items-center gap-2">
                  <User size={16}/>
                  {/* FIXED: Safely render author name */}
                  {getAuthorName(featured.author)}
                </span>

                <span className="flex items-center gap-2">
                  <Calendar size={16}/>
                  {featured.published_date}
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 size={16}/>
                  {featured.read_time}
                </span>

              </div>

              <button className="mt-8 inline-flex items-center gap-2 font-semibold text-violet-600">

                Read Article

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />

              </button>

            </div>

          </motion.div>

          {/* Right Cards */}

          <div className="space-y-8">

            {others.map((blog, index) => (

              <motion.div
                key={blog.id}
                initial={{
                  opacity:0,
                  x:40,
                }}
                whileInView={{
                  opacity:1,
                  x:0,
                }}
                transition={{
                  delay:index*.15,
                }}
                viewport={{ once:true }}
                whileHover={{
                  x:8,
                }}
                className="group flex gap-5 rounded-3xl bg-white p-5 shadow-xl"
              >

                <img
                  src={blog.featured_image}
                  className="h-36 w-36 rounded-2xl object-cover transition duration-500 group-hover:scale-105"
                />

                <div>

                  <span className="text-sm font-semibold text-violet-600">
                    {blog.category}
                  </span>

                  <h4 className="mt-2 line-clamp-2 text-xl font-bold">
                    {blog.title}
                  </h4>

                  <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">

                    <span className="flex items-center gap-1">
                      <Calendar size={14}/>
                      {blog.published_date}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock3 size={14}/>
                      {blog.read_time}
                    </span>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

        {/* Bottom Button */}

        <div className="mt-20 text-center">

          <Link
            href="/blogs"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-xl transition hover:scale-105"
          >
            View All Articles

            <ArrowRight size={18}/>
          </Link>

        </div>

      </div>

    </section>
  );
}
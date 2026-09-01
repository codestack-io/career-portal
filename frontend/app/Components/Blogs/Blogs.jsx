'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/blogs/`)
      .then((res) => {
        const blogData = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];
        setBlogs(blogData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch blogs:', err);
        setLoading(false);
      });
  }, [API_BASE_URL]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-24">
        <p className="text-slate-400 font-medium animate-pulse">Loading articles...</p>
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="w-full text-center py-20 text-slate-500 font-medium">
        No articles available at the moment.
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Heading */}
      <div className="mb-10 sm:mb-12 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Insights & Study Abroad Guides
        </h1>
        <p className="text-slate-500 mt-3 text-base sm:text-lg leading-relaxed">
          Explore expert advice, admission tips, scholarship updates, and visa guidance.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
        {blogs.map((blog) => (
          <Link
            key={blog.id || blog.slug}
            href={`/blogs/${blog.slug}`}
            className="group block w-full"
          >
            {/* Image Box */}
            <div className="w-full aspect-[16/10] rounded-3xl overflow-hidden bg-slate-100 relative">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>

            {/* Content Stack below Image */}
            <div className="mt-4 sm:mt-5">
              <p className="text-slate-500 text-sm sm:text-base font-normal">
                {blog.published_date}
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mt-2 group-hover:text-purple-600 transition-colors duration-200 leading-snug sm:leading-tight">
                {blog.title}
              </h2>

              {blog.short_description && (
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2.5 line-clamp-2">
                  {blog.short_description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
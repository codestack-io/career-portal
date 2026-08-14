'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { Clock, Calendar, ArrowLeft, User } from 'lucide-react';

export default function BlogDetailPage({ params }) {
  // Unwrap params for Next.js 15 / React 19
  const { slug } = use(params);
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      axios.get(`http://127.0.0.1:8000/api/blogs/${slug}/`)
        .then((res) => {
          setBlog(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching blog details:', err);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-white pt-28">
        <p className="text-purple-600 font-medium animate-pulse">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white max-w-3xl mx-auto px-4 pt-32 pb-20 text-center">
        <p className="text-red-500 text-lg font-medium">Article not found.</p>
        <button 
          onClick={() => router.back()}
          className="text-purple-600 hover:underline mt-4 inline-block font-medium cursor-pointer"
        >
          &larr; Go back to previous page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto">
        
        {/* Dynamic Back Button (Navigates to the exact page you came from) */}
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-700 hover:text-purple-600 font-semibold text-sm mb-6 transition cursor-pointer bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:border-purple-300"
        >
          <ArrowLeft size={16} /> Go Back
        </button>

        {/* White Article Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-slate-100 text-slate-900">
          
          {/* Category Tag */}
          {blog.category && (
            <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
              {blog.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {blog.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 mt-4 pb-6 border-b border-slate-100">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <User size={15} className="text-purple-600" /> {blog.author || 'Career Hub Team'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={15} className="text-purple-600" /> {blog.published_date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} className="text-purple-600" /> {blog.read_time}
            </span>
          </div>

          {/* Banner Image */}
          {blog.featured_image && (
            <div className="my-8 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-80 sm:h-[420px] object-cover"
              />
            </div>
          )}

          {/* Short Description Highlight Box */}
          {blog.short_description && (
            <div className="my-6 bg-purple-50/80 border-l-4 border-purple-600 p-4 sm:p-5 rounded-r-xl text-slate-800 font-medium text-base sm:text-lg leading-relaxed">
              {blog.short_description}
            </div>
          )}

          {/* Rich Formatted Article Content */}
          <div 
            className="mt-8 text-slate-800 text-base sm:text-lg leading-relaxed space-y-6 break-words prose prose-slate prose-purple max-w-none
              [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:mt-8 [&_h1]:mb-4
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:pt-4 [&_h2]:border-t [&_h2]:border-slate-100
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-2
              [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2
              [&_li]:text-slate-800
              [&_strong]:font-bold [&_strong]:text-slate-900
              [&_blockquote]:border-l-4 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-700 [&_blockquote]:my-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

        </article>
      </main>
    </div>
  );
}
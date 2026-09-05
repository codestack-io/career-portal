import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, ArrowLeft, User } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// Fetch blog data directly on the server
async function fetchBlog(slug) {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${slug}/`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Error fetching blog details:', err);
    return null;
  }
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${blog.title} | Career Hub`,
    description: blog.short_description || blog.title,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    notFound();
  }

  const authorName = typeof blog.author === 'object' 
    ? blog.author?.username || blog.author?.email || 'Career Hub Team' 
    : blog.author || 'Career Hub Team';

  const categoryName = typeof blog.category === 'object' 
    ? blog.category?.name 
    : blog.category;

  const htmlContent = blog?.text || blog?.content || '';

  return (
    <div className="h-auto bg-slate-50/50 pt-20 pb-8 px-4 sm:px-6">
      <main className="max-w-4xl mx-auto">
        
        {/* Back Link (Replaced router.back button for server rendering) */}
        <Link 
          href="/blogs"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-purple-600 font-semibold text-sm mb-4 transition bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:border-purple-300"
        >
          <ArrowLeft size={16} /> Go Back to Blogs
        </Link>

        {/* Compact Article Container */}
        <article className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-slate-100 text-slate-900 h-auto overflow-hidden">
          
          {/* Category Tag */}
          {categoryName && (
            <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              {categoryName}
            </span>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {blog.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 mt-3 pb-4 border-b border-slate-100">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <User size={15} className="text-purple-600" /> {authorName}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={15} className="text-purple-600" /> {blog.published_date}
            </span>
            {blog.read_time && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={15} className="text-purple-600" /> {blog.read_time}
                </span>
              </>
            )}
          </div>

          {/* Featured Image */}
          {blog.featured_image && (
            <div className="my-5 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full max-h-[350px] object-cover"
              />
            </div>
          )}

          {/* Short Description */}
          {blog.short_description && (
            <div className="my-4 bg-purple-50/80 border-l-4 border-purple-600 p-4 rounded-r-xl text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
              {blog.short_description}
            </div>
          )}

          {/* HTML Body Content */}
          {htmlContent && (
            <div 
              className="mt-4 text-slate-800 text-base sm:text-lg leading-relaxed space-y-4 break-words prose prose-slate prose-purple max-w-none
                [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:pt-3 [&_h2]:border-t [&_h2]:border-slate-100
                [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900 [&_h3]:mt-4 [&_h3]:mb-2
                [&_p]:leading-relaxed [&_p]:mb-3
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ul]:space-y-1.5
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_ol]:space-y-1.5
                [&_li]:text-slate-800
                [&_strong]:font-bold [&_strong]:text-slate-900"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          )}

        </article>
      </main>
    </div>
  );
}
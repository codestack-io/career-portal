import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

async function getService(slug) {
  
  const cleanSlug = slug ? String(slug).trim() : "";
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const url = `${baseUrl}/api/services/${cleanSlug}/`;

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`[Server Fetch Failed] Status: ${res.status} | URL: ${url}`);
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error(`[Server Fetch Error] URL: ${url} | Error:`, error.message);
    return null;
  }
}

export async function generateMetadata({ params }) {
  // Await params for Next.js 15+ compatibility
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} | CareerHub`,
    description: service.description
      ? service.description.replace(/<[^>]*>?/gm, "").slice(0, 160)
      : "Detailed information about our services.",
  };
}

export default async function ServiceDetailPage({ params }) {
  // Await params explicitly
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const categoryName =
    typeof service.category === "object"
      ? service.category?.name
      : service.category;

  return (
    <main className="min-h-screen bg-[#F8FAFF] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-violet-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all services
        </Link>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm sm:p-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 via-white to-blue-100 shadow-md">
              {service.icon ? (
                <img
                  src={service.icon}
                  alt={service.title}
                  className="h-14 w-14 object-contain"
                />
              ) : (
                <Sparkles className="h-8 w-8 text-violet-600" />
              )}
            </div>

            {categoryName && (
              <span className="rounded-full bg-violet-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-violet-700">
                {categoryName}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {service.title}
          </h1>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm sm:p-12">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">
            Overview & Details
          </h2>

          <div
            className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:leading-relaxed prose-p:text-slate-600 prose-a:text-violet-600 hover:prose-a:underline prose-strong:text-slate-900 prose-ul:list-disc prose-ol:list-decimal"
            dangerouslySetInnerHTML={{ __html: service.description || "" }}
          />
        </div>
      </div>
    </main>
  );
}
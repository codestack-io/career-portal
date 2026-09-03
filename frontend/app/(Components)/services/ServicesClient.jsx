"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Folder, Layers, Search, X } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

function stripHtml(value) {
  if (!value) return "";
  return value
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function HighlightText({ text = "", highlight = "" }) {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  // Escape special regex characters in the search query to prevent crashes
  const escapedQuery = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-amber-100 text-amber-900 font-medium rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

function ServiceCard({ service, searchQuery }) {
  const categoryName =
    typeof service.category === "object"
      ? service.category?.name
      : service.category;

  const description = stripHtml(service.description);

  return (
    <motion.div variants={cardVariants} className="group h-full">
      <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-200 hover:border-slate-300">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
            {service.icon ? (
              <img
                src={service.icon}
                alt={service.title}
                className="h-8 w-8 object-contain"
              />
            ) : (
              <Sparkles className="h-5 w-5 text-indigo-600" />
            )}
          </div>
          {categoryName && (
            <span className="mt-1 shrink-0 text-[13px] font-medium text-indigo-600">
              {categoryName}
            </span>
          )}
        </div>

        {/* Highlighted Title */}
        <h3 className="mb-2 text-base font-semibold leading-snug text-slate-900">
          <HighlightText text={service.title} highlight={searchQuery} />
        </h3>

        {/* Highlighted Description */}
        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
          <HighlightText text={description} highlight={searchQuery} />
        </p>

        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
        >
          Learn More <span className="ml-1">↗</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesClient({ initialServices = [], initialCategories = [] }) {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const safeServices = useMemo(() => {
    if (Array.isArray(initialServices)) return initialServices;
    if (initialServices && Array.isArray(initialServices.results)) return initialServices.results;
    return [];
  }, [initialServices]);

  const safeCategories = useMemo(() => {
    if (Array.isArray(initialCategories)) return initialCategories;
    if (initialCategories && Array.isArray(initialCategories.results)) return initialCategories.results;
    return [];
  }, [initialCategories]);

  const categories = useMemo(() => {
    if (safeCategories.length > 0) {
      return [{ key: "all", name: "All Services" }, ...safeCategories];
    }

    const map = new Map();
    safeServices.forEach((s) => {
      if (!s.category) return;
      if (typeof s.category === "object") {
        const key = (s.category.slug || s.category.name || "").toLowerCase();
        if (!map.has(key)) map.set(key, { key, name: s.category.name || key });
      } else {
        const key = String(s.category).toLowerCase();
        if (!map.has(key)) map.set(key, { key, name: s.category });
      }
    });

    return [{ key: "all", name: "All Services" }, ...Array.from(map.values())];
  }, [safeServices, safeCategories]);

  // Combined Filter: Inactive Check + Category Filter + Search Query Match
  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return safeServices
      .filter((s) => {
        if (s.is_active === false) return false;

        // Category Filter
        const categorySlug =
          typeof s.category === "object"
            ? (s.category?.slug || s.category?.name || "").toLowerCase()
            : String(s.category || "").toLowerCase();

        const matchesCategory =
          selectedCategoryKey === "all" || categorySlug === selectedCategoryKey.toLowerCase();

        if (!matchesCategory) return false;

        // Search Filter (Title + Description)
        if (!query) return true;

        const titleMatch = (s.title || "").toLowerCase().includes(query);
        const descriptionMatch = stripHtml(s.description).toLowerCase().includes(query);

        return titleMatch || descriptionMatch;
      })
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  }, [safeServices, selectedCategoryKey, searchQuery]);

  return (
    <section className="min-h-screen bg-white px-6 pb-20 pt-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="mt-11 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Explore services by category
            </h2>
            <p className="mt-3 text-base text-slate-500">
              Browse everything we offer, from admissions support to pre-departure housing.
            </p>
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-10">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-3">
              <div className="mb-2 flex items-center gap-2 px-3 pb-3 pt-1">
                <Layers className="h-4 w-4 text-slate-400" />
                <h3 className="text-xs font-semibold text-slate-500">
                  Categories &middot; {categories.length - 1}
                </h3>
              </div>

              <div className="no-scrollbar flex flex-row gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-visible lg:pb-0">
                {categories.map((cat) => {
                  const key = cat.slug || cat.key || cat.name;
                  const isActive = key.toLowerCase() === selectedCategoryKey.toLowerCase();

                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategoryKey(key)}
                      className={`group flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? "bg-slate-900 text-white"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Folder className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span className="whitespace-nowrap lg:whitespace-normal">
                        {cat.name || cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategoryKey}-${searchQuery}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <ServiceCard key={service.id || service.slug} service={service} searchQuery={searchQuery} />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 py-16 text-center">
                    <p className="text-sm text-slate-500">
                      No services found matching your criteria.
                    </p>
                    {(searchQuery || selectedCategoryKey !== "all") && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategoryKey("all");
                        }}
                        className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                      >
                        Reset filters
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Folder, Layers } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
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

// Services often come from a CMS with HTML-formatted descriptions
// (e.g. "<p>Book safe, fully-furnished ...</p>"). Strip tags so the
// card preview shows plain, readable text instead of raw markup.
function stripHtml(value) {
  if (!value) return "";
  return value
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function ServiceCard({ service }) {
  const categoryName =
    typeof service.category === "object"
      ? service.category?.name
      : service.category;

  const description = stripHtml(service.description);

  return (
    <motion.div variants={cardVariants} className="group h-full">
      <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors duration-200 hover:border-slate-300">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-200">
            {service.icon ? (
              <img
                src={service.icon}
                alt=""
                className="h-20 w-20 object-contain"
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

        <h3 className="mb-2 text-base font-semibold leading-snug text-slate-900">
          {service.title}
        </h3>

        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
          {description}
        </p>

        <Link
          href={`/services/${service.slug || service.id}`}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-slate-900 transition-colors duration-200 hover:text-indigo-600"
        >
          Learn more
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesPage({ initialServices = [], initialCategories = [] }) {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState("all");

  // Dynamically extract categories from initialServices if initialCategories prop is empty
  const categories = useMemo(() => {
    if (initialCategories && initialCategories.length > 0) {
      return [{ key: "all", name: "All Services" }, ...initialCategories];
    }

    const map = new Map();
    initialServices.forEach((s) => {
      if (!s.category) return;
      if (typeof s.category === "object") {
        const key = (s.category.slug || s.category.name || "").toLowerCase();
        if (!map.has(key)) {
          map.set(key, { key, name: s.category.name || key });
        }
      } else {
        const key = String(s.category).toLowerCase();
        if (!map.has(key)) {
          map.set(key, { key, name: s.category });
        }
      }
    });

    return [
      { key: "all", name: "All Services" },
      ...Array.from(map.values()),
    ];
  }, [initialServices, initialCategories]);

  // Filter active services based on selection
  const filteredServices = useMemo(() => {
    if (!Array.isArray(initialServices)) return [];

    return initialServices
      .filter((s) => {
        if (s.is_active === false) return false;
        if (selectedCategoryKey === "all") return true;

        const categorySlug =
          typeof s.category === "object"
            ? (s.category?.slug || s.category?.name || "").toLowerCase()
            : String(s.category || "").toLowerCase();

        return categorySlug === selectedCategoryKey.toLowerCase();
      })
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  }, [initialServices, selectedCategoryKey]);

  return (
    <section className="min-h-screen bg-white px-6 pb-20 pt-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          

          <h2 className="text-3xl mt-11 font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Explore services by category
          </h2>
          <p className="mt-3 text-base text-slate-500">
            Browse everything we offer, from admissions support to
            pre-departure housing, organized the way you&apos;ll actually need it.
          </p>
        </motion.div>

        {/* Main Grid: Sidebar Left + Cards Right */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-10">
          {/* LEFT SIDE: Category Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-3">
              <div className="mb-2 flex items-center gap-2 px-3 pb-3 pt-1">
                <Layers className="h-4 w-4 text-slate-400" />
                <h3 className="text-xs font-semibold text-slate-500">
                  Categories &middot; {categories.length - 1}
                </h3>
              </div>

              <div className="flex flex-row gap-1 overflow-x-auto pb-2 no-scrollbar lg:flex-col lg:overflow-x-visible lg:pb-0">
                {categories.map((cat) => {
                  const key = cat.slug || cat.key || cat.name;
                  const isActive =
                    key.toLowerCase() === selectedCategoryKey.toLowerCase();

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
                      <Folder
                        className={`h-4 w-4 shrink-0 ${
                          isActive ? "text-white" : "text-slate-400"
                        }`}
                      />
                      <span className="whitespace-nowrap lg:whitespace-normal">
                        {cat.name || cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE: Services Display Grid */}
          <main className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategoryKey}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))
                ) : (
                  <div className="col-span-full rounded-2xl border border-dashed border-slate-300 py-16 text-center text-sm text-slate-500">
                    No services found under this category.
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
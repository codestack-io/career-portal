"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

const CATEGORIES = [
  { key: "general", label: "General FAQs" },
  { key: "admissions", label: "Admission Guidance" },
  { key: "scholarships", label: "Scholarships" },
  { key: "visa", label: "Visa Process" },
];

export default function FaqClient({ initialFaqs = [] }) {
  const [openId, setOpenId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle both flat array response and Django DRF paginated { results: [...] }
  const faqs = Array.isArray(initialFaqs)
    ? initialFaqs
    : initialFaqs?.results || [];

  // Filter inactive items
  const activeFaqs = faqs.filter((f) => f.is_active !== false);

  // Search filter matching backend model field names
  const filteredFaqs = activeFaqs.filter((faq) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    const qText = faq.question?.toLowerCase() || "";
    // Strips HTML tags from CKEditor5 HTML response so user can search rich text cleanly
    const aText = faq.answer?.replace(/<[^>]*>?/gm, "").toLowerCase() || ""; 
    
    return qText.includes(query) || aText.includes(query);
  });

  return (
    <div className="mx-auto max-w-4xl px-4 pt-28 sm:pt-36 pb-12">
      {/* Header & Search Bar */}
      <div className="mb-8 text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-violet-600">
          <HelpCircle className="h-3.5 w-3.5" />
          Help Center
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Find answers regarding admissions, scholarships, and visa processes.
        </p>

        <div className="relative mx-auto mt-6 max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm font-medium text-slate-900 shadow-sm transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </div>
      </div>

      {/* Grouped Accordions */}
      <div className="space-y-8">
        {CATEGORIES.map((cat) => {
          const categoryFaqs = filteredFaqs.filter(
            (faq) => (faq.category?.toLowerCase() || "general") === cat.key
          );

          if (categoryFaqs.length === 0) return null;

          return (
            <section key={cat.key} id={cat.key} className="scroll-mt-20">
              <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900 border-b border-slate-200 pb-2">
                {cat.label}
              </h2>

              <div className="space-y-3">
                {categoryFaqs.map((faq, idx) => {
                  const itemKey = faq.id ?? `faq-${idx}`;
                  const isOpen = openId === itemKey;

                  return (
                    <div
                      key={itemKey}
                      className="overflow-hidden rounded-xl border border-slate-200/80 bg-white transition-all hover:border-slate-300"
                    >
                      <button
                        onClick={() => setOpenId(isOpen ? null : itemKey)}
                        className="flex w-full items-center justify-between p-4 text-left"
                      >
                        <span className="text-base font-semibold tracking-tight text-slate-900">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-violet-600" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {/* Render CKEditor HTML output Safely */}
                            <div
                              className="prose prose-slate max-w-none border-t border-slate-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-600"
                              dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-500">
            No FAQs found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
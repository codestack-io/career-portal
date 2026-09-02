"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Footer({ footer, countries = [] }) {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Study Destinations", href: "/study-destinations" },
    { name: "Blogs", href: "/blogs" },
    { name: "FAQs", href: "/faqs" },
  ];

  const defaultCountries = [
    { name: "United Kingdom", slug: "uk" },
    { name: "Canada", slug: "canada" },
    { name: "Australia", slug: "australia" },
    { name: "USA", slug: "usa" },
    { name: "Germany", slug: "germany" },
    { name: "Ireland", slug: "ireland" },
  ];

  const studyAbroadLinks = (countries.length > 0 ? countries : defaultCountries).map(
    (item) => ({
      name: item.name || item.title,
      href: item.url || item.link || `/study-destinations/${item.slug || item.id}`,
    })
  );

  const faqLinks = [
    { name: "General FAQs", href: "/faqs" },
    { name: "Admission Guidance", href: "/faqs#admissions" },
    { name: "Scholarships", href: "/faqs#scholarships" },
    { name: "Visa Process", href: "/faqs#visa" },
  ];

  const defaultMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    footer?.address ?? "Dhaka, Bangladesh"
  )}`;

  return (
    <footer className="relative mt-32 overflow-visible rounded-t-[60px] bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950 text-white">
      <div className="absolute -top-44 -right-44 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[160px]" />
      <div className="absolute -bottom-44 -left-44 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[160px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_35%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative -top-20 z-20"
        >
          <div className="rounded-[36px] border border-white/10 bg-white/10 backdrop-blur-2xl p-10 shadow-[0_20px_80px_rgba(0,0,0,.35)]">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="inline-flex rounded-full bg-violet-500/20 px-4 py-2 text-sm font-semibold text-violet-300">
                  Newsletter
                </span>
                <h2 className="mt-6 text-4xl font-bold leading-tight">
                  Ready to Begin Your
                  <span className="block bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                    Study Abroad Journey?
                  </span>
                </h2>
                <p className="mt-6 max-w-xl text-slate-300 leading-8">
                  Subscribe to receive scholarship updates, university admissions,
                  visa news, and career opportunities directly in your inbox.
                </p>
              </div>

              <div>
                <div className="flex overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-transparent px-7 py-5 text-white placeholder:text-slate-400 outline-none"
                  />
                  <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 px-8 font-semibold transition-all duration-300 hover:scale-105">
                    Subscribe
                    <ArrowRight size={18} />
                  </button>
                </div>
                <p className="mt-4 text-sm text-slate-400">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5"
        >
          <div className="lg:col-span-2 pr-4">
            <Link href="/" className="inline-block">
              <h2 className="text-4xl font-black">
                <span className="text-white">Career</span>
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Hub
                </span>
              </h2>
            </Link>

            <p className="mt-6 leading-relaxed text-slate-300 max-w-md">
              {footer?.description ??
                "Helping students achieve their dream of studying abroad through expert counseling, admissions, scholarships, and visa assistance."}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-violet-400 shrink-0" size={20} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Address
                  </p>
                  <a
                    href={footer?.maps_url || defaultMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 transition hover:text-violet-400 hover:underline"
                  >
                    {footer?.address ?? "Dhaka, Bangladesh"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-1 text-violet-400 shrink-0" size={20} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </p>
                  <a
                    href={`mailto:${footer?.email ?? "info@careerhub.com"}`}
                    className="text-slate-200 transition hover:text-violet-400"
                  >
                    {footer?.email ?? "info@careerhub.com"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-1 text-violet-400 shrink-0" size={20} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Office Hours
                  </p>
                  <p className="text-slate-300">
                    {footer?.office_hours ?? "Sat - Thu | 9 AM – 6 PM"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <div className="mt-6 flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex w-fit items-center text-slate-300 transition hover:text-violet-400 text-sm"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Study Abroad</h3>
            <div className="mt-6 flex flex-col gap-3.5">
              {studyAbroadLinks.map((link) => {
                const isExternal = link.href.startsWith("http");

                return isExternal ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-fit items-center text-slate-300 transition hover:text-violet-400 text-sm"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex w-fit items-center text-slate-300 transition hover:text-violet-400 text-sm"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Help & FAQs</h3>
            <div className="mt-6 flex flex-col gap-3.5">
              {faqLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex w-fit items-center text-slate-300 transition hover:text-violet-400 text-sm"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col items-center justify-between gap-6 text-sm text-slate-400 md:flex-row">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-white">CareerHub</span>. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <Link href="/privacy-policy" className="transition hover:text-violet-400">
                Privacy Policy
              </Link>
              <Link href="/terms" className="transition hover:text-violet-400">
                Terms & Conditions
              </Link>
              <Link href="/cookies" className="transition hover:text-violet-400">
                Cookie Policy
              </Link>
            </div>
            <p>
              Designed with <span className="text-red-400">❤</span> for future global students.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
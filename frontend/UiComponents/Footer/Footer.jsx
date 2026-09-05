"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Clock, CheckCircle2, Loader2, Heart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Footer({ footer, countries = [] }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setMessage("Thank you for subscribing! Check your inbox for updates.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

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
    <footer className="relative mt-32 border-t border-slate-200/80 bg-slate-900 text-slate-300">
      {/* Light background subtle accents */}
      <div className="absolute top-0 right-1/3 -z-10 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Floating Newsletter Section (Light Card Theme) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative -top-20 z-20"
        >
          <div className="rounded-[32px] border border-slate-200/80 bg-white p-8 md:p-12 shadow-xl shadow-slate-200/50">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center rounded-full bg-violet-50 px-3.5 py-1.5 text-xs font-semibold text-violet-700 border border-violet-100">
                  Newsletter
                </span>
                <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Ready to Begin Your{" "}
                  <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    Study Abroad Journey?
                  </span>
                </h2>
                <p className="mt-3 text-slate-600 leading-relaxed text-sm md:text-base">
                  Subscribe to receive scholarship updates, university admissions,
                  visa news, and career opportunities directly in your inbox.
                </p>
              </div>

              <div>
                {status === "success" ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6">
                    <div className="flex items-center gap-3 text-emerald-700 font-bold text-base">
                      <CheckCircle2 size={22} />
                      <span>Subscribed Successfully!</span>
                    </div>
                    <p className="mt-1 text-xs text-emerald-800">{message}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setMessage("");
                      }}
                      className="mt-3 text-xs font-semibold text-violet-600 hover:text-violet-800 underline transition"
                    >
                      Subscribe another email
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2.5">
                    <div className="flex overflow-hidden rounded-full border border-slate-300 bg-slate-50 p-1.5 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20 transition">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        placeholder="Enter your email address"
                        disabled={status === "loading"}
                        className="w-full bg-transparent px-5 text-sm text-slate-900 placeholder:text-slate-400 outline-none disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-violet-500/20 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 transition shrink-0"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Joining...</span>
                          </>
                        ) : (
                          <>
                            <span>Subscribe</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>

                    {status === "error" && (
                      <p className="text-xs font-medium text-rose-600 pl-4">{message}</p>
                    )}

                    <p className="text-xs text-slate-400 pl-4">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Navigation Columns */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-10 pb-16 md:grid-cols-2 lg:grid-cols-5"
        >
          <div className="lg:col-span-2 pr-4">
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-black">
                <span className="text-white">Career</span>
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Hub
                </span>
              </h2>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-sm">
              {footer?.description ??
                "Helping students achieve their dream of studying abroad through expert counseling, admissions, scholarships, and visa assistance."}
            </p>

            <div className="mt-6 space-y-3.5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 text-violet-400 shrink-0" size={18} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Address
                  </p>
                  <a
                    href={footer?.maps_url || defaultMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-300 transition hover:text-violet-400 hover:underline"
                  >
                    {footer?.address ?? "Dhaka, Bangladesh"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 text-violet-400 shrink-0" size={18} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </p>
                  <a
                    href={`mailto:${footer?.email ?? "info@careerhub.com"}`}
                    className="text-xs text-slate-300 transition hover:text-violet-400"
                  >
                    {footer?.email ?? "info@careerhub.com"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 text-violet-400 shrink-0" size={18} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Office Hours
                  </p>
                  <p className="text-xs text-slate-300">
                    {footer?.office_hours ?? "Sat - Thu | 9 AM – 6 PM"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h3>
            <div className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex w-fit items-center text-xs text-slate-400 transition hover:text-violet-400"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-violet-400 transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Study Abroad</h3>
            <div className="mt-4 flex flex-col gap-2.5">
              {studyAbroadLinks.map((link) => {
                const isExternal = link.href.startsWith("http");

                return isExternal ? (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-fit items-center text-xs text-slate-400 transition hover:text-violet-400"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-violet-400 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex w-fit items-center text-xs text-slate-400 transition hover:text-violet-400"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-violet-400 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Help & FAQs</h3>
            <div className="mt-4 flex flex-col gap-2.5">
              {faqLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex w-fit items-center text-xs text-slate-400 transition hover:text-violet-400"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-violet-400 transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6 text-xs text-slate-400">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-slate-200">CareerHub</span>. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6">
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
            <p className="flex items-center gap-1">
              Designed with <Heart size={14} className="fill-rose-500 text-rose-500" /> for future global students.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
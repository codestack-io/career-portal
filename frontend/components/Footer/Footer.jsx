"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Footer({ footer }) {
  return (
    <footer className="relative mt-32 overflow-visible rounded-t-[60px] bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950 text-white">

      {/* ================= Background Decoration ================= */}

      <div className="absolute -top-44 -right-44 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[160px]" />

      <div className="absolute -bottom-44 -left-44 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[160px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_35%)]" />

      {/* ========================================================== */}

      <div className="relative max-w-7xl mx-auto px-6">

  {/* ================= Newsletter ================= */}

  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="relative -top-20 z-20"
  >
    <div className="rounded-[36px] border border-white/10 bg-white/10 backdrop-blur-2xl p-10 shadow-[0_20px_80px_rgba(0,0,0,.35)]">

      <div className="grid items-center gap-10 lg:grid-cols-2">

        {/* Left */}

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
            visa news and career opportunities directly in your inbox.
          </p>

        </div>

        {/* Right */}

        <div>

          <div className="flex overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">

            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent px-7 py-5 text-white placeholder:text-slate-400 outline-none"
            />

            <button
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-blue-600 px-8 font-semibold transition-all duration-300 hover:scale-105"
            >
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

  {/* ================= Footer Grid ================= */}

<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid gap-14 py-24 md:grid-cols-2 lg:grid-cols-4"
>

  {/* ==================================== */}
  {/* Brand */}
  {/* ==================================== */}

  <div>

    <Link href="/" className="inline-block">

      <h2 className="text-4xl font-black">

        <span className="text-white">
          Career
        </span>

        <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
          Hub
        </span>

      </h2>

    </Link>

    <p className="mt-7 leading-8 text-slate-300">

     {footer?.description ??
       "Helping students achieve their dream of studying abroad through expert counseling, admissions, scholarships and visa assistance."}

    </p>

    {/* Social Icons */}

    <div className="mt-8 flex gap-4">

      {[
        FaFacebookF,
        FaLinkedinIn,
        FaInstagram,
        FaYoutube,
      ].map((Icon, index) => (

        <motion.a
          key={index}
          href="#"
          whileHover={{
            scale: 1.12,
            rotate: 8,
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-violet-600 hover:text-white"
        >

          <Icon size={20} />

        </motion.a>

      ))}

    </div>

  </div>

  {/* ==================================== */}
  {/* Quick Links */}
  {/* ==================================== */}

  <div>

    <h3 className="text-xl font-bold text-white">
      Quick Links
    </h3>

    <div className="mt-8 flex flex-col gap-5">

      {[
        "Home",
        "About",
        "Services",
        "Study Destinations",
        "Blogs",
        "Contact",
      ].map((item) => (

        <Link
          key={item}
          href="#"
          className="group flex w-fit items-center text-slate-300 transition hover:text-violet-400"
        >

          <span className="relative">

            {item}

            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>

          </span>

        </Link>

      ))}

    </div>

  </div>

  {/* ==================================== */}
  {/* Study Abroad */}
  {/* ==================================== */}

  <div>

    <h3 className="text-xl font-bold text-white">
      Study Abroad
    </h3>

    <div className="mt-8 flex flex-col gap-5">

      {[
        "United Kingdom",
        "Canada",
        "Australia",
        "USA",
        "Germany",
        "Ireland",
      ].map((item) => (

        <Link
          key={item}
          href="#"
          className="group flex w-fit items-center text-slate-300 transition hover:text-violet-400"
        >

          <span className="relative">

            {item}

            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>

          </span>

        </Link>

      ))}

    </div>

  </div>

  {/* ==================================== */}
  {/* Contact */}
  {/* ==================================== */}

  <div>

    <h3 className="text-xl font-bold text-white">
      Contact
    </h3>

    <div className="mt-8 space-y-7">

      <div className="flex gap-4">

        <MapPin className="mt-1 text-violet-400" />

        <div>

          <p className="font-semibold">
            Address
          </p>

          <p className="text-slate-300">
            {footer?.address ?? "Dhaka, Bangladesh"}
          </p>

        </div>

      </div>

      <div className="flex gap-4">

        <Phone className="mt-1 text-violet-400" />

        <div>

          <p className="font-semibold">
            Phone
          </p>

          <p className="text-slate-300">
           {footer?.phone ?? "+880 1234 567890"}
          </p>

        </div>

      </div>

      <div className="flex gap-4">

        <Mail className="mt-1 text-violet-400" />

        <div>

          <p className="font-semibold">
            Email
          </p>

          <p className="text-slate-300">
           {footer?.email ?? "info@careerhub.com"}
          </p>

        </div>

      </div>

      <div className="flex gap-4">

        <Clock className="mt-1 text-violet-400" />

        <div>

          <p className="font-semibold">
            Office Hours
          </p>

          <p className="text-slate-300">
           {footer?.office_hours ?? "Sat - Thu | 9 AM – 6 PM"}
          </p>

          

        </div>

      </div>

    </div>

  </div>

</motion.div>

 {/* ================= Bottom ================= */}

<div className="border-t border-white/10 py-8">

  <div className="flex flex-col items-center justify-between gap-6 text-sm text-slate-400 md:flex-row">

    {/* Left */}

    <p>
      © {new Date().getFullYear()}{" "}
      <span className="font-semibold text-white">
        CareerHub
      </span>
      . All rights reserved.
    </p>

    {/* Center */}

    <div className="flex flex-wrap items-center gap-8">

      <Link
        href="/privacy-policy"
        className="transition hover:text-violet-400"
      >
        Privacy Policy
      </Link>

      <Link
        href="/terms"
        className="transition hover:text-violet-400"
      >
        Terms & Conditions
      </Link>

      <Link
        href="/cookies"
        className="transition hover:text-violet-400"
      >
        Cookie Policy
      </Link>

    </div>

    {/* Right */}

    <p>
      Designed with{" "}
      <span className="text-red-400">
        ❤
      </span>{" "}
      for future global students.
    </p>

  </div>

</div>

</div>

    </footer>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 15,
  });

  const displayValue = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref} className="inline-flex items-center">
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

function CountryCard({ country, index }) {
  const destinationIdentifier = country.slug || country.id;
  const targetUrl = `/study-destinations/${destinationIdentifier}`;

  return (
    <Link href={targetUrl} className="block">
      <motion.div
        whileHover={{
          y: -6,
          scale: 1.02,
        }}
        className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 text-slate-900 shadow-md transition-all hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 cursor-pointer"
      >
        <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-100">
          <img
            src={country.image || country.country_image}
            alt={country.name || country.country_name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />

          {(country.flag || country.flag_image) && (
            <motion.img
              src={country.flag || country.flag_image}
              alt=""
              animate={{
                y: [0, -6, 0],
                rotate: [0, 4, -4, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="absolute left-3 top-3 h-10 w-10 rounded-full border-2 border-white object-cover shadow-md"
            />
          )}
        </div>

        <div className="mt-3.5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
              {country.name || country.country_name}
            </h3>
            {(country.universities || country.universities_count) && (
              <p className="mt-0.5 text-xs font-semibold text-slate-500">
                {country.universities || country.universities_count} Universities
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-violet-600 transition-transform group-hover:translate-x-1">
            <span>Explore</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function StudyDestination({ destinations: initialDestinations = [] }) {
  const [destinations, setDestinations] = useState(initialDestinations);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    if (initialDestinations.length === 0) {
      axios
        .get(`${API_BASE_URL}/api/study-destinations/`)
        .then((res) => {
          const data = Array.isArray(res.data) ? res.data : res.data.results || [];
          setDestinations(data);
        })
        .catch((err) => console.error("Error fetching destinations:", err));
    }
  }, [initialDestinations, API_BASE_URL]);

  const marqueeUp = {
    animate: {
      y: ["0%", "-50%"],
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  const marqueeDown = {
    animate: {
      y: ["-50%", "0%"],
      transition: {
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  if (!destinations.length) return null;

  const firstColumn = destinations.filter((_, i) => i % 2 === 0);
  const secondColumn = destinations.filter((_, i) => i % 2 !== 0);

  return (
    <section className="relative py-20 px-4 md:px-8 bg-slate-50/50">
      {/* Main Unified Floating Container Card */}
      <div className="relative z-10 max-w-7xl mx-auto rounded-[36px] bg-white p-8 md:p-14 border border-slate-200/80 shadow-xl shadow-slate-900/5 overflow-hidden">
        
        {/* Glow Effects within Card */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-violet-200/30 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-200/30 blur-[100px] pointer-events-none" />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* LEFT CONTENT & STATS */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-bold text-violet-700">
              <Compass size={14} className="text-violet-600" />
              <span>Study Destinations</span>
            </div>

            <h2 className="mt-6 text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Global Study <br />
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Destinations
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-slate-500 font-normal">
              Discover the world&apos;s leading education destinations and
              achieve your dream with expert admission guidance.
            </p>

            {/* Standard Primary Action CTA Button */}
            <div className="mt-8">
              <Link
                href="/study-destinations"
                className="group flex items-center gap-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 px-7 py-3.5 font-bold shadow-lg shadow-amber-400/20 transition hover:scale-105"
              >
                <span>Explore Destinations</span>
                <span className="bg-slate-950 text-white p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>

            {/* Stat Tile Cards Grid */}
            <div className="mt-12 w-full grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-slate-50/80 border border-slate-100 p-4 transition-all hover:bg-white hover:shadow-md">
                <h3 className="text-2xl md:text-3xl font-extrabold text-violet-600">
                  <AnimatedCounter value={destinations.length || 6} suffix="+" />
                </h3>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Countries
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50/80 border border-slate-100 p-4 transition-all hover:bg-white hover:shadow-md">
                <h3 className="text-2xl md:text-3xl font-extrabold text-violet-600">
                  <AnimatedCounter value={500} suffix="+" />
                </h3>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Universities
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50/80 border border-slate-200 p-4 transition-all hover:bg-white hover:shadow-md">
                <h3 className="text-2xl md:text-3xl font-extrabold text-violet-600">
                  <AnimatedCounter value={20} suffix="K+" />
                </h3>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Students
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT MARQUEE GRID */}
          <div className="relative h-[600px] overflow-hidden rounded-3xl bg-slate-100/60 p-4 border-none shadow-none">
            {/* Top and Bottom Fade Gradient Overlays */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-24 bg-gradient-to-b from-slate-100/80 via-slate-100/40 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-slate-100/80 via-slate-100/40 to-transparent" />

            <div className="grid grid-cols-2 gap-5">
              <motion.div
                variants={marqueeUp}
                animate="animate"
                className="flex flex-col gap-5"
              >
                {[...firstColumn, ...firstColumn].map((country, index) => (
                  <CountryCard
                    key={`${country.id || country.name}-${index}-left`}
                    country={country}
                    index={index}
                  />
                ))}
              </motion.div>

              <motion.div
                variants={marqueeDown}
                animate="animate"
                className="mt-12 flex flex-col gap-5"
              >
                {[...secondColumn, ...secondColumn].map((country, index) => (
                  <CountryCard
                    key={`${country.id || country.name}-${index}-right`}
                    country={country}
                    index={index}
                  />
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
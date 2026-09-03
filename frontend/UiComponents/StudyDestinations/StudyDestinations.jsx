"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
        className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-white shadow-2xl backdrop-blur-xl transition-all hover:border-violet-500/50 hover:shadow-violet-500/10 cursor-pointer"
      >
        <div className="relative h-48 w-full overflow-hidden rounded-2xl">
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
              className="absolute left-4 top-4 h-12 w-12 rounded-full border-2 border-slate-700 object-cover shadow-md"
            />
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">
              {country.name || country.country_name}
            </h3>
            {(country.universities || country.universities_count) && (
              <p className="mt-0.5 text-xs font-medium text-slate-400">
                {country.universities || country.universities_count} Universities
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-sm font-semibold text-violet-400 transition-transform group-hover:translate-x-1">
            <span>Explore</span>
            <ArrowRight size={16} />
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
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="pointer-events-none absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-300">
              Study Destinations
            </span>

            <h2 className="mt-6 text-5xl font-black leading-tight tracking-tight text-white">
              Global Study <br />
              <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                Destinations
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-400">
              Discover the world&apos;s leading education destinations and
              achieve your dream with expert admission guidance.
            </p>

            <Link href="/study-destinations" className="inline-block mt-8">
              <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:-translate-y-0.5 hover:shadow-violet-600/40 active:translate-y-0 cursor-pointer">
                <span>Explore Destinations</span>
                <ArrowRight size={18} />
              </div>
            </Link>

            <div className="mt-14 grid grid-cols-3 gap-8 border-t border-slate-800/80 pt-8">
              <div>
                <h3 className="text-4xl font-black text-white">
                  <AnimatedCounter value={destinations.length || 6} suffix="+" />
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-400">
                  Countries
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-white">
                  <AnimatedCounter value={500} suffix="+" />
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-400">
                  Universities
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-white">
                  <AnimatedCounter value={20} suffix="K+" />
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-400">
                  Students
                </p>
              </div>
            </div>
          </motion.div>

          <div className="relative h-[680px] overflow-hidden">
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-28 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-28 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                variants={marqueeUp}
                animate="animate"
                className="flex flex-col gap-6"
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
                className="mt-16 flex flex-col gap-6"
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
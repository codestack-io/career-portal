"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* -----------------------------
   Country Card Component
------------------------------*/

function CountryCard({ country, index }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <div className="relative h-64">

        <img
          src={country.image}
          alt={country.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B122055] to-transparent" />

        <motion.img
          src={country.flag}
          alt=""
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
          className="absolute left-5 top-5 h-16 w-16 rounded-full border-4 border-white object-cover shadow-xl"
        />

        <div className="absolute bottom-6 left-6">

          <h3 className="text-3xl font-bold">
            {country.name}
          </h3>

          <div className="mt-3 flex items-center gap-2 text-blue-300">

            <span>Explore</span>

            <ArrowRight size={18} />

          </div>

        </div>

      </div>
    </motion.div>
  );
}


export default function StudyDestinations({ destinations = [] }) {
    const marqueeUp = {
  animate: {
    y: ["0%", "-50%"],
    transition: {
      duration: 22,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const marqueeDown = {
  animate: {
    y: ["-50%", "0%"],
    transition: {
      duration: 22,
      ease: "linear",
      repeat: Infinity,
    },
  },
};
  const [activeCountry, setActiveCountry] = useState(
    destinations[0] || null
  );

  if (!activeCountry) return null;
  const firstColumn = destinations.filter((_, i) => i % 2 === 0);
const secondColumn = destinations.filter((_, i) => i % 2 !== 0);

  return (
    <section className="relative overflow-hidden bg-[#0B1220] py-28 text-white">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[180px]" />

      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[180px]" />

      {/* Dot Pattern */}

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle,#ffffff33 1px,transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
          >

            <span className="rounded-full bg-blue-500/20 px-5 py-2 text-blue-300">
              Study Destinations
            </span>

            <h2 className="mt-8 text-6xl font-black leading-tight">

              Global Study

              <br />

              Destinations

            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-gray-300">

              Discover the world&apos;s leading education destinations and
              achieve your dream with expert admission guidance.

            </p>

            <button className="mt-10 flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold transition hover:scale-105">

              Explore Destinations

              <ArrowRight size={18} />

            </button>

            {/* Statistics */}

            <div className="mt-16 grid grid-cols-3 gap-10">

              <div>

                <h3 className="text-5xl font-black">
                  {destinations.length}+
                </h3>

                <p className="mt-2 text-gray-400">
                  Countries
                </p>

              </div>

              <div>

                <h3 className="text-5xl font-black">
                  500+
                </h3>

                <p className="mt-2 text-gray-400">
                  Universities
                </p>

              </div>

              <div>

                <h3 className="text-5xl font-black">
                  20K+
                </h3>

                <p className="mt-2 text-gray-400">
                  Students
                </p>

              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

         <div className="relative h-[720px] overflow-hidden">

  {/* top fade */}
  <div className="pointer-events-none absolute top-0 left-0 right-0 z-20 h-28 bg-gradient-to-b from-[#0B1220] to-transparent" />

  {/* bottom fade */}
  <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-28 bg-gradient-to-t from-[#0B1220] to-transparent" />

  <div className="grid grid-cols-2 gap-6">

    {/* LEFT COLUMN */}
    <motion.div
      variants={marqueeUp}
      animate="animate"
      className="flex flex-col gap-6"
    >
      {[...firstColumn, ...firstColumn].map((country, index) => (
        <CountryCard
          key={`${country.id}-${index}`}
          country={country}
          index={index}
        />
      ))}
    </motion.div>

    {/* RIGHT COLUMN */}
    <motion.div
      variants={marqueeDown}
      animate="animate"
      className="mt-24 flex flex-col gap-6"
    >
      {[...secondColumn, ...secondColumn].map((country, index) => (
        <CountryCard
          key={`${country.id}-${index}`}
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
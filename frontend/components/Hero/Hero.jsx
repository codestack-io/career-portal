"use client";

import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut",
    },
  }),
};

export default function Hero({ hero }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  if (!hero) return null;

  // PASTE YOUR CLOUDINARY IMAGE URL HERE
  const cloudinaryBgUrl =
    "https://res.cloudinary.com/ciiop60x/image/upload/v1785944827/bg-1_fpob5g.jpg";

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#F8FAFF] via-[#EEF4FF] to-[#E4E8FF]"
    >
      {/* Background Decorations */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl"></div>
      <div className="absolute top-20 -right-24 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl"></div>

      {/* Centered Cloudinary Background Image */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15">
        <img
          src={cloudinaryBgUrl}
          alt="Hero background graphic"
          className="h-full w-full max-w-5xl object-contain mix-blend-multiply opacity-25"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-20">
        {/* Badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-6 py-3 text-sm font-semibold text-violet-700 shadow-lg backdrop-blur">
            Trusted by{" "}
            {inView && (
              <CountUp
                end={10000}
                duration={3}
                separator=","
              />
            )}
            + Students
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.2}
          className="mt-8 text-center text-5xl font-extrabold leading-tight text-slate-900 md:text-7xl"
        >
          {hero.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.4}
          className="mx-auto mt-8 max-w-3xl text-center text-xl leading-relaxed text-slate-600"
        >
          {hero.subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.6}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          <Link
            href={hero.primary_button_link}
            className="rounded-full bg-violet-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-xl"
          >
            {hero.primary_button_text}
          </Link>

          {hero.secondary_button_text && hero.secondary_button_link && (
            <Link
              href={hero.secondary_button_link}
              className="rounded-full border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:text-violet-600 hover:shadow-lg"
            >
              {hero.secondary_button_text}
            </Link>
          )}
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 60,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.8,
            ease: "easeOut",
          }}
          className="mt-20"
        >
          <img
            src={hero.hero_image}
            alt={hero.title}
            className="w-full rounded-[40px] border border-white/40 object-cover shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
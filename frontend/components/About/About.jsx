"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function About({ about }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  console.log(about);

  return (
    <section className="relative overflow-hidden py-28 bg-gradient-to-br from-slate-50 via-white to-violet-50">
   {/* Background Decorations */}
<div className="absolute -top-32 -left-40 h-[420px] w-[420px] rounded-full bg-violet-200/40 blur-[120px]" />

<div className="absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-[120px]" />

<div className="absolute bottom-0 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-violet-100/40 blur-[100px]" /> 
  
  <div className="relative z-10 max-w-7xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-20 items-center">

      {/* Left Image */}

      <div className="relative">

        <img
          src={about.image}
          alt={about.title}
          className="w-full h-[620px] object-cover rounded-[32px] shadow-2xl"
        />

        <div className="absolute -bottom-8 -right-8 bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-5xl font-bold text-violet-600">
            16+
          </h2>

          <p className="text-slate-500 mt-2">
            Years Experience
          </p>
        </div>

      </div>

      {/* Right Content */}

      <div>

        <div className="flex items-center gap-4">
  <div className="h-[2px] w-12 rounded-full bg-violet-500"></div>

  <span className="rounded-full bg-violet-100 px-5 py-2 font-semibold text-violet-700">
    About Us
  </span>
</div>

        <h2 className="mt-8 text-5xl font-extrabold text-slate-900 leading-tight">
          {about.title}
        </h2>

        <p className="mt-8 text-lg leading-8 text-slate-600">
          {about.description}
        </p>

        <Link
          href="/about"
          className="inline-flex mt-10 rounded-full bg-violet-600 px-8 py-4 text-white font-semibold hover:bg-violet-700 transition"
        >
          Learn More →
        </Link>

        {/* Statistics */}

<div className="grid grid-cols-2 gap-6 mt-16">

  <Stat
    end={about.students_recruited}
    suffix="+"
    title="Students Guided"
    inView={inView}
  />

  <Stat
    end={98}
    suffix="%"
    title="Visa Success Rate"
    inView={inView}
  />

  <Stat
    end={18}
    suffix="+"
    title="Study Destinations"
    inView={inView}
  />

  <Stat
    end={about.university_partners}
    suffix="+"
    title="Partner Universities"
    inView={inView}
  />

</div>

      </div>

    </div>

  </div>
</section>
  );
}

function Stat({ end, suffix, title }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h3 className="text-5xl font-black text-violet-600">
        <CountUp
          start={0}
          end={end}
          duration={2.5}
          separator=","
        />
        {suffix}
      </h3>

      <p className="mt-3 text-slate-500 font-medium">
        {title}
      </p>
    </div>
  );
}
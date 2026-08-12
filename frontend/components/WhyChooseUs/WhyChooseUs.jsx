"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function WhyChooseUs({ features = [] }) {
    const cardVariants = {
  rest: {},
  hover: {},
};

const iconVariants = {
  rest: {
    x: 0,
    rotate: 0,
    scale: 1,
  },
  hover: {
    x: [0, -35, 12, -8, 3, 0],
    rotate: [0, -10, 10, -6, 0],
    scale: [1, 1.2, 1.1, 1.15, 1.1],
    transition: {
      duration: 0.9,
    },
  },
};
  return (
    <section className="relative overflow-hidden bg-white py-28">

      {/* Background */}

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-300/10 blur-[130px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-300/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            viewport={{ once: true }}
          >

            <span className="rounded-full bg-violet-100 px-5 py-2 font-semibold text-violet-700">
              Why Choose Us
            </span>

            <h2 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900">
              Your Trusted Study Abroad Partner
            </h2>

            <p className="mt-7 text-lg leading-9 text-slate-600">
              We help students achieve their dream of studying abroad with
              expert counseling, university selection, scholarships, visa
              processing, and complete admission support.
            </p>

            {/* Statistics */}

            <div className="mt-10 grid grid-cols-2 gap-8">

              <div>
                <h3 className="text-5xl font-bold text-violet-600">
                  15+
                </h3>

                <p className="mt-2 text-slate-500">
                  Years Experience
                </p>
              </div>

              <div>
                <h3 className="text-5xl font-bold text-violet-600">
                  20K+
                </h3>

                <p className="mt-2 text-slate-500">
                  Students Guided
                </p>
              </div>

            </div>

            <button className="mt-12 flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-xl transition hover:scale-105">

              Free Consultation

              <ArrowRight size={18} />

            </button>

          </motion.div>

          {/* RIGHT */}

          <div className="grid gap-6 sm:grid-cols-2">

            {features.map((item, index) => (

             <motion.div
  key={item.id}
  variants={cardVariants}
  initial="rest"
  whileHover="hover"
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  viewport={{ once: true }}
  transition={{
    duration: 0.7,
    delay: index * 0.1,
  }}
  className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all hover:-translate-y-3 hover:shadow-2xl"
>

                <motion.div
  variants={iconVariants}
  className="mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 via-white to-blue-100 shadow-lg"
>
  <img
    src={item.icon}
    alt={item.title}
    className="h-[80px] w-[80px] object-contain"
  />
</motion.div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {item.description}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
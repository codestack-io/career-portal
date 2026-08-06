"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ({ faqs = [] }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-violet-50 py-28">

      {/* Background */}

      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-violet-300/20 blur-[120px]" />

      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-300/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

  <img
    src="https://res.cloudinary.com/ciiop60x/image/upload/v1785944828/bg-2_rue33e.jpg"
    alt=""
    className="w-[700px] opacity-10 blur-[1px]"
  />

</div>

        {/* Heading */}

        <div className="mb-20 text-center">

          <span className="rounded-full bg-violet-100 px-5 py-2 font-semibold text-violet-700">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">
            Everything You Need to Know
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Find answers about admissions, scholarships, visas,
            universities and studying abroad.
          </p>

        </div>

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left Image */}

          {/* Consultant Video */}

<motion.div
  initial={{ opacity: 0, x: -60 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative"
>
  <div className="overflow-hidden rounded-[40px] shadow-2xl border border-white/40 bg-white">

    <video
  className="h-full w-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  controls
  preload="metadata"
>
  <source
    src="https://res.cloudinary.com/ciiop60x/video/upload/v1786008004/consulting_a3mcuc.mp4"
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video>

  </div>
</motion.div>

          {/* Accordion */}

          <motion.div
  initial={{ opacity: 0, x: 60 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="grid grid-cols-1 gap-6 md:grid-cols-2"
>

            {faqs.map((faq, index) => (

              <div
                key={faq.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
              >

                <button
                  onClick={() =>
                    setOpen(open === index ? null : index)
                  }
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                >

                  <h3 className="text-lg font-semibold text-slate-900">
                    {faq.question}
                  </h3>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">

                    {open === index ? (
                      <Minus className="text-violet-600" size={20} />
                    ) : (
                      <Plus className="text-violet-600" size={20} />
                    )}

                  </div>

                </button>

                <AnimatePresence>

                  {open === index && (

                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: .35,
                      }}
                    >

                      <div className="border-t border-slate-100 px-8 pb-7 pt-6">

                        <p className="leading-8 text-slate-600">
                          {faq.answer}
                        </p>

                      </div>

                    </motion.div>

                  )}

                </AnimatePresence>

              </div>

            ))}

          </motion.div>

        </div>

      </div>

    </section>
  );
}
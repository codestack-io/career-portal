"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export default function Testimonials({ testimonials = [] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-violet-50 py-28">
      {/* Background */}

      <div className="absolute -top-40 left-0 h-[420px] w-[420px] rounded-full bg-violet-300/20 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-300/20 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="rounded-full bg-violet-100 px-5 py-2 font-semibold text-violet-700">
            Testimonials
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">
            What Our Students Say
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Thousands of students have trusted us for admissions,
            scholarships and visa guidance. Here&apos;s what they think.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
  key={item.id}
  initial={{
    opacity: 0,
    y: 80,
    scale: 0.9,
    rotateX: 15,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
  }}
  transition={{
    duration: 0.8,
    delay: index * 0.15,
    ease: "easeOut",
  }}
  viewport={{ once: true }}
  whileHover={{
  y: -30,
  scale: 1.06,
  rotateX: -8,
  rotateY: index % 2 === 0 ? 8 : -8,
  z: 60,
  transition: {
    type: "spring",
    stiffness: 220,
    damping: 14,
  },
}}
  whileTap={{
    scale: 0.98,
  }}
  style={{
    transformStyle: "preserve-3d",
  }}
  className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl transition-all duration-500"
>
              {/* Glow */}

            <motion.div
           className="absolute -right-24 -top-24 h-52 w-52 rounded-full bg-gradient-to-r from-violet-500/30 to-blue-500/30 blur-3xl"
           initial={{ scale: 0.6, opacity: 0.2 }}
           whileHover={{
           scale: 1.4,
            opacity: 0.6,
       }}
         transition={{
          duration: 0.5,
        }}
       />
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-violet-500/5 blur-2xl" />

        <div className="absolute left-0 top-0 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl" />
              {/* Quote */}

              <motion.div
         whileHover={{
          rotate: 360,
         scale: 1.2,
         }}
        transition={{
        duration: 0.8,
        }}
        >
     <Quote
     size={44}
     className="mb-6 text-violet-500 opacity-20"
    />
   </motion.div>

              {/* Review */}

              <p className="leading-8 text-slate-600">
                &ldquo;{item.feedback}&rdquo;
              </p>

              {/* Rating */}

             <div className="mt-7 flex gap-1">
            {[...Array(item.rating)].map((_, i) => (
            <motion.div
            key={i}
            whileHover={{
            scale: 1.5,
            rotate: 20,
            }}
            transition={{
            type: "spring",
            stiffness: 300,
            }}
          >
          <Star
          size={18}
          className="fill-yellow-400 text-yellow-400"
         />
         </motion.div>
        ))}
      </div>

              {/* Bottom */}

              <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
                {/* Avatar */}

               <motion.img
  src={item.image}
  alt={item.name}
  whileHover={{
    scale: 1.15,
    rotate: 8,
  }}
  transition={{
    type: "spring",
    stiffness: 250,
  }}
  className="h-16 w-16 rounded-full object-cover border-2 border-violet-500 shadow-lg"
/>

               <div>
            <h4 className="text-lg font-bold text-slate-900">
            {item.name}
            </h4>

            <p className="text-violet-600 font-medium">
             {item.designation}
            </p>

             <p className="text-sm text-slate-500">
             {item.university}
            </p>
            </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
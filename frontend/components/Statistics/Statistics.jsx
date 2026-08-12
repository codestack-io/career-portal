"use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import { motion } from "framer-motion";

export default function Statistics({ statistics = [] }) {
    const { ref, inView } = useInView({
  triggerOnce: true,
  threshold: 0.3,
});
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#111827] to-[#0B1220] py-24">

      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-500/10 blur-[140px]" />

      <div
      ref={ref}
      className="relative mx-auto max-w-7xl px-6"
      >

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >

          <span className="rounded-full bg-violet-500/20 px-5 py-2 font-medium text-violet-300">
            Our Achievements
          </span>

          <h2 className="mt-6 text-5xl font-black text-white">
            Trusted By Thousands
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            We have successfully helped thousands of students
            build their international education journey.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {statistics.map((item, index) => (

            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: .7,
                delay: index * .12,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.04,
              }}
              className="group relative overflow-hidden rounded-[30px]
              border border-white/10 bg-white/5 p-8
              backdrop-blur-xl
              shadow-[0_20px_60px_rgba(0,0,0,.25)]
              transition-all duration-500"
            >

              {/* Glow */}

              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

              {/* Icon */}

              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * .4,
                }}
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl"
              >

                <img
                  src={item.icon}
                  alt={item.title}
                  className="h-16 w-16 object-contain"
                />

              </motion.div>

              {/* Value */}

        {/* Value */}

<h3 className="mt-8 text-center text-5xl font-black text-white">

  {inView && (
    <>
      <CountUp
        end={parseInt(item.value.replace(/\D/g, ""))}
        duration={2.5}
        separator=","
      />

      {item.value.includes("%") && "%"}
      {item.value.includes("+") && "+"}
    </>
  )}

</h3>
              {/* Title */}

              <p className="mt-4 text-center text-lg font-medium text-gray-300">

                {item.title}

              </p>

              {/* Bottom line */}

              <div className="mx-auto mt-8 h-1 w-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 group-hover:w-full" />

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}
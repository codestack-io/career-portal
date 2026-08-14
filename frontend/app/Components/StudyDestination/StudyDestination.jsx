'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Building2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Parent container variant to handle stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card's animation
    },
  },
};

// Dynamic Card Variant based on index
const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    // Alternates entry direction: Even from Left (-80px), Odd from Right (80px)
    x: index % 2 === 0 ? -80 : 80,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 1, 0.5, 1], // Smooth cubic-bezier transition
    },
  },
};

export default function StudyDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/study-destinations/')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading study destinations:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-24 gap-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-purple-600 font-medium animate-pulse">
          Loading destinations...
        </p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 overflow-hidden">
      {/* Section Header with Fade In */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Top Study Destinations
        </h2>
        <p className="text-slate-600 mt-4 text-base sm:text-lg leading-relaxed">
          Explore world-class education options, prestigious universities, and
          career pathways across leading global study hubs.
        </p>
      </motion.div>

      {/* Grid List with Alternating Left/Right Staggered Entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {destinations.map((dest, index) => {
          const coursesList = dest.popular_courses
            ? dest.popular_courses.split(',').map((c) => c.trim())
            : [];

          return (
            <motion.div
              key={dest.id}
              custom={index} // Passes index to cardVariants for direction calculation
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden group"
            >
              {/* Cover Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                {/* Flag & Name Overlay */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  {dest.flag && (
                    <motion.img
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      src={dest.flag}
                      alt={`${dest.name} flag`}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-md"
                    />
                  )}
                  <h3 className="text-2xl font-bold text-white drop-shadow-sm">
                    {dest.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6">
                    {dest.short_description}
                  </p>

                  {/* Highlights Box */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 space-y-3 mb-6 border border-slate-100">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-slate-500 flex items-center gap-1.5 font-medium">
                        <Building2 size={16} className="text-purple-600" />{' '}
                        Universities
                      </span>
                      <span className="font-bold text-slate-900">
                        {dest.universities_count}+
                      </span>
                    </div>

                    {dest.average_tuition && (
                      <div className="flex items-center justify-between text-xs sm:text-sm border-t border-slate-200/60 pt-2.5">
                        <span className="text-slate-500 font-medium">
                          Avg. Tuition
                        </span>
                        <span className="font-semibold text-purple-700">
                          {dest.average_tuition}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Popular Courses Pills */}
                  {coursesList.length > 0 && (
                    <div className="mb-6">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Popular Courses
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {coursesList.slice(0, 3).map((course, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 * idx }}
                            className="text-xs bg-purple-50 text-purple-700 font-medium px-2.5 py-1 rounded-full border border-purple-100"
                          >
                            {course}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive Action Link */}
                <Link href={`/study-destinations/${dest.id}`}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-purple-600 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-colors duration-300 shadow-sm group/btn"
                  >
                    <span>Explore Destination</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
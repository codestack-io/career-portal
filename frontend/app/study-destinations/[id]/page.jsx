'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Building2,
  DollarSign,
  Calendar,
  GraduationCap,
  ChevronRight,
  CheckCircle2,
  Briefcase,
  Globe,
  Sparkles,
  MapPin,
  Clock,
  Coins,
} from 'lucide-react';

export default function StudyDestinationDetail({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${API_BASE_URL}/api/study-destinations/${id}/`)
      .then((res) => {
        setDestination(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching destination details:', err);
        setError(true);
        setLoading(false);
      });
  }, [id, API_BASE_URL]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4 bg-slate-950 text-white">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <Globe className="absolute text-purple-400 animate-pulse" size={24} />
        </div>
        <p className="text-slate-400 text-sm font-medium tracking-wide">Loading Destination Guide...</p>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center gap-6 bg-slate-950 px-4 text-center">
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 max-w-md w-full">
          <Globe size={48} className="mx-auto mb-3 opacity-80" />
          <h2 className="text-2xl font-bold text-white">Destination Details Unavailable</h2>
          <p className="text-sm text-slate-400 mt-2">We couldn&apos;t retrieve the information for this country.</p>
        </div>
        <Link
          href="/study-destinations"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-purple-600/25"
        >
          All Destinations
        </Link>
      </div>
    );
  }

  const coursesList = typeof destination.popular_courses === 'string'
    ? destination.popular_courses.split(',').map((c) => c.trim()).filter(Boolean)
    : Array.isArray(destination.popular_courses)
    ? destination.popular_courses
    : [];

  const slideFromLeft = {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, ease: 'easeOut' },
  };

  const slideFromRight = {
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, ease: 'easeOut' },
  };

  const staggerContainer = {
    whileInView: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white pb-24 overflow-x-hidden">
      {/* Banner Section */}
      <section className="relative h-[480px] sm:h-[550px] w-full overflow-hidden border-b border-slate-800 -mt-24 sm:-mt-28 pt-24 sm:pt-28">
        {destination.image && (
          <img
            src={destination.image}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 filter brightness-90"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20 backdrop-blur-[1px]" />

        <div className="absolute bottom-12 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 z-20">
          <motion.div
            {...slideFromLeft}
            className="flex flex-col sm:flex-row items-start sm:items-end gap-5"
          >
            {destination.flag && (
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur opacity-50 group-hover:opacity-80 transition duration-300" />
                <img
                  src={destination.flag}
                  alt={`${destination.name} flag`}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white/20 shadow-2xl"
                />
              </div>
            )}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-2 backdrop-blur-md">
                <Globe size={13} /> Destination Overview
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                Study in <span className="bg-gradient-to-r from-purple-300 via-white to-purple-200 bg-clip-text text-transparent">{destination.name}</span>
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-400 bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-xl backdrop-blur-md w-fit shadow-lg">
          <Link href="/" className="hover:text-purple-400 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="text-slate-600" />
          <Link href="/study-destinations" className="hover:text-purple-400 transition-colors">
            Destinations
          </Link>
          <ChevronRight size={14} className="text-slate-600" />
          <span className="text-purple-300 font-medium">{destination.name}</span>
        </div>

        {/* Highlight Stats */}
        <motion.div
          {...slideFromRight}
          className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <div className="flex items-center gap-4 p-2 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-800/40 transition-all">
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Top Universities</p>
              <p className="text-xl font-bold text-white">{destination.universities_count ?? 0}+</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-800/40 transition-all">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Avg. Tuition</p>
              <p className="text-xl font-bold text-white truncate max-w-[150px]">{destination.average_tuition || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-800/40 transition-all">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Main Intakes</p>
              <p className="text-xl font-bold text-white truncate max-w-[150px]">{destination.intakes || 'Fall / Spring'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-800/40 transition-all">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Post-Study Work</p>
              <p className="text-xl font-bold text-white truncate max-w-[150px]">{destination.post_study_work || '2 - 4 Years'}</p>
            </div>
          </div>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <motion.div
              {...slideFromLeft}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2.5">
                <Sparkles size={22} className="text-purple-400" />
                About {destination.name}
              </h2>
              <p className="text-slate-300 leading-relaxed text-base whitespace-pre-line">
                {destination.full_description || destination.short_description}
              </p>
            </motion.div>

            {/* Popular Courses */}
            {coursesList.length > 0 && (
              <motion.div
                {...slideFromRight}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <GraduationCap size={22} className="text-purple-400" />
                  Popular Fields of Study
                </h2>
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {coursesList.map((course, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-purple-500/30 transition-all duration-300 group"
                    >
                      <CheckCircle2 size={18} className="text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-slate-200 font-medium text-sm">{course}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Academic Intakes */}
            {destination.intakes_list?.length > 0 && (
              <motion.section
                {...slideFromLeft}
                id="intake"
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl overflow-hidden"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <Clock size={22} className="text-purple-400" />
                  Academic Intakes
                </h2>
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-300 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                        <th className="p-4">Intake Name</th>
                        <th className="p-4">Months / Timing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-sm text-slate-300">
                      {destination.intakes_list.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 font-semibold text-white">{item.intake_name}</td>
                          <td className="p-4 text-purple-300">{item.months}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.section>
            )}

            {/* Program Durations */}
            {destination.program_durations?.length > 0 && (
              <motion.section
                {...slideFromRight}
                id="programs"
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl overflow-hidden"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <GraduationCap size={22} className="text-purple-400" />
                  Program Durations
                </h2>
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-300 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                        <th className="p-4">Degree Level</th>
                        <th className="p-4">Typical Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-sm text-slate-300">
                      {destination.program_durations.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 font-semibold text-white">{item.program_level}</td>
                          <td className="p-4 text-slate-300">{item.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.section>
            )}

            {/* Cost Breakdowns */}
            {destination.cost_breakdowns?.length > 0 && (
              <motion.section
                {...slideFromLeft}
                id="cost"
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl overflow-hidden"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <Coins size={22} className="text-purple-400" />
                  Cost of Studying
                </h2>
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-300 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
                        <th className="p-4">Program Level</th>
                        <th className="p-4">Foreign Amount (Avg.)</th>
                        <th className="p-4">BDT Equivalent (Approx.)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-sm text-slate-300">
                      {destination.cost_breakdowns.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 font-semibold text-white">{item.program_level}</td>
                          <td className="p-4 text-emerald-400 font-medium">{item.amount_foreign}</td>
                          <td className="p-4 text-purple-300">{item.amount_local}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.section>
            )}

            {/* Top Student Cities */}
            {destination.cities?.length > 0 && (
              <section id="cities">
                <motion.h2 {...slideFromLeft} className="text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <MapPin size={22} className="text-purple-400" />
                  Top Student Cities
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {destination.cities.map((city, idx) => (
                    <motion.div
                      key={city.id}
                      {...(idx % 2 === 0 ? slideFromLeft : slideFromRight)}
                      className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-purple-500/40 transition-all duration-300 flex flex-col"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                        {city.image && (
                          <img
                            src={city.image}
                            alt={city.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs font-bold text-purple-300 px-3 py-1 rounded-full">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                            {city.name}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {city.tagline}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Work Opportunities */}
            {destination.work_opportunities?.length > 0 && (
              <section id="work" className="space-y-4">
                <motion.h2 {...slideFromLeft} className="text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <Briefcase size={22} className="text-purple-400" />
                  Work Opportunities
                </motion.h2>
                {destination.work_opportunities.map((work, idx) => (
                  <motion.div
                    key={work.id}
                    {...(idx % 2 === 0 ? slideFromLeft : slideFromRight)}
                    className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start"
                  >
                    <div className="p-3.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded-xl shrink-0">
                      <Briefcase size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1.5">{work.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">{work.description}</p>
                    </div>
                  </motion.div>
                ))}
              </section>
            )}
          </div>

          {/* Sticky Sidebar CTA */}
          <aside className="lg:col-span-1">
            <motion.div
              {...slideFromRight}
              className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-purple-500/20 rounded-2xl p-6 text-white shadow-xl sticky top-28"
            >
              <h3 className="text-xl font-bold mb-2">Apply to {destination.name}</h3>
              <p className="text-sm text-slate-400 mb-6">
                Get personalized guidance from our education experts to start your admissions process.
              </p>
              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-purple-600/30"
              >
                Get Free Counseling
                <ChevronRight size={18} />
              </Link>
            </motion.div>
          </aside>
        </div>
      </main>
    </div>
  );
}
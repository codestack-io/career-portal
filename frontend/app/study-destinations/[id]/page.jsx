'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Building2,
  DollarSign,
  Calendar,
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  Globe,
  Sparkles,
  Send,
  MapPin,
  Clock,
  Coins,
  ShieldCheck,
} from 'lucide-react';

export default function StudyDestinationDetail({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const router = useRouter();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://127.0.0.1:8000/api/study-destinations/${id}/`)
      .then((res) => {
        setDestination(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching destination details:', err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center gap-4 bg-slate-900 text-white">
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
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
          <Globe size={48} className="mx-auto mb-2 opacity-80" />
          <h2 className="text-2xl font-bold text-white">Destination Details Unavailable</h2>
          <p className="text-sm text-slate-400 mt-1">We couldn&apos;t retrieve the information for this country.</p>
        </div>
        <Link
          href="/study-destinations"
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-purple-600/25"
        >
          <ArrowLeft size={18} /> Back to Destinations
        </Link>
      </div>
    );
  }

  const coursesList = destination.popular_courses
    ? destination.popular_courses.split(',').map((c) => c.trim())
    : [];

  // Slide Animation Definitions
  const slideFromLeft = {
    initial: { opacity: 0, x: -60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  const slideFromRight = {
    initial: { opacity: 0, x: 60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, ease: 'easeOut' },
  };

  const staggerContainer = {
    whileInView: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white pb-24 overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative h-[460px] sm:h-[520px] w-full overflow-hidden border-b border-slate-800">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover object-center transform scale-105 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 backdrop-blur-[2px]" />

        {/* Floating Top Navigation */}
        <div className="absolute top-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 z-20">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 hover:border-white/20 backdrop-blur-md text-slate-200 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 shadow-lg group cursor-pointer"
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={18} className="text-purple-400 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back</span>
          </button>
        </div>

        {/* Hero Title Container */}
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-2">
                <Globe size={13} /> Destination Overview
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
                Study in <span className="bg-gradient-to-r from-purple-300 via-white to-purple-200 bg-clip-text text-transparent">{destination.name}</span>
              </h1>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        {/* Highlight Stats Bar */}
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
              <p className="text-xl font-bold text-white">{destination.universities_count}+</p>
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

        {/* Split Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Informational Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About Section - Slides from Left */}
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

            {/* Popular Courses - Slides from Right */}
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

            {/* Academic Intake Table - Slides from Left */}
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

            {/* Program Duration Table - Slides from Right */}
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

            {/* Cost Table - Slides from Left */}
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

            {/* Top Cities - Cards alternate entrance from Left/Right */}
            {destination.cities?.length > 0 && (
              <section id="cities">
                <motion.h2 {...slideFromLeft} className="text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
                  <MapPin size={22} className="text-purple-400" />
                  Top Student Cities
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {destination.cities.map((city, idx) => (
                    <motion.div
                      key={city.id}
                      {...(idx % 2 === 0 ? slideFromLeft : slideFromRight)}
                      className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-purple-500/40 transition-all duration-300 flex flex-col"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={city.image}
                          alt={city.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
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

            {/* Work Opportunities - Alternate entries */}
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

          {/* Sticky Sidebar Form - Slides in from Right */}
          <aside className="lg:col-span-1">
            <motion.div
              {...slideFromRight}
              className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-purple-500/20 text-white rounded-3xl p-6 sm:p-8 shadow-2xl sticky top-8"
            >
              <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <ShieldCheck size={16} /> Verified Guidance
              </div>
              <h3 className="text-2xl font-extrabold mb-2 text-white">Study in {destination.name}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Connect with our expert advisors for personalized university options, scholarships, and visa filing.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1.5 block">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1.5 block">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+880 1700-000000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-purple-600/25 mt-2"
                >
                  <Send size={16} /> Request Free Counseling
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>⚡ 100% Free Consultation</span>
                <span>🔒 Data Protected</span>
              </div>
            </motion.div>
          </aside>
        </div>
      </main>
    </div>
  );
}
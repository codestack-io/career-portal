// app/study-destinations/[id]/page.jsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Building2,
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
  BadgeDollarSign,
  FileCheck,
  Award,
} from 'lucide-react';
import SidebarCTA from '../../(Components)/SidebarCTA/SidebarCTA';
import ScrollAnimate from '../../(Components)/ScrollAnimate';
import Counter from '../../(Components)/Counter';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const iconMap = {
  briefcase: Briefcase,
  clock: Clock,
  money: BadgeDollarSign,
  visa: FileCheck,
};

async function fetchDestination(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/study-destinations/${slug}/`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;
    const data = await res.json();
    
    // Handle DRF pagination response structure if returned
    if (data.results && Array.isArray(data.results)) {
      return (
        data.results.find(
          (item) => item.slug === slug || String(item.id) === String(slug)
        ) || data.results[0]
      );
    }

    return data;
  } catch (err) {
    console.error('Error fetching destination details:', err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const destination = await fetchDestination(resolvedParams.id);

  if (!destination) {
    return { title: 'Destination Not Found' };
  }

  return {
    title: `Study in ${destination.name} | Guide & Universities`,
    description: destination.short_description || `Learn about costs, intakes, and programs for studying in ${destination.name}.`,
  };
}

export default async function StudyDestinationDetail({ params }) {
  const resolvedParams = await params;
  const destination = await fetchDestination(resolvedParams.id);

  if (!destination) {
    notFound();
  }

  // Parse Popular Courses
  const coursesList =
    typeof destination.popular_courses === 'string'
      ? destination.popular_courses.split(',').map((c) => c.trim()).filter(Boolean)
      : Array.isArray(destination.popular_courses)
      ? destination.popular_courses
      : [];

  // Safely extract scholarships based on Django related_name="scholarships"
  const scholarshipsList =
    destination.scholarships ||
    destination.scholarship_list ||
    destination.scholarships_list ||
    destination.scholarship_set ||
    [];

  const intakesList =
    destination.intakes_list ||
    destination.intake_list ||
    destination.intakes ||
    [];

  const programDurations =
    destination.program_durations ||
    destination.program_duration_list ||
    destination.durations ||
    [];

  const costBreakdowns =
    destination.cost_breakdowns ||
    destination.cost_breakdown_list ||
    destination.costs ||
    [];

  const citiesList =
    destination.cities ||
    destination.city_list ||
    destination.top_cities ||
    [];

  const workOpportunities =
    destination.work_opportunities ||
    destination.work_opportunity_list ||
    destination.work_list ||
    [];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans selection:bg-purple-500 selection:text-white pb-24 overflow-x-hidden">
      {/* Banner Section */}
      <section className="relative h-[380px] sm:h-[440px] w-full overflow-hidden border-b border-slate-200">
        {destination.image && (
          <img
            src={destination.image}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 filter brightness-90"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/20" />

        <div className="absolute bottom-10 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 z-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            {destination.flag && (
              <div className="relative group shrink-0">
                <img
                  src={destination.flag}
                  alt={`${destination.name} flag`}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-xl"
                />
              </div>
            )}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold tracking-wider uppercase mb-2 backdrop-blur-md">
                <Globe size={13} /> Destination Overview
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Study in <span>{destination.name}</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 relative z-20">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs sm:text-sm text-slate-500 bg-white border border-slate-200/80 px-4 py-2.5 rounded-xl w-fit shadow-sm">
          <Link href="/" className="hover:text-purple-600 transition-colors font-medium">
            Home
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link href="/study-destinations" className="hover:text-purple-600 transition-colors font-medium">
            Destinations
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold">{destination.name}</span>
        </div>

        {/* Highlight Stats */}
        <ScrollAnimate direction="left">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="flex items-center gap-4 p-2 rounded-xl hover:bg-slate-50 transition-all">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <Building2 size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Top Universities</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900">
                  <Counter value={destination.universities_count ?? 0} />+
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2 rounded-xl hover:bg-slate-50 transition-all">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Calendar size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Main Intakes</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 truncate max-w-[150px]">{destination.intakes || 'Fall / Spring'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-2 rounded-xl hover:bg-slate-50 transition-all">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Briefcase size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Post-Study Work</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 truncate max-w-[150px]">{destination.post_study_work || '2 - 4 Years'}</p>
              </div>
            </div>
          </div>
        </ScrollAnimate>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <ScrollAnimate direction="left">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2.5">
                  <Sparkles size={22} className="text-purple-600" />
                  About {destination.name}
                </h2>
                <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">
                  {destination.full_description || destination.short_description}
                </p>
              </div>
            </ScrollAnimate>

            {/* Popular Courses */}
            {coursesList.length > 0 && (
              <ScrollAnimate direction="right">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                    <GraduationCap size={22} className="text-purple-600" />
                    Popular Fields of Study
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {coursesList.map((course, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-purple-200 transition-all duration-300 group"
                      >
                        <CheckCircle2 size={18} className="text-purple-600 shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-slate-800 font-medium text-sm">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollAnimate>
            )}

            {/* Academic Intakes Table */}
            {Array.isArray(intakesList) && intakesList.length > 0 && (
              <ScrollAnimate direction="left">
                <section id="intake" className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm overflow-hidden">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                    <Clock size={22} className="text-purple-600" />
                    Academic Intakes
                  </h2>
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                          <th className="p-4">Intake Name</th>
                          <th className="p-4">Months / Timing</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                        {intakesList.map((item, idx) => (
                          <tr key={item.id || idx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-semibold text-slate-900">{item.intake_name || item.name}</td>
                            <td className="p-4 text-purple-700 font-medium">{item.months || item.timing}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </ScrollAnimate>
            )}

            {/* Program Durations Table */}
            {programDurations.length > 0 && (
              <ScrollAnimate direction="right">
                <section id="programs" className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm overflow-hidden">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                    <GraduationCap size={22} className="text-purple-600" />
                    Program Durations
                  </h2>
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                          <th className="p-4">Degree Level</th>
                          <th className="p-4">Typical Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                        {programDurations.map((item, idx) => (
                          <tr key={item.id || idx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-semibold text-slate-900">{item.program_level || item.level}</td>
                            <td className="p-4 text-slate-600">{item.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </ScrollAnimate>
            )}

            {/* Cost Breakdowns Table */}
            {costBreakdowns.length > 0 && (
              <ScrollAnimate direction="left">
                <section id="cost" className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm overflow-hidden">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                    <Coins size={22} className="text-purple-600" />
                    Cost of Studying
                  </h2>
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                          <th className="p-4">Program Level</th>
                          <th className="p-4">Foreign Amount (Avg.)</th>
                          <th className="p-4">BDT Equivalent (Approx.)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                        {costBreakdowns.map((item, idx) => (
                          <tr key={item.id || idx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-semibold text-slate-900">{item.program_level || item.level}</td>
                            <td className="p-4 text-emerald-600 font-semibold">{item.amount_foreign}</td>
                            <td className="p-4 text-purple-700 font-medium">{item.amount_local}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </ScrollAnimate>
            )}

            {/* Scholarships Section */}
            {scholarshipsList.length > 0 && (
              <ScrollAnimate direction="right">
                <section id="scholarships" className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm overflow-hidden">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                    <Award size={22} className="text-purple-600" />
                    Scholarships & Financial Aid
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scholarshipsList
                      .filter((sch) => sch.is_active !== false)
                      .map((sch, idx) => (
                        <div
                          key={sch.id || idx}
                          className="p-5 border border-slate-200/90 rounded-xl hover:border-purple-300 hover:shadow-sm transition-all bg-slate-50/40 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="text-[11px] font-semibold uppercase tracking-wider bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full">
                                {sch.offered_by || 'National Scholarship'}
                              </span>
                              {sch.application_deadline && (
                                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                  <Clock size={12} className="text-slate-400" />
                                  {sch.application_deadline}
                                </span>
                              )}
                            </div>

                            <h3 className="font-bold text-slate-900 text-base mb-2">{sch.title}</h3>

                            {sch.coverage && (
                              <p className="text-xs text-slate-600 leading-relaxed mb-2">
                                <span className="font-semibold text-slate-700">Coverage: </span>
                                {sch.coverage}
                              </p>
                            )}

                            {sch.eligibility && (
                              <div className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100 mt-2">
                                <span className="font-semibold text-slate-700 block mb-1">Eligibility:</span>
                                <div
                                  className="prose prose-xs max-w-none text-slate-600"
                                  dangerouslySetInnerHTML={{ __html: sch.eligibility }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              </ScrollAnimate>
            )}

            {/* Top Student Cities */}
            {citiesList.length > 0 && (
              <ScrollAnimate direction="right">
                <section id="cities">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                    <MapPin size={22} className="text-purple-600" />
                    Top Student Cities
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {citiesList.map((city, idx) => (
                      <div
                        key={city.id || idx}
                        className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:border-purple-300 transition-all duration-300 flex flex-col"
                      >
                        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                          {city.image && (
                            <img
                              src={city.image}
                              alt={city.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                          <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-xs font-bold text-white px-3 py-1 rounded-full">
                            #{idx + 1}
                          </span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-purple-600 transition-colors">
                              {city.name}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                              {city.tagline || city.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollAnimate>
            )}

            {/* Work Opportunities */}
            {workOpportunities.length > 0 && (
              <ScrollAnimate direction="left">
                <section id="work" className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                    <Briefcase size={22} className="text-purple-600" />
                    Work Opportunities
                  </h2>
                  {workOpportunities.map((work, idx) => {
                    const IconComponent = iconMap[work.icon?.toLowerCase()] || Briefcase;

                    return (
                      <div
                        key={work.id || idx}
                        className="bg-purple-50/50 border border-purple-100 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 items-start"
                      >
                        <div className="p-3.5 bg-purple-100 text-purple-700 rounded-xl shrink-0">
                          <IconComponent size={22} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-1.5">{work.title || work.name}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{work.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </section>
              </ScrollAnimate>
            )}
          </div>

          {/* Sidebar CTA */}
          <ScrollAnimate direction="right">
            <SidebarCTA destinationName={destination.name} apiBaseUrl={API_BASE_URL} />
          </ScrollAnimate>
        </div>
      </main>
    </div>
  );
}
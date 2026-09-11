"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BuildingLibraryIcon, 
  MapPinIcon, 
  AcademicCapIcon, 
  CurrencyDollarIcon, 
  ClockIcon, 
  SparklesIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function UniversityDetailsPage({ params }) {
  const [university, setUniversity] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { slug } = use(params);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const url = `http://127.0.0.1:8000/api/universities/${slug}/`;
        const uniRes = await fetch(url);
        
        if (!uniRes.ok) {
          console.error(`Failed to load university details. URL: ${url} | Status: ${uniRes.status}`);
          return;
        }

        const uniData = await uniRes.json();
        setUniversity(uniData);

        // Fetch courses for this specific university ID
        const coursesRes = await fetch(
          `http://127.0.0.1:8000/api/courses/?university=${uniData.id}`
        );

        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          
          // FIX: Handle both DRF paginated object ({ results: [...] }) and flat array ([...])
          const courseList = Array.isArray(coursesData)
            ? coursesData
            : coursesData.results || [];

          setCourses(courseList);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug]);

  // FIX: Safely guard array filtering with Array.isArray
  const safeCourses = Array.isArray(courses) ? courses : [];
  const filteredCourses = safeCourses.filter((course) => {
    const matchesLevel = selectedLevel === "all" || course.degree_level === selectedLevel;
    const matchesSearch = course.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg font-medium text-slate-500">Loading university courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-slate-900">Offered Programs</h2>
              <p className="text-slate-500 text-sm">Explore courses synced from your database</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
          </div>

          {/* Level Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All Levels", key: "all" },
              { label: "Bachelor's", key: "bachelors" },
              { label: "Master's", key: "masters" },
              { label: "PhD / Doctorate", key: "phd" },
              { label: "Diploma", key: "diploma" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedLevel(filter.key)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  selectedLevel === filter.key
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/20"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Course Cards */}
          <div className="space-y-4">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <motion.div
                  layout
                  key={course.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-violet-300 hover:shadow-md"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="space-y-2">
                      <span className="inline-block rounded-md bg-violet-100 px-2.5 py-1 text-xs font-bold uppercase text-violet-700">
                        {course.degree_level}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-violet-600 transition">
                        {course.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-500">
                        {course.university_name}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2">
                        <span className="flex items-center gap-1">
                          <ClockIcon className="h-4 w-4 text-slate-400" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <CurrencyDollarIcon className="h-4 w-4 text-slate-400" />
                          {course.tuition_fee} {course.currency} / year
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-600 hover:text-white"
                    >
                      View Requirements <ArrowRightIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                No courses found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Entry Requirements Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl space-y-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-violet-600">
                    {selectedCourse.degree_level}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{selectedCourse.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="rounded-full bg-slate-100 p-2 text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="text-sm font-semibold text-slate-800">Admission & Entry Requirements</h4>
                <div 
                  className="mt-3 text-sm leading-relaxed text-slate-600 prose prose-violet"
                  dangerouslySetInnerHTML={{ __html: selectedCourse.entry_requirements }}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
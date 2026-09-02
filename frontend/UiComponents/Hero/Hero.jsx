"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Sparkles, 
  GraduationCap, 
  X, 
  User, 
  Phone, 
  Mail, 
  ChevronRight,
  Headphones,
  Check
} from "lucide-react";

// Micro-interactions & Stagger Configs
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0, 
    scale: 0.96, 
    y: 8,
    transition: { duration: 0.15, ease: "easeInOut" }
  }
};

// Procedural Confetti Engine
const CONFETTI_COLORS = ["#F59E0B", "#10B981", "#8B5CF6", "#F43F5E", "#06B6D4"];
const CONFETTI_PARTICLES = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  x: Math.random() * 360 - 180,
  y: Math.random() * -160 - 40,
  rotate: Math.random() * 360,
  scale: Math.random() * 0.6 + 0.4,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
}));

export default function Hero({ hero }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    levelOfStudy: "",
    destination: "",
    qualification: "",
    proficiency: "",
    score: "",
    agreePrivacy: false,
  });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  // Lock body scroll during modal states
  useEffect(() => {
    if (isModalOpen || isSubmitted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen, isSubmitted]);

  // Handle ESC Key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeAllModals();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!hero) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Insert submission API payload here
    setIsModalOpen(false);
    setIsSubmitted(true);
  };

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
  };

  return (
    <section ref={ref} className="relative min-h-[90vh] w-full overflow-hidden bg-slate-950 text-white selection:bg-amber-400 selection:text-slate-950">
      {/* Background Media Engine */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src={hero.hero_image}
          alt={hero.title}
          className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-950/80 via-rose-950/40 to-transparent mix-blend-multiply" />
      </div>

      {/* Atmospheric Glow Orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 -right-20 h-96 w-96 rounded-full bg-rose-500/15 blur-[120px]" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-6 pt-24 pb-16">
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Proof Badge */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.05}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white shadow-2xl backdrop-blur-md transition-all hover:border-white/25">
              <Sparkles className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span>{hero.badge?.replace(/[0-9,+/]+/g, "").trim()}</span>
              {inView && (
                <span className="font-bold text-amber-300">
                  <CountUp
                    end={hero.badge_count}
                    duration={2.2}
                    separator=","
                    suffix="+"
                  />
                </span>
              )}
            </div>
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.15}
            className="text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]"
          >
            {hero.title}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.25}
            className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg md:text-xl font-normal leading-relaxed text-balance"
          >
            {hero.subtitle}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.35}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-amber-400 px-8 py-4 text-sm sm:text-base font-bold text-slate-950 shadow-xl shadow-amber-500/10 transition-all duration-300 hover:bg-amber-300 hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              <span>{hero.primary_button_text || "Explore Now"}</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </button>

            {hero.secondary_button_text && hero.secondary_button_link && (
              <Link
                href={hero.secondary_button_link}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 active:scale-95"
              >
                {hero.secondary_button_text}
              </Link>
            )}
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.07]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Top Universities</p>
              <p className="text-xs text-slate-400">Direct admission guidance</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.07]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">99% Visa Success</p>
              <p className="text-xs text-slate-400">Proven track record</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.07]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <ArrowUpRight className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Scholarships</p>
              <p className="text-xs text-slate-400">Up to 100% financial aid</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- FORM MODAL LAYER --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white text-slate-900 shadow-2xl z-10"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
                {/* Visual Sidebar */}
                <div className="md:col-span-5 bg-gradient-to-br from-violet-50 via-amber-50/50 to-white p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100">
                  <div>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-600 mb-6">
                      <Headphones className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                      We&apos;re here to assist YOU.
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      Enter your details and one of our expert counsellors will reach out to connect you with the right course, country, university, and available scholarships.
                    </p>
                  </div>

                  <div className="mt-8 rounded-2xl border border-violet-100 bg-white/80 p-4 backdrop-blur-sm shadow-sm">
                    <p className="text-[11px] font-bold text-violet-600 uppercase tracking-wider">Free Assessment</p>
                    <p className="text-xs font-semibold text-slate-800 mt-1">Get evaluated for up to 70% scholarship</p>
                  </div>
                </div>

                {/* Form Data Inputs */}
                <div className="md:col-span-7 p-6 sm:p-8">
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-slate-900">Fill up the form</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Get assessed for your target destination</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/15 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="Mobile number"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/15 transition-all"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Email address"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/15 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <select
                        name="levelOfStudy"
                        value={formData.levelOfStudy}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 px-4 text-sm text-slate-700 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/15 transition-all"
                      >
                        <option value="">Interested level of study</option>
                        <option value="bachelors">Bachelor&apos;s Degree</option>
                        <option value="masters">Master&apos;s Degree</option>
                        <option value="phd">PhD</option>
                      </select>

                      <select
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 px-4 text-sm text-slate-700 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/15 transition-all"
                      >
                        <option value="">Study destination</option>
                        <option value="uk">United Kingdom</option>
                        <option value="usa">United States</option>
                        <option value="canada">Canada</option>
                        <option value="australia">Australia</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      placeholder="Academic Qualification (e.g. HSC: GPA-4, 2024)"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/15 transition-all"
                    />

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <select
                        name="proficiency"
                        value={formData.proficiency}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 px-4 text-sm text-slate-700 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/15 transition-all"
                      >
                        <option value="">English proficiency</option>
                        <option value="ielts">IELTS</option>
                        <option value="pte">PTE</option>
                        <option value="duolingo">Duolingo</option>
                        <option value="none">Not Taken Yet</option>
                      </select>
                      <input
                        type="text"
                        name="score"
                        value={formData.score}
                        onChange={handleInputChange}
                        placeholder="Overall Score"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3 px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/15 transition-all"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="privacy"
                        name="agreePrivacy"
                        checked={formData.agreePrivacy}
                        onChange={handleInputChange}
                        required
                        className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer"
                      />
                      <label htmlFor="privacy" className="text-xs text-slate-600 select-none cursor-pointer">
                        By clicking you agree to our <span className="underline font-medium">Privacy Policy</span> *
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 text-sm font-bold text-slate-950 shadow-md transition-all hover:bg-amber-300 active:scale-[0.99] cursor-pointer"
                    >
                      <span>Submit now</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- SUCCESS MODAL LAYER --- */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAllModals}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-8 text-center text-slate-900 shadow-2xl z-10"
            >
              <button
                onClick={closeAllModals}
                aria-label="Close thank you modal"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Dynamic Confetti Particle Emitter */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                {CONFETTI_PARTICLES.map((particle) => (
                  <motion.span
                    key={particle.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: particle.scale }}
                    animate={{ 
                      x: particle.x, 
                      y: particle.y, 
                      opacity: [1, 1, 0],
                      rotate: particle.rotate 
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: particle.color }}
                  />
                ))}
              </div>

              {/* Status Graphic Icon */}
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner"
              >
                <Check className="h-10 w-10 stroke-[2.5]" />
              </motion.div>

              {/* Copywriting Details */}
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
                THANK YOU
              </h3>

              <p className="mt-3 text-sm font-semibold text-slate-600">
                We will contact with you soon!
              </p>

              {/* Close CTAs */}
              <button
                onClick={closeAllModals}
                className="mt-8 w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-95 cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
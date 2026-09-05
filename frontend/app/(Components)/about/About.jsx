"use client";

import React, { useEffect, useState, useRef } from "react";

const IMAGES = {
  heroMain: "https://res.cloudinary.com/ciiop60x/video/upload/v1786637507/video-2_qfuuky.mp4",
  heroFounder: "https://res.cloudinary.com/ciiop60x/image/upload/v1786635680/im-1_txvfq8.jpg",
  bgImg: "https://res.cloudinary.com/ciiop60x/image/upload/v1785944827/bg-1_fpob5g.jpg",
  expert1: "https://res.cloudinary.com/ciiop60x/image/upload/v1786635680/im-1_txvfq8.jpg",
  expert2: "https://res.cloudinary.com/ciiop60x/image/upload/v1786635680/im-2_rgfi62.jpg",
  expert3: "https://res.cloudinary.com/ciiop60x/image/upload/v1786635680/im-3_nehhip.jpg",
  expert4: "https://res.cloudinary.com/ciiop60x/image/upload/v1786635680/im-4_gho9be.jpg",
  expert5: "https://res.cloudinary.com/ciiop60x/image/upload/v1786635681/im-5_fmiiyw.jpg",
};

function CountUp({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      setCount(easeProgress * end);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-20 relative">
      
      {/* SECTION 1: HERO / ABOUT */}
      <section className="text-slate-900 overflow-hidden pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/3] sm:aspect-[1/1] transition-transform duration-500 hover:scale-[1.01]">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={IMAGES.heroMain} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Badge 1 */}
                <div className="absolute -top-6 -right-4 sm:right-2 bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-100 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold text-slate-900">
                      <CountUp end={99.2} decimals={1} suffix="%" />
                    </p>
                    <p className="text-xs font-medium text-slate-500">Visa Success Rate</p>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className="absolute -bottom-6 -left-4 sm:left-2 bg-[#111827] text-white rounded-3xl p-5 shadow-2xl border border-slate-800 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-extrabold">
                      <CountUp end={12} suffix="+ Years" />
                    </p>
                    <p className="text-xs text-slate-400">Consulting Experience</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  About Our Consultancy
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 leading-tight">
                  Accurate Guidance for Your <span className="italic font-normal text-slate-700">Overseas</span> Journey.
                </h1>
              </div>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                We streamline complex immigration processes into clear, achievable steps. Whether pursuing higher education, expanding your career abroad, or relocating your family, our licensed specialists ensure your application meets global compliance rules effortlessly.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  "Certified Immigration Experts",
                  "Transparent Document Verification",
                  "Fast-Track Application Workflows",
                  "Post-Arrival & Housing Support"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              <hr className="border-slate-100" />

              <div className="grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-2xl sm:text-4xl font-black text-slate-900">
                    <CountUp end={18} suffix="k+" />
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Visas Issued</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-4xl font-black text-slate-900">
                    <CountUp end={140} suffix="+" />
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Global Partners</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-4xl font-black text-slate-900">
                    <CountUp end={24} suffix="/7" />
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Legal Guidance</p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                    <img
                      src={IMAGES.heroFounder}
                      alt="Founder Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">David Ross</p>
                    <p className="text-[11px] text-slate-500">Managing Director</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: WHO WE ARE (MISSION & VISION) */}
      <section className="relative overflow-hidden py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="relative rounded-[2.5rem] overflow-hidden p-8 sm:p-12 lg:p-16 border border-slate-100 shadow-sm">
            <img
              src={IMAGES.bgImg}
              alt="Who We Are Background"
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/80 backdrop-blur-[2px] z-10" />

            <div className="relative z-20 max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase">
                  Our Identity
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                  Who <span className="italic font-normal text-slate-700">we</span> are
                </h2>
              </div>

              <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed text-center sm:text-left">
                <p className="font-medium text-slate-800">
                  We are a dedicated visa and immigration agency committed to helping individuals and families achieve their dreams of living, working, and studying abroad. With years of experience and a team of experts, we simplify the complexities of immigration processes to ensure a smooth and successful journey for our clients.
                </p>
                <p className="text-sm sm:text-base text-slate-600">
                  Our team of experienced professionals offers personalized services to ensure your travel documentation is handled efficiently and accurately. From visa assistance to flight bookings, accommodation arrangements, and more, we make your international travel experience stress-free and enjoyable.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-md transition-all hover:shadow-xl hover:border-blue-200">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-600 mb-3">Our mission</h3>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                    Providing tailored visa and immigration solutions to help people achieve their global aspirations.
                  </p>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-md transition-all hover:shadow-xl hover:border-blue-200">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-600 mb-3">Our vision</h3>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                    To be a trusted partner, guiding individuals and families toward a brighter future abroad.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION 3: WHY CHOOSE US */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase">
              Key Advantages
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Why <span className="italic font-normal text-slate-700">choose</span> us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 sm:p-10 rounded-[2rem] bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">24/7 Support</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our team is available around the clock to assist you with any urgent queries or updates regarding your application.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-[2rem] bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Personalized solutions</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Every case is unique, and we tailor our services to meet your specific background, requirements, and targets.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-[2rem] bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Transparent process</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Clear communication and guidance at every step with no hidden fees or unexpected delays along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR VISA EXPERTS */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase">
              Meet The Team
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Our <span className="italic font-normal text-slate-700">visa</span> experts
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { name: "Sarah Mitchell", role: "Immigration Specialist", img: IMAGES.expert1 },
              { name: "David Carter", role: "Visa Consultant", img: IMAGES.expert2 },
              { name: "Maria Gonzales", role: "Family Visa Specialist", img: IMAGES.expert3 },
              { name: "Ahmed Khan", role: "Work Visa Expert", img: IMAGES.expert4 },
              { name: "Emily Johnson", role: "Study Abroad Consultant", img: IMAGES.expert5 },
            ].map((member, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-lg mb-4 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] bg-blue-600 text-white p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 right-0 bottom-0 w-full lg:w-1/2 opacity-15 pointer-events-none flex items-center justify-center">
            <svg className="w-full h-full max-h-[400px]" viewBox="0 0 200 200" fill="none" stroke="currentColor">
              <circle cx="100" cy="100" r="80" strokeWidth="1" strokeDasharray="4 4" />
              <ellipse cx="100" cy="100" rx="80" ry="30" strokeWidth="1" />
              <ellipse cx="100" cy="100" rx="30" ry="80" strokeWidth="1" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl space-y-8">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to start your <span className="italic font-normal">immigration</span> journey?
            </h2>

            <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm sm:text-base font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Tailored solutions</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Expert team</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>High approval rates</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-sm transition-all shadow-lg hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
              >
                Schedule a free call
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SCHEDULE A CALL MODAL */}
     {/* SCHEDULE A CALL MODAL */}
{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm transition-opacity">
    <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      
      {/* Decorative Background Glows */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-100/60 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-100/60 rounded-full blur-2xl pointer-events-none" />

      {/* Close Button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-all hover:rotate-90 duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {isSubmitted ? (
        <div className="py-12 text-center space-y-4 relative z-10">
          {/* Animated Success Checkmark Graphic */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-75" />
            <div className="relative w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-10 h-10 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Call Scheduled!</h3>
          <p className="text-slate-600 text-sm max-w-xs mx-auto">
            Thank you! One of our visa experts will get in touch with you at the selected time.
          </p>
        </div>
      ) : (
        <div className="relative z-10">
          
          {/* Header Graphic & Avatar Stack */}
          <div className="flex items-start justify-between gap-4 mb-6 pr-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                Free Consultation
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">Schedule a Free Call</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">
                Select a convenient date and time to speak with our specialists.
              </p>
            </div>

            {/* Overlapping Team Avatars with Live Online Indicator */}
            <div className="hidden sm:flex -space-x-2 shrink-0 pt-1">
              <div className="relative">
                <img className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" src={IMAGES.expert1} alt="Expert 1" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <img className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" src={IMAGES.expert2} alt="Expert 2" />
              <img className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" src={IMAGES.expert3} alt="Expert 3" />
            </div>
          </div>

          <form onSubmit={handleModalSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time</label>
                <input
                  type="time"
                  required
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Visa Type / Consultation Topic</label>
              <select
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              >
                <option value="">Select Option</option>
                <option value="student">Student Visa</option>
                <option value="work">Work Visa</option>
                <option value="family">Family / Permanent Residency</option>
                <option value="general">General Guidance</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Confirm Booking</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

        </div>
      )}

    </div>
  </div>
)}
    </div>
  );
}
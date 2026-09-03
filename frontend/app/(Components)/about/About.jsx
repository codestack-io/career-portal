"use client";

import React, { useEffect, useState, useRef } from "react";

const IMAGES = {
  heroMain: "https://res.cloudinary.com/ciiop60x/video/upload/v1786637507/video-2_qfuuky.mp4",
  heroFounder:"https://res.cloudinary.com/ciiop60x/image/upload/v1786635680/im-1_txvfq8.jpg",
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
      
      // Smooth easeOutQuad function
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
  return (
    <div className="space-y-24 sm:space-y-32 pb-20 ">
      
      <section className="text-slate-900 overflow-hidden">
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

                <div className="absolute -top-6 -right-4 sm:right-2 bg-white rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-100 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
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
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  About Our Consultancy
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 leading-tight">
                  Accurate Guidance for Your Overseas Journey.
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

              {/* Dynamic Counters Row */}
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

              {/* Callout Row */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
                <a
                  href="#consultation"
                  className="inline-flex justify-center items-center px-8 py-4 rounded-full bg-[#111827] hover:bg-black text-white font-semibold text-sm transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
                >
                  Book Free Consultation
                </a>
                
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
      <section className="relative overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="relative rounded-[2.5rem] overflow-hidden p-8 sm:p-12 lg:p-16 ">
            <img
              src={IMAGES.bgImg}
              alt="Who We Are Background"
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-32 "
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/80 backdrop-blur-[2px] z-10" />

            <div className="relative z-20 max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
                  Who we are
                </h2>
                <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
              </div>

              <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed text-center sm:text-left">
                <p className="font-medium">
                  We are a dedicated visa and immigration agency committed to helping individuals and families achieve their dreams of living, working, and studying abroad. With years of experience and a team of experts, we simplify the complexities of immigration processes to ensure a smooth and successful journey for our clients.
                </p>
                <p className="text-sm sm:text-base text-slate-600">
                  Our team of experienced professionals offers personalized services to ensure your travel documentation is handled efficiently and accurately. From visa assistance to flight bookings, accommodation arrangements, and more, we make your international travel experience stress-free and enjoyable.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-white/60 shadow-lg transition-all hover:shadow-xl hover:border-blue-200">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-600 mb-3">Our mission</h3>
                  <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                    Providing tailored visa and immigration solutions to help people achieve their global aspirations.
                  </p>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-white/60 shadow-lg transition-all hover:shadow-xl hover:border-blue-200">
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-600 mb-3">Our vision</h3>
                  <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                    To be a trusted partner, guiding individuals and families toward a brighter future abroad.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
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

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-16">
            Our <span className="italic font-normal text-slate-700">visa</span> experts
          </h2>

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
              <a
                href="#consultation"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-sm transition-all shadow-lg hover:shadow-2xl hover:-translate-y-0.5"
              >
                Schedule a free call
              </a>
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}
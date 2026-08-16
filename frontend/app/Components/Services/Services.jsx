import Link from "next/link";

export default function Services({
  title,
  subtitle,
  videoSrc = "https://res.cloudinary.com/ciiop60x/video/upload/v1786901183/services_efrpqy.mp4",
  studentServices = [],
  universityServices = [],
}) {
  return (
    <div className="bg-white min-h-screen">
      <style>{`
        @keyframes rollercoaster {
          0% {
            opacity: 0;
            transform: translateY(-40px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-rollercoaster {
          animation: rollercoaster 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Main Container: pt-4 gives breathing room for fixed navbar */}
      <main className="pt-4 pb-12 px-4 sm:px-6 max-w-7xl mx-auto text-slate-900 overflow-hidden">
        {/* Rounded Hero Section positioned safely below navbar */}
<section className="relative w-full h-[36vh] min-h-[280px] max-h-[360px] rounded-3xl overflow-hidden shadow-xl flex items-center justify-center mt-24 mb-12 border border-slate-100">
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src={videoSrc} type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Multi-Stop Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/70 to-purple-900/80 mix-blend-multiply" />
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

  {/* Text Layer */}
  <div className="relative z-10 text-center max-w-2xl mx-auto px-4 space-y-3">
    <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold text-white border border-white/30 bg-white/10 backdrop-blur-md">
      <span className="w-1.5 h-1.5 rounded-full bg-white" />
      Services
    </span>

    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
      {title || "Services for students"}
    </h1>

    {subtitle && (
      <p className="text-sm sm:text-base text-white/90 font-medium max-w-md mx-auto line-clamp-2">
        {subtitle}
      </p>
    )}
  </div>
</section>

        {/* Student Services Group */}
        {studentServices.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  For Students
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Accelerate your admission process with top-tier counseling.
                </p>
              </div>
              <span className="text-xs font-semibold text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200">
                {studentServices.length} Available
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentServices.map((service, index) => (
                <ServiceCard
                  key={service.id || index}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          </section>
        )}

        {/* University Services Group */}
        {universityServices.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  For Partner Universities
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Scale global recruitment and streamline student placement.
                </p>
              </div>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Institutional
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universityServices.map((service, index) => (
                <ServiceCard
                  key={service.id || index}
                  service={service}
                  index={index + studentServices.length}
                />
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-violet-950 p-6 sm:p-10 text-center text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Book a 1-on-1 free consultation session with our certified education experts today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-all"
              >
                Book Free Consultation
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ServiceCard({ service, index }) {
  return (
    <div
      style={{ animationDelay: `${index * 80}ms` }}
      className="animate-rollercoaster opacity-0 group relative bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-violet-400 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center group-hover:bg-violet-600 group-hover:border-violet-600 transition-all">
            {service.icon ? (
              <img
                src={service.icon}
                alt={service.title}
                className="w-5 h-5 object-contain group-hover:brightness-0 group-hover:invert"
              />
            ) : (
              <div className="w-4 h-4 rounded-full bg-violet-400 group-hover:bg-white" />
            )}
          </div>
          <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            Premium
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-600 text-xs leading-relaxed mb-4">
          {service.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-violet-600">
        <span>Learn More</span>
        <svg
          className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Plane,
  GraduationCap,
  Home,
  FileText,
  Award,
  Languages,
  Building2,
  Loader2,
  AlertTriangle,
} from "lucide-react";

/**
 * Services.jsx
 * -------------------------------------------------------------------------
 * Modern sans-serif implementation styled with clean card containers,
 * slate canvas background, and unified brand violet/blue gradients.
 * ------------------------------------------------------------------------- */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const SERVICES_ENDPOINT = `${API_BASE}/api/services/`;

// Fallback icon per-category / keyword
function pickLineIcon(title = "") {
  const t = title.toLowerCase();
  if (t.includes("visa")) return FileText;
  if (t.includes("scholarship") || t.includes("financial")) return Award;
  if (t.includes("accommodation") || t.includes("housing")) return Home;
  if (t.includes("language") || t.includes("test")) return Languages;
  if (t.includes("career") || t.includes("counsel")) return GraduationCap;
  if (t.includes("university") || t.includes("admission")) return Building2;
  return Plane;
}

const TERMINALS = [
  { key: "student", label: "Student Services", code: "STU" },
  { key: "university", label: "University Services", code: "UNI" },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ok | error
  const [terminal, setTerminal] = useState("student");
  const [activeId, setActiveId] = useState(null);
  const [stampKey, setStampKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");
        const res = await fetch(SERVICES_ENDPOINT, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        const results = Array.isArray(data) ? data : data.results || [];
        if (cancelled) return;
        setServices(results);
        setStatus("ok");
      } catch (err) {
        if (cancelled) return;
        console.error("Failed to load services:", err);
        setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () =>
      services
        .filter((s) => s.category === terminal)
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)),
    [services, terminal]
  );

  useEffect(() => {
    if (filtered.length > 0) {
      setActiveId(filtered[0].id);
    } else {
      setActiveId(null);
    }
  }, [terminal, services]);

  const active = filtered.find((s) => s.id === activeId) || null;

  function selectService(id) {
    if (id === activeId) return;
    setActiveId(id);
    setStampKey((k) => k + 1);
  }

  return (
    <section className="relative w-full bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      {/* Flight-path grid texture */}
      <FlightGrid />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-28">
        {/* Eyebrow / header stats */}
        <div className="flex items-center justify-between gap-4 mb-10 md:mb-14 border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-semibold tracking-[0.28em] uppercase text-violet-600">
              Departures · Services
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-400">
            {new Date().toISOString().slice(0, 10).replaceAll("-", ".")}
          </span>
        </div>

        {/* Modern Sans-Serif Header */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Everything you need,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600">
            stamped &amp; cleared.
          </span>
        </h2>
        
        <p className="max-w-xl text-slate-600 text-base md:text-lg mb-12 md:mb-16 leading-relaxed">
          Pick a terminal below. Every service is a checkpoint on the same
          route — from your first application to the day you land.
        </p>

        {/* Terminal Switcher */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-200/60 border border-slate-300/50 mb-10 backdrop-blur-md">
          {TERMINALS.map((t) => {
            const isActive = t.key === terminal;
            return (
              <button
                key={t.key}
                onClick={() => setTerminal(t.key)}
                className={`relative px-5 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider uppercase transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="terminal-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 shadow-md shadow-violet-500/20"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {t.code} · {t.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Render States */}
        {status === "loading" && <LoadingRow />}
        {status === "error" && <ErrorRow endpoint={SERVICES_ENDPOINT} />}

        {status === "ok" && filtered.length === 0 && (
          <p className="text-slate-400 font-mono text-sm py-16">
            No services listed for this terminal yet.
          </p>
        )}

        {status === "ok" && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,320px)_1fr] gap-6 md:gap-10">
            {/* Left Column: Interactive Stub List */}
            <ol className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              {filtered.map((s, idx) => {
                const Icon = pickLineIcon(s.title);
                const isActive = s.id === activeId;
                return (
                  <li key={s.id} className="shrink-0 md:shrink">
                    <button
                      onClick={() => selectService(s.id)}
                      className="relative w-[240px] md:w-full text-left group"
                    >
                      <div
                        className={`relative flex items-center gap-4 rounded-2xl border px-4 py-4 transition-all duration-300 ${
                          isActive
                            ? "border-violet-600 bg-white shadow-md shadow-violet-500/10"
                            : "border-slate-200/80 hover:border-slate-300 bg-white/60 hover:bg-white"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="stub-active"
                            className="absolute inset-0 rounded-2xl ring-2 ring-violet-600/20"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}

                        <span
                          className={`relative z-10 font-mono text-[11px] tabular-nums px-2 py-1 rounded-md border font-medium ${
                            isActive
                              ? "border-violet-600/30 bg-violet-50 text-violet-700"
                              : "border-slate-200 bg-slate-50 text-slate-400"
                          }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>

                        <Icon
                          size={18}
                          className={`relative z-10 shrink-0 ${
                            isActive ? "text-violet-600" : "text-slate-400"
                          }`}
                        />

                        <span
                          className={`relative z-10 text-sm font-semibold leading-snug ${
                            isActive ? "text-slate-900" : "text-slate-600"
                          }`}
                        >
                          {s.title}
                        </span>
                      </div>

                      {/* Ticket punch hole effect (Desktop) */}
                      <div className="hidden md:block absolute -right-[21px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#F8FAFC] border border-slate-200" />
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Right Column: Ticket Document Details */}
            <div className="relative rounded-3xl border border-white/60 bg-white/80 p-8 md:p-12 min-h-[420px] overflow-hidden shadow-xl shadow-slate-200/50 backdrop-blur-xl">
              <TicketTexture />

              <AnimatePresence mode="wait">
                {active && (
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10"
                  >
                    <div className="flex items-start justify-between gap-6 mb-8">
                      <div>
                        <span className="block font-mono text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-600 mb-3">
                          Checkpoint {String(filtered.findIndex((f) => f.id === active.id) + 1).padStart(2, "0")}
                          {" / "}
                          {String(filtered.length).padStart(2, "0")}
                        </span>
                        
                        <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight max-w-lg">
                          {active.title}
                        </h3>
                      </div>

                      {active.icon ? (
                        <img
                          src={active.icon}
                          alt=""
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl border border-violet-100 bg-violet-50 flex items-center justify-center shrink-0 shadow-sm text-violet-600">
                          {(() => {
                            const Icon = pickLineIcon(active.title);
                            return <Icon size={26} />;
                          })()}
                        </div>
                      )}
                    </div>

                    <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl mb-10">
                      {active.description}
                    </p>

                    <div className="flex items-center gap-4 flex-wrap pt-6 border-t border-slate-100">
                      <BoardingCTA label="Book consultation" />
                      <span className="font-mono text-[11px] font-medium tracking-widest uppercase text-slate-400">
                        Gate opens on request
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Passport stamp burst animation */}
              <Stamp key={stampKey} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------------------- Helpers & Components --------------------------------- */

function BoardingCTA({ label }) {
  return (
    <motion.a
      href="#consultation"
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="relative inline-flex items-center gap-2 rounded-xl pl-6 pr-2 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-white bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all overflow-hidden"
    >
      <span className="relative z-10">{label}</span>
      <motion.span
        variants={{
          rest: { rotate: 0, x: 0 },
          hover: { rotate: 45, x: 2 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="relative z-10 w-7 h-7 rounded-lg bg-white/20 text-white flex items-center justify-center backdrop-blur-sm"
      >
        <ArrowUpRight size={14} />
      </motion.span>
      <motion.span
        variants={{
          rest: { scale: 0, opacity: 0 },
          hover: { scale: 3.2, opacity: 1 },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20"
        style={{ mixBlendMode: "overlay" }}
      />
    </motion.a>
  );
}

function Stamp() {
  return (
    <motion.div
      initial={{ opacity: 0.85, scale: 1.35, rotate: -18 }}
      animate={{ opacity: 0, scale: 1, rotate: -18 }}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className="pointer-events-none absolute bottom-8 right-8 select-none"
    >
      <div
        className="w-24 h-24 rounded-full border-[3px] border-violet-600/80 flex items-center justify-center bg-violet-600/[0.03]"
        style={{ transform: "rotate(-18deg)" }}
      >
        <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-violet-600 text-center leading-tight">
          Cleared
          <br />
          for transit
        </span>
      </div>
    </motion.div>
  );
}

function FlightGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.4]"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(15, 23, 42, 0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

function TicketTexture() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute top-6 left-6 right-6 h-px bg-slate-100" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(115deg,transparent_40%,#0F172A_50%,transparent_60%)]" />
    </div>
  );
}

function LoadingRow() {
  return (
    <div className="flex items-center gap-3 py-16 text-slate-500">
      <Loader2 className="animate-spin text-violet-600" size={18} />
      <span className="font-mono text-xs tracking-widest uppercase">
        Checking arrivals board…
      </span>
    </div>
  );
}

function ErrorRow({ endpoint }) {
  return (
    <div className="flex items-start gap-3 py-16 text-slate-600 max-w-md">
      <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
      <p className="text-sm leading-relaxed">
        Couldn&apos;t reach the services feed at{" "}
        <code className="font-mono text-violet-600 bg-slate-100 px-1 py-0.5 rounded">{endpoint}</code>. Confirm
        your Django server is running and{" "}
        <code className="font-mono text-violet-600 bg-slate-100 px-1 py-0.5 rounded">CORS</code> allows this
        origin, then refresh.
      </p>
    </div>
  );
}
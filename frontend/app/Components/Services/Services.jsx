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
 * Services.jsx (White Theme Edition)
 * -------------------------------------------------------------------------
 * Study-abroad "Services" section styled as a light boarding-pass / visa-stamp
 * interface — bright canvas background with clean contrast, sharp borders, 
 * and bronze branding accents.
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
    <section className="relative w-full bg-[#F8F9FA] text-[#0F172A] overflow-hidden">
      {/* Flight-path grid texture */}
      <FlightGrid />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-28">
        {/* Eyebrow / header stats */}
        <div className="flex items-center justify-between gap-4 mb-10 md:mb-14 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-semibold tracking-[0.28em] uppercase text-[#B45309]">
              Departures · Services
            </span>
          </div>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-400">
            {new Date().toISOString().slice(0, 10).replaceAll("-", ".")}
          </span>
        </div>

        <h2
          className="font-serif leading-[0.95] text-[clamp(2.4rem,6vw,4.2rem)] mb-4 text-slate-900 font-bold"
          style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
        >
          Everything you need,
          <br />
          <span className="italic text-[#B45309] font-normal">
            stamped &amp; cleared.
          </span>
        </h2>
        <p className="max-w-xl text-slate-600 text-base md:text-lg mb-12 md:mb-16">
          Pick a terminal below. Every service is a checkpoint on the same
          route — from your first application to the day you land.
        </p>

        {/* Terminal Switcher */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-slate-200/60 border border-slate-300/50 mb-10">
          {TERMINALS.map((t) => {
            const isActive = t.key === terminal;
            return (
              <button
                key={t.key}
                onClick={() => setTerminal(t.key)}
                className={`relative px-5 py-2.5 rounded-full font-mono text-xs font-semibold tracking-wider uppercase transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="terminal-pill"
                    className="absolute inset-0 rounded-full bg-[#B45309] shadow-sm"
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
                            ? "border-[#B45309] bg-white shadow-md shadow-slate-200"
                            : "border-slate-200/80 hover:border-slate-300 bg-white/60 hover:bg-white"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="stub-active"
                            className="absolute inset-0 rounded-2xl ring-2 ring-[#B45309]/20"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}

                        <span
                          className={`relative z-10 font-mono text-[11px] tabular-nums px-2 py-1 rounded-md border font-medium ${
                            isActive
                              ? "border-[#B45309]/30 bg-[#B45309]/10 text-[#B45309]"
                              : "border-slate-200 bg-slate-50 text-slate-400"
                          }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>

                        <Icon
                          size={18}
                          className={`relative z-10 shrink-0 ${
                            isActive ? "text-[#B45309]" : "text-slate-400"
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
                      <div className="hidden md:block absolute -right-[21px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#F8F9FA] border border-slate-200" />
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Right Column: Ticket Document Details */}
            <div className="relative rounded-[28px] border border-slate-200/80 bg-white p-8 md:p-12 min-h-[420px] overflow-hidden shadow-[0_10px_30px_-15px_rgba(15,23,42,0.08)]">
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
                        <span className="block font-mono text-[11px] font-semibold tracking-[0.25em] uppercase text-[#B45309] mb-3">
                          Checkpoint {String(filtered.findIndex((f) => f.id === active.id) + 1).padStart(2, "0")}
                          {" / "}
                          {String(filtered.length).padStart(2, "0")}
                        </span>
                        <h3
                          className="font-serif text-3xl md:text-[2.6rem] leading-[1.05] max-w-lg text-slate-900 font-bold"
                          style={{ fontFamily: "'Fraunces', ui-serif, Georgia, serif" }}
                        >
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
                        <div className="w-16 h-16 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 shadow-sm">
                          {(() => {
                            const Icon = pickLineIcon(active.title);
                            return <Icon size={24} className="text-[#B45309]" />;
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
      className="relative inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-white bg-[#B45309] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <span className="relative z-10">{label}</span>
      <motion.span
        variants={{
          rest: { rotate: 0, x: 0 },
          hover: { rotate: 45, x: 2 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="relative z-10 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center"
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
        className="w-24 h-24 rounded-full border-[3px] border-[#B45309]/80 flex items-center justify-center bg-[#B45309]/[0.02]"
        style={{ transform: "rotate(-18deg)" }}
      >
        <span className="font-mono text-[9px] font-bold tracking-[0.2em] uppercase text-[#B45309] text-center leading-tight">
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
      className="pointer-events-none absolute inset-0 opacity-[0.5]"
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
      <Loader2 className="animate-spin text-[#B45309]" size={18} />
      <span className="font-mono text-xs tracking-widest uppercase">
        Checking arrivals board…
      </span>
    </div>
  );
}

function ErrorRow({ endpoint }) {
  return (
    <div className="flex items-start gap-3 py-16 text-slate-600 max-w-md">
      <AlertTriangle size={18} className="text-[#B45309] shrink-0 mt-0.5" />
      <p className="text-sm leading-relaxed">
        Couldn&apos;t reach the services feed at{" "}
        <code className="font-mono text-[#B45309] bg-slate-100 px-1 py-0.5 rounded">{endpoint}</code>. Confirm
        your Django server is running and{" "}
        <code className="font-mono text-[#B45309] bg-slate-100 px-1 py-0.5 rounded">CORS</code> allows this
        origin, then refresh.
      </p>
    </div>
  );
}
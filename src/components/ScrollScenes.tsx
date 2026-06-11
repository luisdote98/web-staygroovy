"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════
// HERO — video fullscreen
// ═══════════════════════════════════════════════════════════
function SceneHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);
  const e = "transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]";
  return (
    <div className="relative w-full bg-black overflow-hidden" style={{ height: "100svh" }}>
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "center" }}>
        <source src="/videos/model-walk.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.65))" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center text-center gap-5 max-w-[700px] w-full">
          <div className={e} style={{ opacity: loaded ? 1 : 0, transform: loaded ? "scale(1) translateY(0)" : "scale(0.97) translateY(8px)", filter: loaded ? "blur(0)" : "blur(10px)", transitionDelay: "0ms" }}>
            <Image src="/logos/logo-letras.png" alt="Stay Groovy" width={700} height={290}
              className="w-[220px] sm:w-[340px] md:w-[460px] lg:w-[540px] h-auto object-contain" priority />
          </div>
          <p className={`font-display text-[#c9a84c] tracking-[0.35em] leading-none ${e}`}
            style={{ fontSize: "clamp(0.7rem, 1.8vw, 1rem)", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(6px)", filter: loaded ? "blur(0)" : "blur(8px)", transitionDelay: "200ms" }}>
            FIRST DROP 001
          </p>
          <div className={`w-10 h-px bg-white/20 ${e}`}
            style={{ opacity: loaded ? 1 : 0, transitionDelay: "300ms" }} />
          <a href="#shop" className={`group ${e}`}
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(6px)", filter: loaded ? "blur(0)" : "blur(6px)", transitionDelay: "400ms" }}>
            <span className="block font-display tracking-[0.25em] text-[0.75rem] px-10 py-4 bg-[#c9a84c] text-[#0a0a0a] hover:bg-[#e2c97e] transition-colors duration-300">
              SHOP COLLECTION
            </span>
          </a>
        </div>
      </div>
      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-display text-white/30 tracking-[0.35em]" style={{ fontSize: "0.55rem" }}>SCROLL</span>
        <div className="w-px h-9 bg-white/15 overflow-hidden">
          <div className="w-full h-full bg-[#c9a84c]/60" style={{ animation: "scrollLine 1.8s ease-in-out infinite" }} />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// COUNTDOWN — First Drop
// ═══════════════════════════════════════════════════════════
const LAUNCH_END = new Date("2026-07-04T23:59:59");
function pad(n: number) { return String(Math.max(0, n)).padStart(2, "0"); }
function getTimeLeft() {
  const d = LAUNCH_END.getTime() - Date.now();
  if (d <= 0) return { days: 0, hours: 0, minutes: 0 };
  return { days: Math.floor(d / 86400000), hours: Math.floor((d / 3600000) % 24), minutes: Math.floor((d / 60000) % 60) };
}

function SceneCountdown() {
  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => { const id = setInterval(() => setTime(getTimeLeft()), 1000); return () => clearInterval(id); }, []);

  return (
    <div className="relative w-full bg-white overflow-hidden py-20 lg:py-28">
      {/* video de fondo de camiseta */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full opacity-10"
        style={{ objectFit: "contain", objectPosition: "center" }}>
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="relative flex flex-col items-center text-center gap-6 max-w-lg mx-auto px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-[#c9a84c]" />
          <p className="text-[#c9a84c] text-[10px] tracking-[0.35em] uppercase font-medium">First Drop · Primer mes</p>
          <div className="w-8 h-px bg-[#c9a84c]" />
        </div>
        <div className="flex items-end gap-4">
          <span className="font-display text-[#0a0a0a] leading-none" style={{ fontSize: "clamp(5rem, 14vw, 9rem)" }}>18€</span>
          <div className="pb-3">
            <span className="block text-[#0a0a0a]/20 text-2xl line-through leading-none">22€</span>
            <span className="text-[#c9a84c] text-[9px] tracking-[0.3em] uppercase">después</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#0a0a0a]/30 text-[9px] tracking-[0.3em] uppercase">Finaliza en</p>
          <div className="flex items-center gap-2">
            {[
              { v: pad(time.days),    l: "Días" },
              { v: pad(time.hours),   l: "Horas" },
              { v: pad(time.minutes), l: "Min" },
            ].map(({ v, l }, i) => (
              <div key={l} className="flex items-center gap-2">
                {i > 0 && <span className="text-[#c9a84c]/40 font-display text-2xl pb-2">:</span>}
                <div className="flex flex-col items-center border border-[#0a0a0a]/10 bg-white/80 px-4 py-3 min-w-[60px]">
                  <span className="font-display text-[#0a0a0a] text-2xl leading-none tabular-nums">{v}</span>
                  <span className="text-[#0a0a0a]/30 text-[8px] tracking-[0.2em] uppercase mt-1">{l}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <a href="#shop" className="btn-gold px-10 py-4 text-[10px] tracking-[0.25em] mt-2">
          Comprar ahora — 18€
        </a>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════
export default function ScrollScenes() {
  return (
    <>
      <SceneHero />
      <SceneCountdown />

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(100%);  opacity: 1; }
          100% { transform: translateY(100%);  opacity: 0; }
        }
      `}</style>
    </>
  );
}

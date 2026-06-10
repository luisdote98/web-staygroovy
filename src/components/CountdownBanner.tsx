"use client";

import { useState, useEffect } from "react";
import Reveal from "./Reveal";

const LAUNCH_END = new Date("2026-07-04T23:59:59");

function pad(n: number) { return String(Math.max(0, n)).padStart(2, "0"); }
function getTimeLeft() {
  const diff = LAUNCH_END.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, expired: true };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    expired: false,
  };
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center border border-[#0a0a0a]/12 bg-white w-16 sm:w-20 py-3 rounded-sm">
      <span className="font-display text-[#0a0a0a] text-2xl sm:text-3xl leading-none tracking-wider tabular-nums">{value}</span>
      <span className="text-[#0a0a0a]/30 text-[9px] tracking-[0.2em] uppercase mt-1.5">{label}</span>
    </div>
  );
}

export default function CountdownBanner() {
  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-white border-b border-[#e5e5e5] overflow-hidden" style={{ minHeight: "100vh" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full" style={{ minHeight: "100vh" }}>

        {/* LEFT: texto centrado */}
        <div className="scene-center px-8 sm:px-12 lg:px-16 py-16 order-2 lg:order-1">
          <Reveal variant="title" delay={0}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-[#c9a84c]" />
              <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase font-medium">First Drop · Primer mes</p>
            </div>
          </Reveal>
          <Reveal variant="title" delay={120}>
            <div className="flex items-end gap-4 mb-3">
              <span className="font-display text-[#0a0a0a] leading-none" style={{ fontSize: "clamp(4.5rem, 9vw, 7rem)" }}>18€</span>
              <div className="pb-2">
                <span className="block text-[#0a0a0a]/25 text-xl line-through leading-none">22€</span>
                <span className="text-[#c9a84c] text-[9px] tracking-[0.3em] uppercase">después</span>
              </div>
            </div>
          </Reveal>
          <Reveal variant="text" delay={240}>
            <p className="text-[#0a0a0a]/40 text-sm mb-8">Precio de lanzamiento durante el primer mes.</p>
          </Reveal>
          <Reveal variant="image" delay={320}>
            {!time.expired ? (
              <div className="flex flex-col gap-3 mb-10">
                <p className="text-[#0a0a0a]/30 text-[10px] tracking-[0.25em] uppercase">Finaliza en</p>
                <div className="flex items-center gap-2">
                  <TimeBlock value={pad(time.days)}    label="Días"  />
                  <span className="text-[#c9a84c]/60 font-display text-2xl pb-2 leading-none">:</span>
                  <TimeBlock value={pad(time.hours)}   label="Horas" />
                  <span className="text-[#c9a84c]/60 font-display text-2xl pb-2 leading-none">:</span>
                  <TimeBlock value={pad(time.minutes)} label="Min"   />
                </div>
              </div>
            ) : (
              <p className="text-[#0a0a0a]/30 text-xs tracking-[0.2em] uppercase mb-10">Precio de lanzamiento finalizado</p>
            )}
          </Reveal>
          <Reveal variant="action" delay={440}>
            <a href="#shop" className="btn-gold self-start px-10 py-4 text-[11px] tracking-[0.25em]">
              Comprar ahora — 18€
            </a>
          </Reveal>
        </div>

        {/* RIGHT: vídeo */}
        <Reveal variant="image" delay={120} className="relative bg-[#f5f5f5] flex items-center justify-center order-1 lg:order-2 min-h-[40vh] lg:min-h-0">
          <video autoPlay muted loop playsInline className="w-full h-full"
            style={{ objectFit: "contain", objectPosition: "center", maxHeight: "100vh" }}>
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </Reveal>
      </div>
    </div>
  );
}

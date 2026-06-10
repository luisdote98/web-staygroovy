"use client";

import { useState, useEffect } from "react";
import Reveal from "./Reveal";

const LAUNCH_END = new Date("2026-07-04T23:59:59");

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function getTimeLeft() {
  const diff = LAUNCH_END.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, expired: true };
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    expired: false,
  };
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center border border-white/[0.12] rounded-sm w-16 sm:w-20 py-3">
      <span className="font-display text-white text-2xl sm:text-3xl leading-none tracking-wider tabular-nums">
        {value}
      </span>
      <span className="text-white/30 text-[9px] tracking-[0.2em] uppercase mt-1.5">{label}</span>
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
    <section className="relative bg-[#0a0a0a] border-b border-white/[0.06] overflow-hidden">

      {/* ── Vídeo de fondo completo, sin recorte ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "contain", objectPosition: "center" }}
        aria-hidden
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay oscuro para legibilidad */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.72)", zIndex: 1 }}
      />

      <div className="container-base py-14 md:py-16" style={{ position: "relative", zIndex: 2 }}>
        <div className="flex flex-col items-center text-center gap-6">

          <Reveal variant="fade-up-blur" delay={0}>
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#c9a84c]/50" />
              <p className="text-[#c9a84c] text-[11px] tracking-[0.35em] uppercase font-medium">
                First Drop · Primer mes
              </p>
              <div className="w-6 h-px bg-[#c9a84c]/50" />
            </div>
          </Reveal>

          <Reveal variant="fade-up-blur" delay={80}>
            <div className="flex items-end gap-4">
              <span className="font-display text-white leading-none"
                    style={{ fontSize: "clamp(4rem, 9vw, 6rem)" }}>
                18€
              </span>
              <div className="pb-2 text-left">
                <span className="block text-white/25 text-xl line-through leading-none">22€</span>
                <span className="text-[#c9a84c] text-[9px] tracking-[0.3em] uppercase">después</span>
              </div>
            </div>
          </Reveal>

          <Reveal variant="fade-up-blur" delay={160}>
            {!time.expired ? (
              <div className="flex flex-col items-center gap-3">
                <p className="text-white/25 text-[10px] tracking-[0.25em] uppercase">Finaliza en</p>
                <div className="flex items-center gap-2">
                  <TimeBlock value={pad(time.days)}    label="Días"  />
                  <span className="text-[#c9a84c]/40 font-display text-2xl pb-2 leading-none">:</span>
                  <TimeBlock value={pad(time.hours)}   label="Horas" />
                  <span className="text-[#c9a84c]/40 font-display text-2xl pb-2 leading-none">:</span>
                  <TimeBlock value={pad(time.minutes)} label="Min"   />
                </div>
              </div>
            ) : (
              <p className="text-white/30 text-xs tracking-[0.2em] uppercase">
                Precio de lanzamiento finalizado
              </p>
            )}
          </Reveal>

          <div className="w-10 h-px bg-white/10" />

          <Reveal variant="fade-up-blur" delay={240}>
            <a href="#shop" className="btn-gold px-10 py-4 text-[11px] tracking-[0.25em]">
              Comprar ahora — 18€
            </a>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

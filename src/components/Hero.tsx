"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ── Vídeos que se reproducen en secuencia ──────────────────
const VIDEOS = [
  "/videos/model-walk.mp4",
  "/videos/hero.mp4",
];
// ──────────────────────────────────────────────────────────

export default function Hero() {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Rotar vídeos al terminar cada uno
  function handleVideoEnd() {
    setVideoIndex((i) => (i + 1) % VIDEOS.length);
  }

  // Cambiar src al cambiar índice
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.src = VIDEOS[videoIndex];
    v.load();
    v.play().catch(() => {});
  }, [videoIndex]);

  // Scroll cinematic: escala + fade del contenido
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Valores derivados del scroll
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const scrollProgress = Math.min(scrollY / (vh * 0.6), 1);
  const videoScale     = 1 - scrollProgress * 0.06;          // 1 → 0.94
  const contentOpacity = 1 - scrollProgress * 1.6;           // fade rápido
  const contentBlur    = scrollProgress * 12;                 // 0 → 12px

  // Animación de entrada (carga)
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const entryBase = "transition-all duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]";

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100svh" }}
    >
      {/* ── Vídeo fullscreen ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          transform: `scale(${videoScale})`,
          transformOrigin: "center center",
          transition: "transform 0.1s linear",
          willChange: "transform",
        }}
      >
        <source src={VIDEOS[0]} type="video/mp4" />
      </video>

      {/* ── Gradient overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Content ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{
          zIndex: 2,
          opacity: Math.max(0, contentOpacity),
          filter: `blur(${contentBlur}px)`,
          willChange: "opacity, filter",
          transition: "opacity 0.08s linear, filter 0.08s linear",
        }}
      >
        <div className="flex flex-col items-center text-center gap-6 w-full max-w-[700px]">

          {/* Logo Stay Groovy */}
          <div
            className={entryBase}
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(32px)",
              filter: loaded ? "blur(0px)" : "blur(10px)",
              transitionDelay: "0ms",
            }}
          >
            <Image
              src="/logos/logo-letras.png"
              alt="Stay Groovy"
              width={700}
              height={290}
              className="w-[260px] sm:w-[380px] md:w-[480px] lg:w-[580px] h-auto object-contain"
              priority
            />
          </div>

          {/* FIRST DROP 001 */}
          <p
            className={`font-display text-[#c9a84c] tracking-[0.35em] leading-none ${entryBase}`}
            style={{
              fontSize: "clamp(0.75rem, 2vw, 1.1rem)",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(28px)",
              filter: loaded ? "blur(0px)" : "blur(10px)",
              transitionDelay: "180ms",
            }}
          >
            FIRST DROP 001
          </p>

          {/* Línea decorativa */}
          <div
            className={`w-12 h-px bg-white/25 ${entryBase}`}
            style={{
              opacity: loaded ? 1 : 0,
              transitionDelay: "280ms",
            }}
          />

          {/* SHOP COLLECTION button */}
          <a
            href="#shop"
            className={`group ${entryBase}`}
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              filter: loaded ? "blur(0px)" : "blur(8px)",
              transitionDelay: "360ms",
            }}
          >
            <span
              className="block font-display tracking-[0.25em] text-[0.8rem] px-10 py-4 transition-all duration-300"
              style={{
                background: "#c9a84c",
                color: "#0a0a0a",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#e2c97e";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(201,168,76,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#c9a84c";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              SHOP COLLECTION
            </span>
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          zIndex: 3,
          opacity: Math.max(0, 1 - scrollProgress * 3),
          transition: "opacity 0.1s linear",
        }}
      >
        <span
          className="font-display text-white/40 tracking-[0.35em] leading-none"
          style={{ fontSize: "0.6rem" }}
        >
          SCROLL
        </span>
        <div
          className="w-px bg-white/20 overflow-hidden"
          style={{ height: "40px" }}
        >
          <div
            className="w-full bg-[#c9a84c]/70"
            style={{
              height: "40px",
              animation: "scrollLine 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* ── Scroll line keyframe ── */}
      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(100%);  opacity: 1; }
          100% { transform: translateY(100%);  opacity: 0; }
        }
      `}</style>
    </section>
  );
}

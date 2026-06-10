"use client";

import {
  useEffect,
  useRef,
  useState,
  CSSProperties,
  ReactNode,
} from "react";
import Image from "next/image";

// ─── Configuración ─────────────────────────────────────────
const SCENE_COUNT = 4;

// Las escenas se SOLAPAN: cada una empieza a aparecer 0.25*vh
// ANTES de su turno nominal, creando crossfade real.
const OVERLAP   = 0.25;  // fracción de solapamiento con escena anterior
const FADE_IN   = 0.20;  // duración del fade-in dentro del solapamiento
const FADE_OUT  = 0.80;  // punto desde el que empieza el fade-out
// ───────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// p va de −OVERLAP (empieza el crossfade) hasta 1+OVERLAP (termina)
// Zona activa: 0 → 1 (1 rango de vh)
// Zona de entrada (crossfade solapado): −OVERLAP → 0
function computeSceneStyle(
  scrollY: number,
  index: number,
  vh: number
): CSSProperties {
  const p = (scrollY - index * vh) / vh;

  // Fuera de rango: completamente invisible
  if (p < -OVERLAP || p >= 1) {
    return {
      opacity: 0,
      transform: "scale(0.94)",
      filter: "blur(24px)",
      pointerEvents: "none",
      zIndex: 10 - index,
    };
  }

  let opacity: number, blur: number, scale: number;

  if (p < 0) {
    // Zona de solapamiento: aparece mientras la escena anterior sale
    const t = easeInOut((p + OVERLAP) / OVERLAP);
    opacity = lerp(0,    1,    t);
    blur    = lerp(24,   0,    t);
    scale   = lerp(0.94, 1,    t);
  } else if (p < FADE_IN) {
    // Fade-in complementario dentro del rango activo
    const t = easeInOut(p / FADE_IN);
    opacity = lerp(0,    1,    t);
    blur    = lerp(12,   0,    t);
    scale   = lerp(0.97, 1,    t);
  } else if (p <= FADE_OUT) {
    opacity = 1;
    blur    = 0;
    scale   = 1;
  } else {
    const t = easeInOut((p - FADE_OUT) / (1 - FADE_OUT));
    opacity = lerp(1,   0,    t);
    blur    = lerp(0,   24,   t);
    scale   = lerp(1,   0.94, t);
  }

  return {
    opacity,
    transform: `scale(${scale.toFixed(4)})`,
    filter: blur > 0.2 ? `blur(${blur.toFixed(2)}px)` : "none",
    pointerEvents: opacity > 0.05 ? "auto" : "none",
    zIndex: 10 - index,
    willChange: "opacity, transform, filter",
  };
}

// ─── Wrapper de escena ──────────────────────────────────────
function SceneSlot({
  style,
  children,
}: {
  style: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{
        transition: "opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 0 — Hero (video fullscreen)
// ═══════════════════════════════════════════════════════════
function SceneHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);
  const e = "transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]";
  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
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
// SCENE 1 — Countdown / First Drop
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
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* video de fondo de camiseta */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full opacity-15"
        style={{ objectFit: "contain", objectPosition: "center" }}>
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center text-center gap-6 max-w-lg">
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
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 2 — Launch / First Drop editorial
// ═══════════════════════════════════════════════════════════
function SceneLaunch() {
  return (
    <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl w-full items-center">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <p className="text-[#c9a84c] text-[10px] tracking-[0.35em] uppercase">Drop · Primer mes</p>
            <h2 className="font-display text-white leading-none" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
              DEL BOOTH<br />A TU ARMARIO.
            </h2>
            <div className="w-10 h-0.5 bg-[#c9a84c]" />
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              Una camiseta pensada para el club. Válida para la calle. Stay Groovy First Drop.
            </p>
            <div className="flex items-end gap-3 mt-2">
              <span className="font-display text-white text-5xl leading-none">18€</span>
              <div className="pb-1">
                <span className="text-white/25 text-lg line-through block leading-none">22€</span>
                <span className="text-[#c9a84c] text-[9px] tracking-widest uppercase">lanzamiento</span>
              </div>
            </div>
            <a href="#shop" className="btn-gold self-start px-8 py-4 text-[10px] tracking-[0.25em]">
              Ver colección →
            </a>
          </div>
          {/* Right: producto */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-72 h-80 border border-[#c9a84c]/20">
              <Image src="/products/tee-black-product.png" alt="Stay Groovy Tee" fill
                className="object-contain p-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 3 — Shop Intro
// ═══════════════════════════════════════════════════════════
function SceneShopIntro() {
  return (
    <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(201,168,76,0.05) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center text-center gap-8 max-w-2xl">
          <p className="text-[#c9a84c] text-[10px] tracking-[0.4em] uppercase">Colección SS26</p>
          <h2 className="font-display text-white leading-none" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}>
            SHOP
          </h2>
          <div className="flex gap-4 justify-center">
            {[
              "/products/tee-black-product.png",
              "/products/tee-white-product.png",
              "/products/top-black-product.png",
            ].map((src, i) => (
              <div key={i}
                className="relative border border-[#c9a84c]/20 bg-[#111]"
                style={{ width: i === 1 ? "120px" : "90px", height: i === 1 ? "150px" : "112px", marginTop: i === 1 ? "-20px" : "0" }}>
                <Image src={src} alt="producto" fill className="object-contain p-3" />
              </div>
            ))}
          </div>
          <p className="text-white/35 text-xs tracking-[0.2em] uppercase">
            Camisetas oversize · Tops mujer · Edición limitada
          </p>
          <a href="#shop" className="btn-gold px-12 py-4 text-[10px] tracking-[0.3em]">
            Explorar colección
          </a>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════
export default function ScrollScenes() {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh]           = useState(800);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const measure = () => {
      setVh(window.innerHeight);
      setIsMobile(window.innerWidth < 1024);
    };
    measure();
    window.addEventListener("resize", measure);

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── En móvil: escenas apiladas normales ──────────────────
  if (isMobile) {
    return (
      <>
        <div className="relative w-full" style={{ height: "100svh" }}><SceneHero /></div>
        <div className="relative w-full" style={{ minHeight: "100svh" }}><SceneCountdown /></div>
        <div className="relative w-full" style={{ minHeight: "100svh" }}><SceneLaunch /></div>
        <div className="relative w-full" style={{ minHeight: "100svh" }}><SceneShopIntro /></div>
      </>
    );
  }

  // ── Desktop: sticky crossfade ─────────────────────────────
  const scenes = [
    <SceneHero        key="hero" />,
    <SceneCountdown   key="countdown" />,
    <SceneLaunch      key="launch" />,
    <SceneShopIntro   key="shopintro" />,
  ];

  // Escena 0: activa desde el inicio (p=0), se desvanece según FADE_OUT
  // El resto usan computeSceneStyle con solapamiento
  function styleFor(index: number): CSSProperties {
    if (index === 0) {
      const p = scrollY / vh;
      let opacity = 1, blur = 0, scale = 1;
      if (p > FADE_OUT) {
        const t = easeInOut((p - FADE_OUT) / (1 - FADE_OUT));
        opacity = lerp(1, 0, t);
        blur    = lerp(0, 24, t);
        scale   = lerp(1, 0.94, t);
      }
      return {
        opacity,
        transform: `scale(${scale.toFixed(4)})`,
        filter: blur > 0.2 ? `blur(${blur.toFixed(2)}px)` : "none",
        pointerEvents: opacity > 0.05 ? "auto" : "none",
        zIndex: 10,
      };
    }
    return computeSceneStyle(scrollY, index, vh);
  }

  return (
    <>
      {/* Spacer: SCENE_COUNT * vh da scroll total suficiente */}
      <div style={{ height: `${SCENE_COUNT * vh}px` }}>
        <div className="sticky top-0 overflow-hidden bg-black" style={{ height: `${vh}px` }}>
          {scenes.map((scene, i) => (
            <SceneSlot key={i} style={styleFor(i)}>
              {scene}
            </SceneSlot>
          ))}
        </div>
      </div>

      {/* Keyframe para scroll indicator */}
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

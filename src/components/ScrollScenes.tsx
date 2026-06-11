"use client";

import {
  useEffect,
  useRef,
  useState,
  CSSProperties,
  ReactNode,
} from "react";
import Image from "next/image";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import { Mail } from "lucide-react";
import Link from "next/link";

// ─── Configuración ─────────────────────────────────────────
const SCENE_COUNT = 8;

const OVERLAP  = 0.20;  // fracción de solapamiento con escena anterior
const FADE_OUT = 0.80;  // punto desde el que empieza el fade de salida
// ───────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// La sección sale perdiendo luz (brightness), no moviéndose.
// La siguiente aparece desde negro, sin desplazamiento.
function computeSceneStyle(
  scrollY: number,
  index: number,
  vh: number
): CSSProperties {
  const p = (scrollY - index * vh) / vh;

  if (p < -OVERLAP || p >= 1) {
    return {
      opacity: 0,
      filter: "brightness(0)",
      pointerEvents: "none",
      zIndex: 10 - index,
    };
  }

  let opacity: number, brightness: number;

  if (p < 0) {
    // Zona de solapamiento: aparece desde negro
    const t = easeInOut((p + OVERLAP) / OVERLAP);
    opacity    = lerp(0, 1, t);
    brightness = lerp(0, 1, t);
  } else if (p <= FADE_OUT) {
    // Zona activa: plena luz
    opacity    = 1;
    brightness = 1;
  } else {
    // Zona de salida: pierde luz
    const t    = easeInOut((p - FADE_OUT) / (1 - FADE_OUT));
    opacity    = lerp(1, 0, t);
    brightness = lerp(1, 0, t);
  }

  return {
    opacity,
    filter: brightness < 0.995 ? `brightness(${brightness.toFixed(3)})` : "none",
    pointerEvents: opacity > 0.05 ? "auto" : "none",
    zIndex: 10 - index,
    willChange: "opacity, filter",
  };
}

// ─── Wrapper de escena ──────────────────────────────────────
function SceneSlot({ style, children }: { style: CSSProperties; children: ReactNode }) {
  return (
    <div className="absolute inset-0" style={style}>
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
          <button onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })} className={`group ${e}`}
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(6px)", filter: loaded ? "blur(0)" : "blur(6px)", transitionDelay: "400ms" }}>
            <span className="block font-display tracking-[0.25em] text-[0.75rem] px-10 py-4 bg-[#c9a84c] text-[#0a0a0a] hover:bg-[#e2c97e] transition-colors duration-300">
              SHOP COLLECTION
            </span>
          </button>
        </div>
      </div>
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
          <button onClick={() => window.scrollTo({ top: 4 * window.innerHeight, behavior: "smooth" })}
            className="btn-gold px-10 py-4 text-[10px] tracking-[0.25em] mt-2">
            Comprar ahora — 18€
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 2 — Product Grid
// ═══════════════════════════════════════════════════════════
type Filter = "all" | "tee" | "top";
const FILTERS: { id: Filter; label: string }[] = [
  { id: "all",  label: "Todo" },
  { id: "tee",  label: "Camisetas" },
  { id: "top",  label: "Tops Mujer" },
];

function SceneProductGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? products : products.filter((p) => p.category === filter);
  return (
    <div id="shop" className="relative w-full h-full bg-white overflow-hidden">
      <div className="absolute inset-0 overflow-y-auto">
        <div className="container-base section-pad">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow mb-2">Colección SS26</p>
              <h2 className="font-display title-lg text-[#0a0a0a]">TIENDA</h2>
            </div>
            <div className="flex gap-1">
              {FILTERS.map(({ id, label }) => (
                <button key={id} onClick={() => setFilter(id)}
                  className={`px-4 py-2 text-[11px] tracking-[0.15em] uppercase font-medium transition-all duration-200 ${
                    filter === id
                      ? "bg-[#0a0a0a] text-white"
                      : "border border-[#e5e5e5] text-[#0a0a0a]/45 hover:text-[#0a0a0a] hover:border-[#0a0a0a]/30"
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 5 — Women Section
// ═══════════════════════════════════════════════════════════
function SceneWomen() {
  return (
    <div id="tops-mujer" className="relative w-full h-full bg-[#f5f5f5] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 flex items-center">
        <div className="container-base section-pad w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 flex flex-col gap-5">
              <Reveal variant="title" delay={0}>
                <p className="eyebrow">Para ella</p>
              </Reveal>
              <Reveal variant="title" delay={120}>
                <h2 className="font-display title-lg text-[#0a0a0a]">TOPS<br />MUJER</h2>
              </Reveal>
              <Reveal variant="text" delay={240}>
                <p className="text-[#0a0a0a]/65 text-base leading-relaxed max-w-md">
                  Diseñados para bailar, moverse y formar parte de la noche.
                </p>
                <p className="text-[#0a0a0a]/40 text-sm leading-relaxed mt-2 max-w-md">
                  Crop tops de tela elástica con gráfica Stay Groovy. Ajuste ceñido, tela flexible y cómoda.
                </p>
              </Reveal>
              <Reveal variant="text" delay={320}>
                <div className="flex items-center gap-3">
                  <span className="text-[#0a0a0a]/30 text-[10px] tracking-[0.2em] uppercase">Tallas</span>
                  {["S", "M", "L"].map((s) => (
                    <span key={s} className="w-8 h-8 border border-[#0a0a0a]/15 text-[#0a0a0a]/50 text-[11px] font-medium flex items-center justify-center">{s}</span>
                  ))}
                </div>
              </Reveal>
              <Reveal variant="action" delay={420}>
                <button onClick={() => window.scrollTo({ top: 4 * window.innerHeight, behavior: "smooth" })}
                  className="btn-gold self-start">Ver tops</button>
              </Reveal>
            </div>
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                  <Image src="/models/model-women-1.png" alt="Stay Groovy Top Mujer" fill
                    className="object-cover object-top" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mt-8">
                  <Image src="/models/model-women-2.png" alt="Stay Groovy Top Mujer" fill
                    className="object-cover object-top" sizes="(max-width: 1024px) 50vw, 25vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 6 — About
// ═══════════════════════════════════════════════════════════
function SceneAbout() {
  return (
    <div id="sobre-nosotros" className="relative w-full h-full bg-white overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="container-base section-pad w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#f5f5f5]">
              <Image src="/models/model-tee-side.jpg" alt="Stay Groovy" fill className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-16 pb-6 flex justify-center">
                <div className="text-center">
                  <p className="font-display text-sm text-[#c9a84c] tracking-widest">GRX</p>
                  <p className="text-white/50 text-[10px] tracking-[0.15em] uppercase mt-0.5">Base</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <p className="eyebrow mb-1">Sobre nosotros</p>
              <h2 className="font-display title-lg text-[#0a0a0a]">STAY GROOVY</h2>
              <div className="h-px bg-[#e5e5e5]" />
              <div className="flex flex-col gap-4 text-[#0a0a0a]/55 text-sm leading-relaxed max-w-lg">
                <p>Stay Groovy nace en Granada con una visión clara: crear una marca de ropa que refleje nuestra identidad dentro de la cultura de club. Cada pieza está pensada para quien vive la música desde dentro.</p>
                <p>Nuestro logo es el núcleo de todo. Lo entendemos como algo vivo, en constante evolución — nuevos colores, formas 3D, colaboraciones y detalles que irán apareciendo con cada drop.</p>
              </div>
              <div className="h-px bg-[#e5e5e5]" />
              <blockquote className="border-l-2 border-[#c9a84c] pl-4">
                <p className="text-[#0a0a0a] text-base font-medium leading-snug">"Cada colección, una experiencia diferente."</p>
                <cite className="text-[#0a0a0a]/35 text-[11px] tracking-[0.15em] uppercase not-italic mt-1 block">— Stay Groovy, Granada</cite>
              </blockquote>
              <div className="flex items-center gap-3 pt-2">
                <Image src="/logos/logo-hat.png" alt="" width={40} height={40} className="w-9 h-9 object-contain opacity-30" />
                <div>
                  <p className="text-[#0a0a0a]/25 text-[10px] tracking-[0.2em] uppercase">Contacto</p>
                  <a href="mailto:staygroovy.duo@gmail.com" className="text-[#c9a84c] text-xs hover:text-[#b8943d] transition-colors">staygroovy.duo@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 7 — Care Instructions
// ═══════════════════════════════════════════════════════════
const CARE = [
  { num: "01", label: "Del revés",           desc: "Lavar siempre del revés para proteger el gráfico." },
  { num: "02", label: "Agua fría",            desc: "Máximo 30°C. Sin calor excesivo." },
  { num: "03", label: "Sin lejía",            desc: "No usar lejía ni blanqueadores." },
  { num: "04", label: "Sin secadora",         desc: "Evitar la secadora completamente." },
  { num: "05", label: "Sin plancha directa",  desc: "No planchar sobre el grabado." },
  { num: "06", label: "Secar al aire",        desc: "En horizontal, alejado del sol directo." },
];

function SceneCare() {
  return (
    <div id="cuidados" className="relative w-full h-full bg-white overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="container-base section-pad w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 mb-10 items-end">
            <div>
              <p className="eyebrow mb-3">Cuidado de prenda</p>
              <h2 className="font-display title-lg text-[#0a0a0a] leading-none">CUIDADOS</h2>
            </div>
            <p className="text-[#0a0a0a]/45 text-sm leading-relaxed max-w-md">
              Cuida la prenda como cuidarías un vinilo raro — con calma, del revés y sin maltratar el gráfico.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-[#f0f0f0] rounded-xl overflow-hidden">
            {CARE.map(({ num, label, desc }, i) => (
              <div key={num} className={`group flex items-start gap-6 py-6 px-8 border-t border-[#e0e0e0] hover:bg-[#e8e8e8] transition-colors duration-300 cursor-default
                ${i % 2 === 0 ? "" : "md:border-l md:border-[#e0e0e0]"}`}>
                <span className="font-display text-[#c9a84c] text-2xl leading-none tracking-wider flex-shrink-0 pt-0.5 group-hover:scale-110 transition-transform duration-300">{num}</span>
                <div>
                  <h3 className="text-[#0a0a0a] text-sm font-semibold tracking-wide group-hover:text-[#c9a84c] transition-colors duration-300">{label}</h3>
                  <p className="text-[#0a0a0a]/50 text-xs leading-relaxed mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-4">
            <div className="w-0.5 min-h-[2.5rem] bg-[#c9a84c]/40 flex-shrink-0 mt-1" />
            <p className="text-[#0a0a0a]/30 text-xs leading-relaxed">
              Para conservar el grabado, lavar con prendas similares y evitar roces fuertes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 8 — Contact
// ═══════════════════════════════════════════════════════════
function IgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SceneContact() {
  return (
    <div id="contacto" className="relative w-full h-full bg-white overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(201,168,76,0.05) 0%, transparent 65%)" }} />
      <div className="absolute inset-0 flex items-center">
        <div className="container-base section-pad w-full">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Contacto</p>
            <h2 className="font-display title-lg text-[#0a0a0a] mb-6">HABLA CON<br />NOSOTROS</h2>
            <p className="text-[#0a0a0a]/45 text-sm leading-relaxed mb-10 max-w-md">
              Para consultas sobre pedidos, tallas, envíos o cualquier pregunta sobre la colección. También si quieres colaborar.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:staygroovy.duo@gmail.com" className="btn-gold">
                <Mail className="w-4 h-4" />staygroovy.duo@gmail.com
              </a>
              <a href="https://instagram.com/staygroovy_duo" target="_blank" rel="noopener noreferrer" className="btn-outline-light">
                <IgIcon className="w-4 h-4" />@staygroovy_duo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCENE 9 — Footer
// ═══════════════════════════════════════════════════════════
const SHOP_LINKS = [
  { href: "/#shop",       label: "Toda la colección" },
  { href: "/#tops-mujer", label: "Tops Mujer" },
  { href: "/#shop",       label: "Camisetas Oversize" },
];
const INFO_LINKS = [
  { href: "/#sobre-nosotros", label: "Sobre nosotros" },
  { href: "/#cuidados",       label: "Cuidados" },
  { href: "/#contacto",       label: "Contacto" },
  { href: "/envios",          label: "Política de envíos" },
  { href: "/cambios",         label: "Cambios y devoluciones" },
  { href: "/privacidad",      label: "Privacidad" },
];

function SceneFooter() {
  return (
    <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 flex items-center">
        <div className="container-base py-16 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            <div className="sm:col-span-2 lg:col-span-1">
              <Image src="/logos/logo-letras.png" alt="Stay Groovy" width={100} height={42}
                className="h-9 w-auto object-contain mb-4" />
              <p className="text-white/30 text-xs leading-relaxed max-w-[200px] mb-6">
                Dúo de DJs de Granada. Groove como filosofía, algodón como medio.
              </p>
              <div className="flex gap-3">
                <a href="https://instagram.com/staygroovy_duo" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="w-9 h-9 border border-white/12 flex items-center justify-center text-white/40 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
                  <IgIcon className="w-4 h-4" />
                </a>
                <a href="mailto:staygroovy.duo@gmail.com" aria-label="Email"
                  className="w-9 h-9 border border-white/12 flex items-center justify-center text-white/40 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white/20 text-[9px] tracking-[0.25em] uppercase mb-4">Tienda</h4>
              <ul className="space-y-3">
                {SHOP_LINKS.map((l) => (
                  <li key={l.label}><Link href={l.href} className="text-white/40 text-xs hover:text-[#c9a84c] transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/20 text-[9px] tracking-[0.25em] uppercase mb-4">Información</h4>
              <ul className="space-y-3">
                {INFO_LINKS.map((l) => (
                  <li key={l.label}><Link href={l.href} className="text-white/40 text-xs hover:text-[#c9a84c] transition-colors">{l.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/20 text-[9px] tracking-[0.25em] uppercase mb-4">Social</h4>
              <ul className="space-y-3">
                <li><a href="https://instagram.com/staygroovy_duo" target="_blank" rel="noopener noreferrer" className="text-white/40 text-xs hover:text-[#c9a84c] transition-colors">Instagram</a></li>
                <li><a href="mailto:staygroovy.duo@gmail.com" className="text-white/40 text-xs hover:text-[#c9a84c] transition-colors">staygroovy.duo@gmail.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-white/15 text-[10px] tracking-[0.15em] uppercase">© 2026 Stay Groovy. All rights reserved.</p>
            <p className="text-white/20 text-[10px]">Stay Groovy — Club culture, cotton and movement.</p>
          </div>
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
        <div className="relative w-full" style={{ height: "100svh" }}><SceneCountdown /></div>
        <div className="relative w-full" style={{ height: "100svh" }}><SceneProductGrid /></div>
        <div className="relative w-full" style={{ height: "100svh" }}><SceneWomen /></div>
        <div className="relative w-full" style={{ height: "100svh" }}><SceneAbout /></div>
        <div className="relative w-full" style={{ height: "100svh" }}><SceneCare /></div>
        <div className="relative w-full" style={{ height: "100svh" }}><SceneContact /></div>
        <div className="relative w-full" style={{ height: "100svh" }}><SceneFooter /></div>
      </>
    );
  }

  // ── Desktop: sticky crossfade total ─────────────────────
  const scenes = [
    <SceneHero         key="hero" />,
    <SceneCountdown    key="countdown" />,
    <SceneProductGrid  key="productgrid" />,
    <SceneWomen        key="women" />,
    <SceneAbout        key="about" />,
    <SceneCare         key="care" />,
    <SceneContact      key="contact" />,
    <SceneFooter       key="footer" />,
  ];

  function styleFor(index: number): CSSProperties {
    if (index === 0) {
      const p = scrollY / vh;
      let opacity = 1, brightness = 1;
      if (p > FADE_OUT) {
        const t  = easeInOut((p - FADE_OUT) / (1 - FADE_OUT));
        opacity    = lerp(1, 0, t);
        brightness = lerp(1, 0, t);
      }
      return {
        opacity,
        filter: brightness < 0.995 ? `brightness(${brightness.toFixed(3)})` : "none",
        pointerEvents: opacity > 0.05 ? "auto" : "none",
        zIndex: 10,
        willChange: "opacity, filter",
      };
    }
    return computeSceneStyle(scrollY, index, vh);
  }

  return (
    <>
      <div style={{ height: `${SCENE_COUNT * vh}px` }}>
        <div className="sticky top-0 overflow-hidden bg-black" style={{ height: `${vh}px` }}>
          {scenes.map((scene, i) => (
            <SceneSlot key={i} style={styleFor(i)}>
              {scene}
            </SceneSlot>
          ))}
        </div>
      </div>

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

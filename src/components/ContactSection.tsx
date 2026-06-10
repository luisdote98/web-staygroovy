import { Mail } from "lucide-react";
import Reveal from "./Reveal";

function IgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <div id="contacto" className="bg-white border-b border-[#e5e5e5] scene-center" style={{ minHeight: "100vh" }}>
      {/* Radial glow dorado suave */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(201,168,76,0.05) 0%, transparent 65%)" }} />
      <div className="container-base section-pad relative">
        <div className="max-w-2xl">
          <Reveal variant="title" delay={0}>
            <p className="eyebrow mb-4">Contacto</p>
            <h2 className="font-display title-lg text-[#0a0a0a] mb-6">HABLA CON<br />NOSOTROS</h2>
          </Reveal>
          <Reveal variant="text" delay={180}>
            <p className="text-[#0a0a0a]/45 text-sm leading-relaxed mb-10 max-w-md">
              Para consultas sobre pedidos, tallas, envíos o cualquier pregunta sobre la colección. También si quieres colaborar.
            </p>
          </Reveal>
          <Reveal variant="action" delay={320}>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:staygroovy.duo@gmail.com" className="btn-gold">
                <Mail className="w-4 h-4" />staygroovy.duo@gmail.com
              </a>
              <a href="https://instagram.com/staygroovy_duo" target="_blank" rel="noopener noreferrer" className="btn-outline-light">
                <IgIcon className="w-4 h-4" />@staygroovy_duo
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

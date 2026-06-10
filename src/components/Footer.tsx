import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

function IgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

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

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a]">
      <div className="container-base py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logos/logo-letras.png"
              alt="Stay Groovy"
              width={100}
              height={42}
              className="h-9 w-auto object-contain mb-4"
            />
            <p className="text-white/30 text-xs leading-relaxed max-w-[200px] mb-6">
              Dúo de DJs de Granada. Groove como filosofía, algodón como medio.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/staygroovy_duo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-white/12 flex items-center justify-center text-white/40 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
              >
                <IgIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:staygroovy.duo@gmail.com"
                aria-label="Email"
                className="w-9 h-9 border border-white/12 flex items-center justify-center text-white/40 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white/20 text-[9px] tracking-[0.25em] uppercase mb-4">Tienda</h4>
            <ul className="space-y-3">
              {SHOP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/40 text-xs hover:text-[#c9a84c] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white/20 text-[9px] tracking-[0.25em] uppercase mb-4">Información</h4>
            <ul className="space-y-3">
              {INFO_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/40 text-xs hover:text-[#c9a84c] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white/20 text-[9px] tracking-[0.25em] uppercase mb-4">Social</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://instagram.com/staygroovy_duo" target="_blank" rel="noopener noreferrer" className="text-white/40 text-xs hover:text-[#c9a84c] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:staygroovy.duo@gmail.com" className="text-white/40 text-xs hover:text-[#c9a84c] transition-colors">
                  staygroovy.duo@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/15 text-[10px] tracking-[0.15em] uppercase">© 2026 Stay Groovy. All rights reserved.</p>
          <p className="text-white/20 text-[10px]">Stay Groovy — Club culture, cotton and movement.</p>
        </div>
      </div>
    </footer>
  );
}

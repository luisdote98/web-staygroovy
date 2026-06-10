"use client";

import { useReveal } from "@/hooks/useReveal";
import { CSSProperties, ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────
// Variantes:
//  scene    → sección completa: scale 0.96 + blur 20px + opacity  (1200ms)
//  title    → título: scale 0.97 + blur 12px + translateY          (1000ms)
//  text     → párrafo: translateY + blur 6px + opacity             (900ms)
//  action   → botón / CTA: translateY + opacity                    (800ms)
//  image    → imagen: scale 0.97 + opacity                         (1100ms)
//  fade-up-blur → genérico ligero (retrocompatible)                (800ms)
// ─────────────────────────────────────────────────────────────────
export type RevealVariant =
  | "scene"
  | "title"
  | "text"
  | "action"
  | "image"
  | "fade-up-blur"
  | "fade-up"
  | "fade-blur";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

interface Config {
  hidden: CSSProperties;
  visible: CSSProperties;
  duration: number;
}

const VARIANTS: Record<RevealVariant, Config> = {
  scene: {
    hidden:  { opacity: 0, transform: "scale(0.96)",         filter: "blur(20px)" },
    visible: { opacity: 1, transform: "scale(1)",            filter: "blur(0px)"  },
    duration: 1200,
  },
  title: {
    hidden:  { opacity: 0, transform: "scale(0.97) translateY(18px)", filter: "blur(12px)" },
    visible: { opacity: 1, transform: "scale(1) translateY(0px)",     filter: "blur(0px)"  },
    duration: 1000,
  },
  text: {
    hidden:  { opacity: 0, transform: "translateY(20px)", filter: "blur(6px)" },
    visible: { opacity: 1, transform: "translateY(0px)",  filter: "blur(0px)" },
    duration: 900,
  },
  action: {
    hidden:  { opacity: 0, transform: "translateY(14px)" },
    visible: { opacity: 1, transform: "translateY(0px)"  },
    duration: 800,
  },
  image: {
    hidden:  { opacity: 0, transform: "scale(0.97)" },
    visible: { opacity: 1, transform: "scale(1)"    },
    duration: 1100,
  },
  "fade-up-blur": {
    hidden:  { opacity: 0, transform: "translateY(24px)", filter: "blur(8px)" },
    visible: { opacity: 1, transform: "translateY(0px)",  filter: "blur(0px)" },
    duration: 800,
  },
  "fade-up": {
    hidden:  { opacity: 0, transform: "translateY(28px)" },
    visible: { opacity: 1, transform: "translateY(0px)"  },
    duration: 800,
  },
  "fade-blur": {
    hidden:  { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)"  },
    duration: 800,
  },
};

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "header" | "footer" | "span" | "p";
  threshold?: number;
}

export default function Reveal({
  children,
  variant = "fade-up-blur",
  delay = 0,
  className = "",
  as: Tag = "div",
  threshold,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold });
  const cfg = VARIANTS[variant];

  const style: CSSProperties = {
    willChange: "opacity, transform, filter",
    transition: `opacity ${cfg.duration}ms ${EASE} ${delay}ms, transform ${cfg.duration}ms ${EASE} ${delay}ms, filter ${cfg.duration}ms ${EASE} ${delay}ms`,
    ...(visible ? cfg.visible : cfg.hidden),
  };

  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>;
}

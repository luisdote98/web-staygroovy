"use client";

import { useReveal } from "@/hooks/useReveal";
import { CSSProperties, ReactNode } from "react";

export type RevealVariant =
  | "title"
  | "text"
  | "action"
  | "image"
  | "scene"
  | "fade-up-blur"
  | "fade-up"
  | "fade-blur";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// Menos translateY → sensación de "materializa" no de "sube"
const VARIANTS: Record<RevealVariant, { hidden: CSSProperties; visible: CSSProperties; ms: number }> = {
  title: {
    hidden:  { opacity: 0, transform: "scale(0.97) translateY(8px)",  filter: "blur(10px)" },
    visible: { opacity: 1, transform: "scale(1) translateY(0px)",      filter: "blur(0px)"  },
    ms: 1000,
  },
  text: {
    hidden:  { opacity: 0, transform: "translateY(8px)",  filter: "blur(4px)" },
    visible: { opacity: 1, transform: "translateY(0px)",  filter: "blur(0px)" },
    ms: 900,
  },
  action: {
    hidden:  { opacity: 0, transform: "translateY(8px)" },
    visible: { opacity: 1, transform: "translateY(0px)" },
    ms: 750,
  },
  image: {
    hidden:  { opacity: 0, transform: "scale(0.95)", filter: "blur(8px)" },
    visible: { opacity: 1, transform: "scale(1)",    filter: "blur(0px)" },
    ms: 1100,
  },
  scene: {
    hidden:  { opacity: 0, transform: "scale(0.92)", filter: "blur(24px)" },
    visible: { opacity: 1, transform: "scale(1)",    filter: "blur(0px)"  },
    ms: 1400,
  },
  "fade-up-blur": {
    hidden:  { opacity: 0, transform: "translateY(8px)", filter: "blur(6px)" },
    visible: { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
    ms: 850,
  },
  "fade-up": {
    hidden:  { opacity: 0, transform: "translateY(10px)" },
    visible: { opacity: 1, transform: "translateY(0px)"  },
    ms: 800,
  },
  "fade-blur": {
    hidden:  { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)"  },
    ms: 800,
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
    transition: `opacity ${cfg.ms}ms ${EASE} ${delay}ms, transform ${cfg.ms}ms ${EASE} ${delay}ms, filter ${cfg.ms}ms ${EASE} ${delay}ms`,
    ...(visible ? cfg.visible : cfg.hidden),
  };

  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>;
}

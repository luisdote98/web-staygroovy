"use client";

import { useReveal } from "@/hooks/useReveal";
import { CSSProperties, ReactNode } from "react";

type Variant = "fade-up" | "fade-blur" | "fade-up-blur";

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;        // ms — para stagger
  duration?: number;     // ms — default 800
  className?: string;
  as?: "div" | "section" | "article" | "li" | "header" | "footer" | "span";
  threshold?: number;
}

const HIDDEN: Record<Variant, CSSProperties> = {
  "fade-up": {
    opacity: 0,
    transform: "translateY(28px)",
  },
  "fade-blur": {
    opacity: 0,
    filter: "blur(10px)",
  },
  "fade-up-blur": {
    opacity: 0,
    transform: "translateY(24px)",
    filter: "blur(8px)",
  },
};

const VISIBLE: CSSProperties = {
  opacity: 1,
  transform: "translateY(0px)",
  filter: "blur(0px)",
};

export default function Reveal({
  children,
  variant = "fade-up-blur",
  delay = 0,
  duration = 800,
  className = "",
  as: Tag = "div",
  threshold,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold });

  const style: CSSProperties = {
    willChange: "opacity, transform, filter",
    transition: `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, filter ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
    ...(visible ? VISIBLE : HIDDEN[variant]),
  };

  // @ts-expect-error — dynamic tag
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>;
}

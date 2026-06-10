"use client";

import { useReveal } from "@/hooks/useReveal";
import { CSSProperties, ReactNode } from "react";
import React from "react";

interface SceneProps {
  children: ReactNode;
  id?: string;
  className?: string;
  glow?: boolean;           // radial light detrás del contenido
  glowColor?: string;       // color del glow (default: dorado)
  minHeight?: string;       // default: "100vh"
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function Scene({
  children,
  id,
  className = "",
  glow = false,
  glowColor = "rgba(201,168,76,0.06)",
  minHeight = "100vh",
}: SceneProps) {
  const { ref, visible } = useReveal<HTMLElement>({
    threshold: 0.06,
    rootMargin: "0px 0px -40px 0px",
  });

  const style: CSSProperties = {
    scrollSnapAlign: "start",
    minHeight,
    willChange: "opacity, transform, filter",
    transition: `opacity 1400ms ${EASE}, transform 1400ms ${EASE}, filter 1400ms ${EASE}`,
    ...(visible
      ? { opacity: 1, transform: "scale(1)",    filter: "blur(0px)"  }
      : { opacity: 0, transform: "scale(0.92)", filter: "blur(24px)" }
    ),
  };

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id={id} className={`relative overflow-hidden ${className}`} style={style}>
      {/* Radial glow opcional */}
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${glowColor} 0%, transparent 70%)`,
            zIndex: 0,
          }}
        />
      )}
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  rootMargin?: string;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(opts: Options = {}) {
  const ref     = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold:  opts.threshold  ?? 0.08,
        rootMargin: opts.rootMargin ?? "0px 0px -60px 0px",
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [opts.threshold, opts.rootMargin]);

  return { ref, visible };
}

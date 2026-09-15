"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Fades and lifts children into place as they enter the viewport.
 * Content is fully visible immediately under prefers-reduced-motion.
 */
export default function RevealOnScroll({
  children,
  className,
  delay = 0,
  y = 32,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reduced, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

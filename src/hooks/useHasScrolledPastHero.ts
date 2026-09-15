"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * True once the hero's bottom sentinel has scrolled out of view.
 *
 * The sticky header sits in normal document flow above the hero, so the
 * hero's own `100dvh` height plus the header's height together exceed one
 * viewport height. Without compensating for that, the sentinel is already
 * just below the fold at scrollY 0, which would report "past hero"
 * immediately on load. Extending the intersection root's bottom edge by the
 * header's height corrects for that overlap.
 */
export function useHasScrolledPastHero(
  sentinelRef: RefObject<HTMLElement | null>
): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const headerHeight =
      document.querySelector("header")?.getBoundingClientRect().height ?? 0;

    const observer = new IntersectionObserver(
      ([entry]) => setPast(!entry.isIntersecting),
      { threshold: 0, rootMargin: `0px 0px ${headerHeight}px 0px` }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [sentinelRef]);

  return past;
}

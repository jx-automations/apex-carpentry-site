"use client";

import { RefObject, useEffect, useState } from "react";

export function useHasScrolledPastHero(
  sentinelRef: RefObject<HTMLElement | null>
): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPast(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [sentinelRef]);

  return past;
}

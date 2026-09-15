"use client";

import { useEffect, useState } from "react";

/**
 * True while the element with the given id is intersecting the viewport.
 * Used to hide the floating quote CTA while a section with its own
 * "Request a Quote" button (e.g. Contact) is on screen, so the two never
 * double up.
 */
export function useSectionInView(id: string): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = document.getElementById(id);
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [id]);

  return inView;
}

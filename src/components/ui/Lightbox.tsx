"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ApexImage } from "@/lib/images";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface LightboxProps {
  images: ApexImage[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

const SWIPE_THRESHOLD = 50;

export default function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const reduced = useReducedMotion();
  const [renderedIndex, setRenderedIndex] = useState(index);

  useScrollLock(true);
  useFocusTrap(dialogRef, true, onClose);

  const goNext = () => onNavigate((index + 1) % images.length);
  const goPrev = () => onNavigate((index - 1 + images.length) % images.length);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Reduced motion: reflect the requested index immediately, no crossfade.
  if (reduced && renderedIndex !== index) {
    setRenderedIndex(index);
  }

  useEffect(() => {
    const node = imageWrapRef.current;
    if (!node || reduced) return;
    if (renderedIndex === index) return;

    gsap.to(node, {
      opacity: 0,
      duration: 0.15,
      onComplete: () => {
        setRenderedIndex(index);
        gsap.to(node, { opacity: 1, duration: 0.2 });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduced]);

  useEffect(() => {
    const node = dialogRef.current;
    if (!node || reduced) return;
    gsap.fromTo(node, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 });
  }, [reduced]);

  const current = images[renderedIndex];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[60] bg-black/95 flex flex-col"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > SWIPE_THRESHOLD) goPrev();
        else if (delta < -SWIPE_THRESHOLD) goNext();
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 text-white/80 text-sm">
        <span>
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="w-11 h-11 flex items-center justify-center relative"
        >
          <span className="absolute w-6 h-px bg-white rotate-45" />
          <span className="absolute w-6 h-px bg-white -rotate-45" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center relative px-2 pb-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div ref={imageWrapRef} className="relative w-full h-full max-w-5xl mx-auto flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="sm:hidden flex justify-center gap-8 pb-6 text-white/70">
        <button type="button" onClick={goPrev} aria-label="Previous image" className="w-11 h-11 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" onClick={goNext} aria-label="Next image" className="w-11 h-11 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

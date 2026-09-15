"use client";

import { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import Lightbox from "@/components/ui/Lightbox";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-[var(--color-paper)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <RevealOnScroll>
          <SectionHeading eyebrow="Portfolio" title="More From Recent Projects" />
        </RevealOnScroll>

        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 [column-fill:_balance]">
          {IMAGES.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="mb-4 sm:mb-5 block w-full break-inside-avoid relative group cursor-pointer"
              aria-label={`View larger image: ${img.alt}`}
            >
              <span className="relative block w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading={i < 3 ? "eager" : "lazy"}
                />
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={IMAGES}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}

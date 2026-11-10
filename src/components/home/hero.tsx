"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = [
  // { src: "/images/business-man-1.jpg", alt: "Business consultation" },
  { src: "/images/business-man-2.jpg", alt: "Business meeting" },
  { src: "/images/deal-1.jpg", alt: "Business partnership" },
  { src: "/images/health-1.jpg", alt: "Professional consultation" },
  { src: "/images/insurance-1.jpg", alt: "Insurance consultation" },
  { src: "/images/meetings-1.jpg", alt: "Team meeting" },
  { src: "/images/woman-1.jpg", alt: "Professional at work" },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  function handleTouchEnd(clientX: number) {
    if (touchStart === null) return;

    const distance = clientX - touchStart;
    if (Math.abs(distance) > 50) {
      setActiveIndex((index) => (index + (distance < 0 ? 1 : -1) + heroImages.length) % heroImages.length);
    }
    setTouchStart(null);
  }

  return (
    <section className="relative overflow-hidden bg-brand-navy text-white" data-node-id="4:45">
      <div
        className="relative h-[506px] w-full touch-pan-y sm:h-[508px] lg:h-[510px]"
        onTouchStart={(event) => setTouchStart(event.touches[0]?.clientX ?? null)}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {heroImages.map((image, index) => (
            <div key={image.src} className="relative h-full min-w-full shrink-0 overflow-hidden bg-brand-navy">
              <img src={image.src} alt={image.alt} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/65 to-brand-navy/10" />

              {index === 0 && (
                <div className="absolute inset-x-6 bottom-16 z-10 max-w-3xl sm:inset-x-12 sm:bottom-24 lg:left-[calc(50%-590px)]">
                  <h1 className="text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-[50px] lg:leading-[1.12]">
                    TOP-TIER CONSULTING FIRM PLEDGING BESPOKE INNOVATIVE SOLUTIONS
                  </h1>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="#contact" className="rounded-full bg-brand-gold px-7 py-3.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-gold-hover">
                      Get Started
                    </Link>
                    <Link href="#about-us" className="rounded-full border-2 border-white px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-navy">
                      Learn more
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2" aria-label="Hero slides">
          {heroImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-8 bg-brand-gold" : "w-2 bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

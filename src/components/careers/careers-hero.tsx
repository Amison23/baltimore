"use client";

import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";

const slides = [
  { src: "/images/business-man-2.jpg", alt: "Business meeting" },
  { src: "/images/deal-1.jpg", alt: "Business partnership" },
  { src: "/images/meetings-1.jpg", alt: "Team meeting" },
  { src: "/images/woman-1.jpg", alt: "Professional at work" },
];

const spring = { type: "spring", stiffness: 280, damping: 30 } as const;

export function CareersHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <MotionConfig transition={spring} reducedMotion="user">
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="relative h-[360px] sm:h-[430px] lg:h-[500px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={slides[activeIndex].src}
              src={slides[activeIndex].src}
              alt={slides[activeIndex].alt}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/65 to-brand-navy/15" />
          <div className="relative mx-auto flex h-full max-w-[1300px] items-end px-5 pb-14 sm:px-8 sm:pb-20 lg:px-10">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Careers at Baltimore Group</p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">Build meaningful work with us.</h1>
              <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">Join a team solving important problems with integrity, curiosity, and care.</p>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2" aria-label="Career slides">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Show career slide ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${index === activeIndex ? "w-8 bg-brand-gold" : "w-2 bg-white/70 hover:bg-white"}`}
              />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

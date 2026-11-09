import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section bg-brand-navy text-white" data-node-id="4:45">
      <div className="mx-auto max-w-[1180px] px-6 py-20 sm:px-8 lg:py-28">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-[50px] lg:leading-[1.12]">
          TOP-TIER CONSULTING FIRM PLEDGING BESPOKE INNOVATIVE SOLUTIONS
        </h1>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="#contact" className="rounded-full bg-brand-gold px-7 py-3.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-gold-hover">
            Get Started
          </Link>
          <Link href="#about-us" className="rounded-full border-2 border-white px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-navy">
            Learn more
          </Link>
        </div>
      </div>
    </section>
  );
}

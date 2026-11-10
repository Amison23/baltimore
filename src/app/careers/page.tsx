import PortfolioCard from "@/components/careers/portfolio-card"
import JobCard from "@/components/careers/job-cards"
import { CareersHero } from "@/components/careers/careers-hero"

export default function CareersPage() {

  return (
    <div className="bg-brand-surface">
      <CareersHero />

      <main className="mx-auto max-w-[1300px] space-y-20 px-5 py-16 sm:px-8 lg:px-10">
        <section aria-labelledby="portfolio-heading">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Our work</p>
            <h2 id="portfolio-heading" className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">Portfolio</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-6">
            <div className="lg:col-span-4">
              <PortfolioCard />
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-brand-navy lg:col-span-2">
              <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="/images/meetings-1.jpg" aria-label="Baltimore Group portfolio video">
                <source src="/videos/careers.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-brand-navy/45" />
              <div className="relative flex h-full items-center justify-center p-6 text-center text-white">
                <p className="max-w-xs text-sm text-white/80">Add the careers video at <span className="font-semibold text-white">public/videos/careers.mp4</span> when it is ready.</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="jobs-heading">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Join the team</p>
            <h2 id="jobs-heading" className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">Open roles</h2>
          </div>
          <JobCard />
        </section>
      </main>
    </div>
  )
}

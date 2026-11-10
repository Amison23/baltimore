"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

const jobs = [
  {
    title: "Frontend Developer",
    role: "Engineering",
    description: "Develop responsive and accessible web applications using React, Next.js and TypeScript.",
    due: "2026-11-20"
  },
  {
    title: "Backend Developer",
    role: "Engineering",
    description: "Design, develop and maintain scalable APIs, databases and server-side applications.",
    due: "2026-11-25"
  },
  {
    title: "UI/UX Designer",
    role: "Design",
    description: "Create intuitive user interfaces, wireframes and interactive prototypes for digital products.",
    due: "2026-11-18"
  },
  {
    title: "Product Manager",
    role: "Product",
    description: "Coordinate product development, define roadmaps and collaborate with engineering and design teams.",
    due: "2026-11-28"
  },
  {
    title: "QA Engineer",
    role: "Quality Assurance",
    description: "Perform manual and automated testing to identify defects and ensure software quality.",
    due: "2026-11-22"
  },
  {
    title: "DevOps Engineer",
    role: "Infrastructure",
    description: "Manage CI/CD pipelines, cloud infrastructure, deployment workflows and system reliability.",
    due: "2026-12-01"
  },
  {
    title: "Data Analyst",
    role: "Data & Analytics",
    description: "Analyze business data, build dashboards and generate actionable insights using SQL and visualization tools.",
    due: "2026-11-26"
  },
  {
    title: "Cybersecurity Analyst",
    role: "Security",
    description: "Monitor security threats, investigate vulnerabilities and implement measures to protect organizational systems.",
    due: "2026-12-05"
  },
  {
    title: "Human Resource Officer",
    role: "Human Resources",
    description: "Manage recruitment processes, employee onboarding, staff records and internal HR operations.",
    due: "2026-11-30"
  },
  {
    title: "Digital Marketing Specialist",
    role: "Marketing",
    description: "Plan and execute digital campaigns, manage social media channels and analyze marketing performance.",
    due: "2026-11-24"
  }
] as const;

export default function JobCard(){
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedJob, setSelectedJob] = useState<typeof jobs[number] | null>(null);
  const visibleJobs = jobs.slice(0, visibleCount);

  function openJob(job: typeof jobs[number]) {
    setSelectedJob(job);
  }

  return <div>
    <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
    <AnimatePresence initial={false}>
    {visibleJobs.map((item) => (
      <motion.div key={item.title} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
      <Card
        role="button"
        tabIndex={0}
        onClick={() => openJob(item)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openJob(item);
          }
        }}
        className="h-full cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold motion-reduce:transition-none"
      >
        <CardHeader>
          <CardTitle>
            {item.title}
          </CardTitle>
          <CardDescription>
            <p className=''>
              {item.role}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>{item.description}</p>
            <div>
              <p>{item.due}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    ))}
    </AnimatePresence>
    </motion.div>
    {visibleCount < jobs.length && (
      <div className="mt-8 flex justify-center">
        <button type="button" onClick={() => setVisibleCount((count) => Math.min(count + 5, jobs.length))} className="rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-gold-hover motion-reduce:transition-none">
          Load more jobs
        </button>
      </div>
    )}
    <AnimatePresence>
      {selectedJob && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/50 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedJob(null)}>
          <motion.div role="dialog" aria-modal="true" aria-labelledby="job-dialog-title" className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8" initial={{ y: 18, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 18, scale: 0.97 }} onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label="Close job details" onClick={() => setSelectedJob(null)} className="absolute right-4 top-4 text-xl text-brand-slate transition-colors hover:text-brand-navy motion-reduce:transition-none">×</button>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">Open role</p>
            <h3 id="job-dialog-title" className="mt-2 text-2xl font-bold text-brand-navy">{selectedJob.title}</h3>
            <p className="mt-2 text-sm font-medium text-brand-blue">{selectedJob.role}</p>
            <p className="mt-5 text-sm leading-6 text-brand-slate">{selectedJob.description}</p>
            <p className="mt-4 text-sm text-brand-slate-light">Applications close: {selectedJob.due}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`/careers/apply?role=${encodeURIComponent(selectedJob.title)}`} className="rounded-full bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-gold-hover motion-reduce:transition-none">
                Apply now
              </a>
              <button type="button" onClick={() => setSelectedJob(null)} className="rounded-full border border-brand-blue px-5 py-3 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white motion-reduce:transition-none">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
}

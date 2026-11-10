"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Badge } from "../ui/badge"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "../ui/card"

const portfolio = [
  {
    title: "Corporate Medical Insurance",
    category: "Health Insurance",
    description: "Provided comprehensive medical insurance solutions for corporate clients, covering inpatient, outpatient, dental, optical and maternity benefits.",
    image: "/images/careers/c1.jpg",
    client: "Corporate Clients",
    coverage: "Employee Medical Coverage",
    status: "Active",
    date: "2026-10-15"
  },
  {
    title: "Motor Fleet Insurance",
    category: "Motor Insurance",
    description: "Arranged comprehensive fleet insurance coverage for businesses operating multiple vehicles, including accident protection, theft and third-party liability.",
    image: "/images/careers/c2.jpg",
    client: "Transport & Logistics Companies",
    coverage: "Commercial Vehicle Fleet",
    status: "Active",
    date: "2026-09-20"
  },
  {
    title: "Property & Fire Insurance",
    category: "Property Insurance",
    description: "Delivered property protection solutions covering commercial buildings, office equipment, fire damage and associated business assets.",
    image: "/images/careers/c3.jpg",
    client: "Commercial Property Owners",
    coverage: "Buildings & Business Assets",
    status: "Completed",
    date: "2026-08-12"
  },
  {
    title: "Professional Indemnity Cover",
    category: "Liability Insurance",
    description: "Facilitated professional indemnity insurance for businesses and consultants against claims arising from professional negligence, errors or omissions.",
    image: "/images/careers/c4.jpg",
    client: "Professional Service Firms",
    coverage: "Professional Liability",
    status: "Active",
    date: "2026-07-05"
  },
  {
    title: "Marine Cargo Insurance",
    category: "Marine Insurance",
    description: "Structured cargo insurance solutions protecting goods in transit against loss or damage during domestic and international transportation.",
    image: "/images/careers/c5.jpg",
    client: "Importers & Exporters",
    coverage: "Goods in Transit",
    status: "Active",
    date: "2026-06-18"
  },
  {
    title: "Group Life Assurance",
    category: "Life Insurance",
    description: "Coordinated group life assurance schemes for organizations, providing financial protection to employees' beneficiaries in the event of death.",
    image: "/images/careers/c1.jpg",
    client: "Corporate Organizations",
    coverage: "Employee Life Protection",
    status: "Completed",
    date: "2026-05-22"
  },
  {
    title: "Contractors All Risks Insurance",
    category: "Engineering Insurance",
    description: "Arranged comprehensive construction insurance covering accidental physical loss or damage to works, construction materials and equipment.",
    image: "/images/careers/c2.jpg",
    client: "Construction Companies",
    coverage: "Construction Projects",
    status: "Active",
    date: "2026-04-10"
  },
  {
    title: "Travel Insurance Solutions",
    category: "Travel Insurance",
    description: "Provided international and domestic travel insurance covering emergency medical expenses, trip cancellations, lost baggage and travel-related emergencies.",
    image: "/images/careers/c3.jpg",
    client: "Individual & Corporate Travellers",
    coverage: "International & Domestic Travel",
    status: "Completed",
    date: "2026-03-15"
  }
] as const;


export default function PortfolioCard(){
  const [visibleCount, setVisibleCount] = useState(4);
  const hasMore = visibleCount < portfolio.length;

  return <div className={hasMore ? "relative pb-20" : "relative"}>
    <motion.div layout className="grid gap-6 sm:grid-cols-2">
    <AnimatePresence initial={false}>
    {portfolio.slice(0, visibleCount).map((item) => (
    <motion.div 
      key={item.title} 
      layout initial={{ opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} 
      transition={{ duration: 0.25 }}
    >
    <Card size="sm" className="h-full rounded-2xl shadow-sm">
      <div>
        <img 
          src={item.image}
          alt=""
          className="relative z-20 h-32 w-full object-cover brightness-75 transition-transform duration-300 group-hover/card:scale-105 motion-reduce:transition-none"
        />
      </div>
      <CardHeader className="px-4">
        <CardAction>
          <Badge variant="secondary">{item.category}</Badge>
        </CardAction>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {item.description}
          <p>{item.coverage}</p>
        </CardDescription>
      </CardHeader>
    </Card>
    </motion.div>
    ))}
    </AnimatePresence>
    </motion.div>
    {hasMore && (
      <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-brand-surface via-brand-surface/95 to-transparent pt-16">
        <button type="button" onClick={() => setVisibleCount(portfolio.length)} className="rounded-full border border-brand-blue bg-white px-6 py-3 text-sm font-semibold text-brand-blue shadow-sm transition hover:bg-brand-blue hover:text-white motion-reduce:transition-none">
          View more portfolio
        </button>
      </div>
    )}
  </div>
}

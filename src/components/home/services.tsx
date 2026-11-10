import ServiceCard from "../layout/ServiceCard";
import Link from "next/link"
const services = [
  { title: "Insurance Consultancy", description: "In case you can’t be there to catch them, make sure you leave a safety net.", image: "/assets/service-1.png" },
  { title: "Homes Consultancy", description: "Real estate is an imperishable asset and the basis of lasting security.", image: "/assets/service-5.png" },
];

const contactMethods = [
  ["/assets/phone.svg", "Call Us"],
  ["/assets/whatsapp.svg", "Chat on WhatsApp"],
  ["/assets/calendar.svg", "Book a Consultation"],
  ["/assets/profile.svg", "Company Profile"],
] as const;

export default function Services() {
  return (
    <>
    <section id="services" className="bg-brand-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <h2 className="text-3xl font-bold text-brand-navy">Our Services</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service) => 
            <ServiceCard key={service.title} {...service} />
          )}
        </div>
      </div>
    </section>
    <section className="bg-brand-surface py-10">
      <div className="mx-auto grid max-w-[1180px] gap-4 px-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {contactMethods.map(([icon, label]) => (
          <Link
            key={label}
            href="#contact"
            className="flex h-[82px] items-center gap-4 rounded-xl border border-brand-border bg-white px-5 transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-brand-icon-surface">
              <img src={icon} alt="" className="size-[22px]" />
            </span>
            <span className="text-base font-semibold text-brand-navy">{label}</span>
          </Link>
        ))}
      </div>
    </section>
    </>
  );
}

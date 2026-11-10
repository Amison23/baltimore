import ServiceCard from "../layout/ServiceCard";

const services = [
  { title: "Insurance Consultancy", description: "In case you can’t be there to catch them, make sure you leave a safety net.", image: "/assets/service-1.png" },
  { title: "Homes Consultancy", description: "Real estate is an imperishable asset and the basis of lasting security.", image: "/assets/service-5.png" },
];

export default function Services() {
  return (
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
  );
}

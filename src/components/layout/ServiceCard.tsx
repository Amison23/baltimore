import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
};

export default function ServiceCard({ title, description, image }: ServiceCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none">
      <div className="relative h-44 overflow-hidden">
        <div className="absolute inset-0 z-10 transition-colors duration-300 motion-reduce:transition-none" />
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
      </div>
      <div className="p-6">
        <h3 className="text-[22px] font-bold text-brand-navy transition-colors group-hover:text-brand-gold motion-reduce:transition-none">{title}</h3>
        <p className="mt-4 min-h-20 text-[15px] leading-6 text-brand-slate">{description}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href="#contact" className="rounded-full bg-brand-gold px-6 py-3 text-center text-sm font-semibold text-brand-navy transition hover:bg-brand-gold-hover">Get a Quote</Link>
          <Link href="#about-us" className="rounded-full border-2 border-brand-blue px-6 py-3 text-center text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white">More Information</Link>
        </div>
      </div>
    </article>
  );
}

const directors = [
  ["DB", "Dan Bruson", "Director"],
  ["JG", "Joseph Gatimu", "Director"],
  ["EL", "Eva J. Lanoi", "PR & Digital Marketing Manager"],
  ["EM", "Esther Mumbi", "Administration Manager"],
] as const;


export default function People() {
  return (
    <section id="our-people" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <h2 className="text-center text-3xl font-bold text-brand-navy">Our People</h2>
        <p className="mt-4 text-center text-base text-brand-slate">Board of Directors</p>
        
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {directors.map(([initials, name, role]) => (
            <article key={name} className="group rounded-2xl border border-transparent px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-border hover:bg-brand-surface hover:shadow-lg motion-reduce:transition-none">
              <div className="mx-auto flex size-[84px] items-center justify-center rounded-full bg-brand-icon-surface text-[26px] font-bold text-brand-navy transition-all duration-300 group-hover:bg-brand-gold group-hover:text-brand-navy group-hover:shadow-md motion-reduce:transition-none">
                {initials}
              </div>
              <h3 className="mt-6 text-base font-bold text-brand-navy transition-colors group-hover:text-brand-gold motion-reduce:transition-none">{name}</h3>
              <p className="text-sm text-brand-slate-light">{role}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

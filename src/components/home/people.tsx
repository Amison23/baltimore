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
        <div className="mx-auto mt-12 grid max-w-3xl gap-x-20 gap-y-14 sm:grid-cols-2">
          {directors.map(([initials, name, role]) => (
            <article key={name} className="text-center">
              <div className="mx-auto flex h-[84px] w-72 max-w-full items-center justify-center rounded-full bg-brand-icon-surface text-[26px] font-bold text-brand-navy">{initials}</div>
              <h3 className="mt-8 text-base font-bold text-brand-navy">{name}</h3>
              <p className="text-sm text-brand-slate-light">{role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const companyBio = [
  {
    id: "dna",
    title: "Our DNA",
    description: "We push the envelope of excellence. Unmistakably unique. Solution giver and problem solver.",
  },
  {
    id: "values",
    title: "Our Values",
    description: "Excellence, commitment, integrity, quality, market driven, human dignity and teamwork.",
  },
  {
    id: "approach",
    title: "Our Approach",
    description: "Practical business solutions, not options. We don’t dwell on theory; we give you advice you can act on.",
  },
];

export default function AboutUs() {
  return (
    <section id="about-us" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <h2 className="text-3xl font-bold text-brand-navy">Who we Are</h2>
        <p className="mt-6 max-w-5xl text-base leading-7 text-brand-slate">
          Founded in 2014 Baltimore Group is a Consultancy firm, recognized for professional unique and innovative consultancy services of the highest caliber. We draw on our unique knowledge of the African business environment, and in-depth understanding of the Business process &amp; operations to advise clients on a wide range of business consultancy solutions.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {companyBio.map((item) => (
            <article key={item.id} className="rounded-2xl bg-brand-surface p-7">
              <h3 className="text-[19px] font-bold text-brand-navy">{item.title}</h3>
              <p className="mt-6 text-base leading-[1.7] text-brand-slate">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const stats = [
    ["99%", "Satisfaction"],
    ["599", "Projects"],
    ["2,300", "Happy clients"],
    ["55", "Youths with jobs"],
  ];

  return (
    <section className="bg-brand-navy py-12 text-center text-white">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-8 px-6 sm:grid-cols-4 sm:px-8">
        {stats.map(([value, label]) => (
          <div key={label}>
            <h2 className="text-4xl font-bold">{value}</h2>
            <p className="mt-2 text-base opacity-85">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

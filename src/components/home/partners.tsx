const partners = [
  "[LOGO] CIC",
  "[LOGO] Jubilee",
  "[LOGO] ICEA",
  "[LOGO] UAP",
  "[LOGO] Resolution",
  "[LOGO] APA",
];
// scroll functionality

export default function Partners() {
  return (
    <section id="partners" className="bg-brand-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-8">
        <h2 className="text-3xl font-bold text-brand-navy">Our Partners</h2>
        <p className="mt-5 max-w-5xl text-base leading-7 text-brand-slate">
          We seize every opportunity to develop long term business partnerships
          with companies who are leaders in their sector. We strive to build
          robust networks, through partnering with various stakeholders in order
          to deliver excellent tailored solutions for our array of customers.
        </p>
        <div className="scroller-container mt-10">
          <div className="scroller-track">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4">
                {partners.map((partner, index) => (
                  <div
                    key={`${partner}-${index}`}
                    className="flex h-[84px] w-40 shrink-0 items-center justify-center rounded-xl border border-brand-border bg-white px-3 text-center text-sm font-semibold text-brand-slate-light transition-colors hover:border-brand-gold hover:text-brand-navy motion-reduce:transition-none"
                  >
                    {partner}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";


export default function Contacts() {
  return (
    <>
      <section id="contact" className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold text-brand-navy">Contact Us</h2>
            <p className="mt-5 text-base text-brand-slate">
              Tell us what you need and we’ll get back to you.
            </p>
            <div className="mt-12 space-y-7 text-base text-brand-navy">
              <p>
                <strong className="block">Call</strong>
                +254 703 250 973 | +254 729 859 250
              </p>
              <p>
                <strong className="block">Email</strong>
                info@baltimoregroupltd.co.ke
              </p>
              <p>
                <strong className="block">Location</strong>
                P.O Box 15493-00100, Nairobi, Kenya
              </p>
            </div>
          </div>

          <form className="rounded-2xl bg-brand-surface p-7">
            <label className="block text-sm font-semibold text-brand-navy">
              Name
              <input
                name="name"
                className="mt-2 h-12 w-full rounded-xl border border-brand-border-strong bg-white px-4 outline-none focus:border-brand-blue"
              />
            </label>
            <label className="mt-6 block text-sm font-semibold text-brand-navy">
              Email
              <input
                name="email"
                type="email"
                className="mt-2 h-12 w-full rounded-xl border border-brand-border-strong bg-white px-4 outline-none focus:border-brand-blue"
              />
            </label>
            <label className="mt-6 block text-sm font-semibold text-brand-navy">
              Message
              <textarea
                name="message"
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-brand-border-strong bg-white px-4 py-3 outline-none focus:border-brand-blue"
              />
            </label>
            <button
              type="submit"
              className="mt-7 w-full rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-gold-hover"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

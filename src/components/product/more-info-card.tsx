import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MoreInfoCard() {
  const actions = [
    { label: "Renew Policy", href: "#renew" },
    { label: "Contact Us", href: "/#contact" },
    { label: "+254 719 071 999", href: "tel:+254719071999" },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-md">
      {/* Desktop Chevron Banner (md and up) */}
      <div className="relative hidden h-[200px] w-full items-center justify-between overflow-hidden md:flex lg:h-[220px]">
        {/* Background Support Specialist Photo */}
        <Image
          src="/images/woman-1.jpg"
          alt="Customer service representative"
          fill
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="object-cover object-[center_35%]"
        />

        {/* Left Section: Orange Gradient with Arrow/Chevron Point */}
        <div
          className="relative z-10 flex h-full w-[42%] flex-col justify-center bg-gradient-to-r from-[#e87722] via-[#f5901e] to-[#fdb913] py-6 pl-8 pr-12 lg:w-[40%] lg:pl-10 lg:pr-14"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 36px) 0, 100% 50%, calc(100% - 36px) 100%, 0 100%)",
          }}
        >
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2.2rem]">
            Have Questions?
            <br />
            Let&apos;s Talk!
          </h2>
        </div>

        {/* Center Transparent Area for Photo (auto flex-1) */}
        <div className="flex-1" />

        {/* Right Section: Orange with Chevron Indent & Actions */}
        <div
          className="relative z-10 flex h-full w-[40%] flex-col justify-center bg-[#f58220] py-6 pl-14 pr-6 lg:w-[36%] lg:pl-16 lg:pr-8"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 36px 50%)",
          }}
        >
          <div className="flex w-full max-w-[270px] flex-col gap-2.5">
            {actions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0066cc] shadow-sm transition hover:bg-slate-50 hover:shadow"
              >
                <span>{action.label}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#0066cc]"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Banner (stacked layout for small screens) */}
      <div className="relative flex flex-col overflow-hidden bg-gradient-to-r from-[#e87722] via-[#f58220] to-[#f58220] p-6 sm:p-8 md:hidden">
        <div className="relative z-10 flex flex-col gap-5">
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
            Have Questions?
            <br />
            Let&apos;s Talk!
          </h2>

          <div className="flex w-full flex-col gap-2.5">
            {actions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#0066cc] shadow-sm transition hover:bg-slate-50"
              >
                <span>{action.label}</span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#0066cc]"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreInfoCard;

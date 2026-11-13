"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

export default function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateTime: "",
    comment: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full rounded-2xl border border-blue-400 bg-white p-6 sm:p-7">
      <h2 className="text-2xl sm:text-[1.75rem] font-semibold text-[#0066cc]">
        Request for a callback
      </h2>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="callback-name" className="sr-only">
            Name
          </label>
          <input
            id="callback-name"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
          />
        </div>

        <div>
          <label htmlFor="callback-email" className="sr-only">
            Email Address
          </label>
          <input
            id="callback-email"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
          />
        </div>

        <div>
          <label htmlFor="callback-phone" className="sr-only">
            Phone Number
          </label>
          <input
            id="callback-phone"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
          />
        </div>

        <div className="relative">
          <label htmlFor="callback-datetime" className="sr-only">
            Pick a date and time
          </label>
          <input
            id="callback-datetime"
            type="text"
            name="dateTime"
            placeholder="Pick a date and time"
            value={formData.dateTime}
            onChange={(e) =>
              setFormData({ ...formData, dateTime: e.target.value })
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-11 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
          />
          <Calendar
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-5 text-slate-400"
          />
        </div>

        <div>
          <label htmlFor="callback-comment" className="sr-only">
            Comment
          </label>
          <textarea
            id="callback-comment"
            name="comment"
            rows={3}
            placeholder="Comment"
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0066cc] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-[#0066cc] py-3 text-center text-base font-semibold text-white transition hover:bg-[#0055b3] focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

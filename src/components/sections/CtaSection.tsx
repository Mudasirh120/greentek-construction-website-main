"use client";

import { useEffect, useRef, useState } from "react";

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, visible };
}

const checklist = [
  "Free professional site survey",
  "Tailored savings estimate within 24 hours",
  "Hassle-free grant & finance guidance",
  "Written warranty on every completed job",
];

const contactDetails = [
  {
    label: "0333 533 4567",
    href: "tel:+443335334567",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
  {
    label: "info@greentekenergy.co.uk",
    href: "mailto:info@greentekenergy.co.uk",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "6060 Knights Court, Birmingham Business Park, Solihull, B37 7WY",
    href: "https://maps.google.com",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  full_name: "",
  email: "",
  phone: "",
  message: "",
};

export default function CtaSection() {
  const contentFade = useFadeIn(0);
  const formFade = useFadeIn(150);

  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section className="py-10 lg:py-14">
      <div className="relative mx-auto max-w-7xl bg-[url('/images/form-bg.avif')] rounded-xl bg-cover bg-center overflow-hidden">
        <div className="absolute inset-0 bg-black/70 rounded-xl" />
        <div className="relative z-10 grid lg:grid-cols-12 gap-10 p-6 sm:p-10 md:p-14">
          {/* Left: copy + checklist + contact */}
          <div
            ref={contentFade.ref}
            className={`lg:col-span-6 flex flex-col justify-center transition-all duration-1000 ease-out ${
              contentFade.visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c5eb02] mb-4">
              Get In Touch
            </p>
            <h2 className="text-[1.75rem] sm:text-4xl md:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-white mb-4">
              Ready for a free, no-pressure quote?
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Tell us a little about your home — solar, heating, insulation, or
              renovation. We&apos;ll get back within one business day with a
              tailored plan and quote.
            </p>

            {/* <ul className="space-y-3 mb-8">
              {checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-white/90">
                    {item}
                  </span>
                </li>
              ))}
            </ul> */}

            <div className="flex flex-col gap-3">
              {contactDetails.map((detail) => (
                <a
                  key={detail.label}
                  href={detail.href}
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    {detail.icon}
                  </span>
                  {detail.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: form card */}
          <div
            ref={formFade.ref}
            className={`lg:col-span-6 bg-black/50 backdrop-blur-sm border border-white/50 rounded-xl p-6 sm:p-8 shadow-2xl transition-all duration-1000 ease-out ${
              formFade.visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label
                  htmlFor="full_name"
                  className="text-xs font-bold text-white ml-1"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  autoComplete="name"
                  required
                  value={form.full_name}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/20 backdrop-blur-sm border border border-transparent  focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all outline-none font-medium text-white placeholder:text-white text-sm"
                  placeholder="Jane Smith"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-bold text-white ml-1"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/20 backdrop-blur-sm border border-transparent  focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all outline-none font-medium text-white placeholder:text-white text-sm"
                  placeholder="jane@email.com"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="text-xs font-bold text-white ml-1"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/20 backdrop-blur-sm border border-transparent  focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all outline-none font-medium text-white placeholder:text-white text-sm"
                  placeholder="07000 000000"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-bold text-white ml-1"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-transparent  focus:border-green-600 focus:ring-4 focus:ring-green-600/10 transition-all outline-none font-medium text-white placeholder:text-white text-sm"
                  placeholder="Tell us about your solar, heating, insulation, or renovation project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 rounded-xl bg-[#c5eb02] text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-green-600 transition-all duration-500 shadow-xl shadow-zinc-900/10 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {status === "submitting" ? "Sending..." : "Send My Request"}
              </button>

              {status === "success" && (
                <p className="text-xs font-bold text-green-600 text-center">
                  Thanks — we&apos;ll be in touch within one business day.
                </p>
              )}
              {status === "error" && (
                <p className="text-xs font-bold text-red-600 text-center">
                  Something went wrong. Please try again or call us directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

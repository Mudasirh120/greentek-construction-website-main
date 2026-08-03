"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/sections/CtaSection";
import { siteConfig } from "@/data/site";
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

function ContactMethod({
  icon,
  title,
  value,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
  index: number;
}) {
  const { ref, visible } = useFadeIn(index * 100);

  return (
    <div
      ref={ref}
      className={`flex gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 transition-all duration-700 hover:bg-white hover:shadow-lg hover:shadow-green-900/5 hover:-translate-y-1 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-700 shadow-sm border border-zinc-100">
        {icon}
      </div>
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-0.5">
          {title}
        </h3>
        <div className="text-sm font-bold text-zinc-900 leading-tight">
          {value}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const headerFade = useFadeIn(0);
  const formFade = useFadeIn(200);
  const mapHeaderFade = useFadeIn(0);

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      {/* Centered Hero Section */}
      <section className="relative  bg-[url('/images/footer/footer-bg.webp')] bg-cover overflow-hidden">
        <div className="bg-black/60 pt-30 py-20">
          <div
            ref={headerFade.ref}
            className={`relative mx-auto max-w-7xl px-6 text-center transition-all duration-1000 ease-out ${
              headerFade.visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-[2rem] md:text-[3.5rem] font-extrabold leading-[1.15] text-white mb-8">
              Get in <span className="text-[#c5eb02]">Touch.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
              Whether you have a question about our services or need a quote for
              a new project, our team is ready to assist you.
            </p>
          </div>
        </div>
      </section>
      <CtaSection />
      {/* Map Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div
            ref={mapHeaderFade.ref}
            className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 ease-out ${
              mapHeaderFade.visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-[10px] md:text-[16px] font-semibold uppercase tracking-[0.3em mb-6 bg-[#28282C] text-[#c5eb02] rounded-2xl px-3 py-1 w-fit text-center mx-auto">
              Our Location
            </p>
            <h2 className="text-[1.625rem] md:text-[2.5rem] font-bold leading-[1.2] tracking-tight text-white mb-4">
              Visit Our Office
            </h2>
            <p className="text-base text-white font-medium">
              Our central office is located in Solihull, allowing us to
              efficiently serve clients across the Midlands and the rest of the
              UK.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden border border-[#c5eb02] shadow-lg shadow-[#c5eb02]/10 h-[450px] relative p-2">
            <iframe
              src="https://www.google.com/maps?q=6060+Knights+Court+Birmingham+Business+Park+Solihull+B37+7WY&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

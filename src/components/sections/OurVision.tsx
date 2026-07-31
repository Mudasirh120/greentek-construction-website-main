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

const stats = [
  { value: "2020", label: "Established" },
  { value: "500+", label: "Projects Delivered" },
  { value: "Expertise", label: "Domestic & Commercial" },
  { value: "Nationwide", label: "SERVICE ACROSS THE UK" },
];

function CountUp({
  target,
  suffix = "",
  visible,
}: {
  target: number;
  suffix?: string;
  visible: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function StatCard({ stat, delay }: { stat: (typeof stats)[0]; delay: number }) {
  const fade = useFadeIn(delay);

  const numericValue = stat.value.match(/\d+/);
  const target = numericValue ? parseInt(numericValue[0]) : null;
  const suffix = stat.value.replace(/\d+/g, "");

  return (
    <div
      ref={fade.ref}
      className={`group relative bg-zinc-50 rounded-3xl p-5 md:p-8 border border-zinc-100 transition-all duration-700 hover:bg-white hover:border-green-500/20 hover:shadow-2xl hover:shadow-green-900/5 hover:-translate-y-1 ${
        fade.visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="relative z-10">
        <span className="text-3xl md:text-4xl font-black text-green-700 leading-none tracking-tighter block mb-3 group-hover:scale-105 transition-transform duration-500 origin-left">
          {target !== null ? (
            <CountUp target={target} suffix={suffix} visible={fade.visible} />
          ) : (
            stat.value
          )}
        </span>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-800 transition-colors">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

export default function OurVision() {
  const headerFade = useFadeIn(0);
  const journeyFade = useFadeIn(100);

  return (
    <section className="py-10 lg:py-14 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Centered heading block */}
        <div
          ref={headerFade.ref}
          className={`text-center max-w-4xl mx-auto mb-10 md:mb-10 transition-all duration-700 ease-out ${
            headerFade.visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-[10px] md:text-[16px] font-semibold uppercase tracking-[0.3em mb-6 bg-[#28282C] text-[#c5eb02] rounded-2xl px-3 py-1 w-fit mx-auto">
            About Us
          </p>
          <h2 className="text-[1.625rem] md:text-[2.5rem] font-bold leading-[1.2] tracking-tight text-white">
            Our Vision
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/80 leading-relaxed font-medium text-center w-0/2 md:w-3/4 mx-auto font-normal">
            We combine renewable energy with property renovation and
            construction, so instead of juggling separate companies for your
            solar, your heating, and your extension, you get one accredited team
            handling it all, properly, from day one.
          </p>
        </div>
      </div>
    </section>
  );
}

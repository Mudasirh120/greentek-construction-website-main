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
  { value: "500+", label: "Projects Completed" },
  { value: "25+", label: "Years Combined Experience" },
  { value: "98%", label: "Satisfaction Rate" },
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
  const numericMatch = stat.value.match(/(\d+(\.\d+)?)/);
  const target = numericMatch ? parseFloat(numericMatch[0]) : null;
  const suffix = numericMatch ? stat.value.replace(numericMatch[0], "") : "";
  const isDecimal = numericMatch ? numericMatch[0].includes(".") : false;

  return (
    <div
      ref={fade.ref}
      className={`flex-1 text-center px-6 py-4 md:py-0 transition-all duration-700 ${
        fade.visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-none tracking-tight mb-3">
        {target !== null ? (
          isDecimal ? (
            <span>
              {(fade.visible ? target : 0).toFixed(1)}
              {suffix}
            </span>
          ) : (
            <CountUp target={target} suffix={suffix} visible={fade.visible} />
          )
        ) : (
          stat.value
        )}
      </div>
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#c5eb02]">
        {stat.label}
      </p>
    </div>
  );
}

export default function Stats() {
  const headerFade = useFadeIn(0);

  return (
    <section className="py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="bg-[#101314] rounded-xl border border-[#C5EB02] py-10 md:py-14 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 shadow-lg shadow-[#c5eb02]/10">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

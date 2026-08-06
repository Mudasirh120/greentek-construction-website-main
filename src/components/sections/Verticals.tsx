"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
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

export default function Verticals() {
  const headerFade = useFadeIn(0);
  const journeyFade = useFadeIn(100);

  return (
    <section className=" py-10 lg:py-14 overflow-hidden px-4 md:px-10">
      <div className="mx-auto max-w-7xl px-6">
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
            A Home That Works Harder, For Less.
          </h2>
          <p className="mt-4 text-md md:text-xl text-white/80 leading-relaxed w-full text-center md:w-[85%] mx-auto font-normal">
            We believe you shouldn't need three different companies to power
            your property, fix your heating, and renovate your space. That's why
            Greentek brings solar, heat pumps, and energy storage together with
            expert construction and renovation both residential and commercial,
            so everything gets handled by one accredited team, properly, from
            day one.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row px-2 gap-4 md:gap-8 justify-center items-center max-w-7xl mx-auto mt-10">
        <Link
          href="/energy-solutions"
          className="group relative bg-[url('/images/verticals/energy.avif')] rounded-xl bg-center bg-cover border-8 border-white w-full sm:w-1/2 overflow-hidden"
        >
          <div className="bg-linear-to-b from-transparent from-45% to-[#111827] to-100% px-4 py-5 h-64 sm:h-80 flex flex-col justify-end text-white">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-[#c5eb02] transition-colors">
              Energy Solutions
            </h3>
            <p className="text-md font-normal">
              Turnkey multi-measure energy upgrades, from Solar PV to
              high-efficiency thermal systems.{" "}
            </p>
          </div>
          <ArrowRight className="absolute top-3 right-3 h-10 w-10 inline ml-2 bg-white rounded-full px-1 py-1 text-black group-hover:bg-[#c5eb02] transition-colors" />
        </Link>
        <Link
          href="/home-solutions"
          className="group relative bg-[url('/images/verticals/home.jpeg')] rounded-xl overflow-hidden bg-center bg-cover border-8 border-white w-full sm:w-1/2 "
        >
          <div className="bg-linear-to-b from-transparent from-45% to-[#111827] to-100% px-4 py-5 h-64 sm:h-80 flex flex-col justify-end text-white">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-[#c5eb02] transition-colors">
              Home Solutions
            </h3>
            <p className="text-md font-normal">
              {" "}
              Primary contractor for renovations, extentions, and planned
              maintenance across residential and commercial properties.
            </p>
          </div>
          <ArrowRight className="absolute top-3 right-3 h-10 w-10 inline ml-2 bg-white rounded-full px-1 py-1 text-black group-hover:bg-[#c5eb02] transition-colors" />
        </Link>
      </div>
    </section>
  );
}

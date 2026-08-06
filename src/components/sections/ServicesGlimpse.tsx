"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
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

type ServiceItem = {
  id: string;
  title: string;
  desc: string;
  image: string;
};

const services: ServiceItem[] = [
  {
    id: "solar",
    title: "Solar PV & Battery Storage",
    desc: "We design and install solar and battery systems tailored for homes, helping homeowners generate their own power and cut electricity bills from day one..",
    image: "/images/projects/Examples/Solar Panel Installation.png",
  },
  {
    id: "heating",
    title: "Heating & Boiler Upgrades",
    desc: "We install and upgrade heat pumps and boiler systems for homes, helping homeowners move to efficient, low-carbon heating certified by Gas Safe engineers.",
    image: "/images/projects/heating-system.jpg",
  },
  {
    id: "insulation",
    title: "Insulation",
    desc: "We install loft and external wall insulation tailored for homes, helping homeowners stop losing heat and cut what they spend keeping the house warm.",
    image: "/images/projects/External Wall Insulation/after.jpg",
  },
  {
    id: "property",
    title: "Property Refurbishment & Extensions",
    desc: "We deliver refurbishments and extensions tailored for homes, helping homeowners add real space and upgrade their property to a professional standard.",
    image: "/images/projects/RIR/Mid RiR.jpeg",
  },
  {
    id: "commerical",
    title: "Commercial Planned Maintenance",
    desc: "We deliver refits and maintenance contracts tailored for businesses, helping commercial clients upgrade their premises and keep them running without disrepair.",
    image: "/images/projects/Shop Chimney/Post shop.jpeg",
  },
];

function ServicesAccordion() {
  const [active, setActive] = useState(0);
  const fade = useFadeIn(150);

  return (
    <div
      ref={fade.ref}
      className={`grid w-full grid-cols-1 items-stretch gap-10 transition-all duration-700 ease-out md:grid-cols-2 md:gap-16 ${
        fade.visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="flex flex-col justify-center px-5">
        {services.map((s, i) => {
          const isActive = i === active;
          return (
            <div key={s.id}>
              <button
                onClick={() => setActive(i)}
                className="w-full py-5 text-left my-4"
              >
                <span
                  className={`text-xl md:text-2xl font-semibold transition-colors text-white/90`}
                >
                  {s.title}
                </span>
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
                  style={{
                    maxHeight: isActive ? 160 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  <p className="mt-3 text-md md:text-lg leading-relaxed text-white/50">
                    {s.desc}
                  </p>
                </div>
              </button>

              <div
                className={`h-[1.5px] w-full transition-colors duration-300 ${
                  isActive ? "bg-[#c5eb02]" : "bg-white/10"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* RIGHT: image panel */}
      <div className="relative min-h-[320px] w-full overflow-hidden rounded-xl md:min-h-[560px]">
        {services.map((s, i) => (
          <Image
            key={s.id}
            src={s.image}
            alt={s.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover transition-opacity duration-500 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

export default function ServicesGlimpse() {
  const headerFade = useFadeIn(0);

  return (
    <section className=" py-12 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Centered heading block */}
        <div
          ref={headerFade.ref}
          className={`text-center max-w-4xl mx-auto mb-16 md:mb-20 transition-all duration-700 ease-out ${
            headerFade.visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-[10px] md:text-[16px] font-semibold uppercase  mb-6 bg-[#28282C] text-[#c5eb02] rounded-2xl px-3 py-1 w-fit mx-auto">
            Our Services
          </p>
          <h2 className="text-[1.625rem] md:text-[2.5rem] font-bold leading-[1.2] tracking-tight text-white">
            Eenergy. Built. Maintained.
          </h2>
          <p className="mt-4 text-md md:text-xl text-white/80 leading-relaxed text-center w-full md:w-3/4 mx-auto font-normal">
            From solar and heating to refurbishments and extensions, we design,
            install and maintain it all. One team, start to finish, instead of a
            different contractor for every job.
          </p>
        </div>

        {/* Full-width services accordion, under the button */}
        <ServicesAccordion />
      </div>
      <div className="mt-16 flex justify-center items-center">
        <a
          href="/services"
          className="w-fit rounded px-4 py-3 text-sm md:text-[18px] font-semibold text-black backdrop-blur-sm transition active:scale-95 bg-[#c5eb02]"
        >
          View All Services{" "}
          <ArrowRight className="inline ml-2 bg-black rounded px-1 py-1 text-white" />
        </a>
      </div>
    </section>
  );
}

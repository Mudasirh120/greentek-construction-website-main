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
    id: "residential",
    title: "Residential Solar Installation",
    desc: "We design and install high-efficiency solar panel systems tailored for homes, helping homeowners reduce electricity bills and generate clean, renewable energy.",
    image: "/images/services-glimpse/house.avif",
  },
  {
    id: "commercial",
    title: "Commercial Solar Systems",
    desc: "Scaled solar installations engineered for businesses, warehouses, and campuses built to cut operating costs and meet sustainability targets.",
    image: "/images/services-glimpse/supermarket.jpg",
  },
  {
    id: "storage",
    title: "Energy Storage Solutions",
    desc: "Battery systems that bank excess solar power on-site, keeping your home or business running through outages and after dark.",
    image: "/images/services-glimpse/ev.jpg",
  },
  {
    id: "ev",
    title: "EV Charging Integration",
    desc: "Home and workplace EV chargers wired directly into your solar system, so you fuel up on power you generate yourself.",
    image: "/images/services-glimpse/car.png",
  },
  {
    id: "maintenance",
    title: "Solar Maintenance & Monitoring",
    desc: "Ongoing inspections and real-time performance monitoring to keep every panel operating at peak efficiency, year after year.",
    image: "/images/services-glimpse/roof.jpg",
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
          <p className="text-[10px] md:text-[16px] font-semibold uppercase tracking-[0.3em] mb-6 bg-[#28282C] text-[#c5eb02] rounded-2xl px-3 py-1 w-fit mx-auto">
            Integrated Energy
          </p>
          <h2 className="text-[1.625rem] md:text-[2.5rem] font-bold leading-[1.2] tracking-tight text-white">
            One Intelligent Energy Ecosystem
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/80 leading-relaxed text-center w-0/2 md:w-3/4 mx-auto font-normal">
            Generate, store, monitor, and manage your energy through a connected
            system designed to maximize efficiency and long-term savings.
          </p>
          <div className="my-12">
            <a
              href="/contact"
              className="w-fit rounded px-4 py-3 text-sm md:text-[18px] font-semibold text-black backdrop-blur-sm transition active:scale-95 bg-[#c5eb02]"
            >
              Consult an Expert{" "}
              <ArrowRight className="inline ml-2 bg-black rounded px-1 py-1 text-white" />
            </a>
          </div>
        </div>

        {/* Full-width services accordion, under the button */}
        <ServicesAccordion />
      </div>
    </section>
  );
}

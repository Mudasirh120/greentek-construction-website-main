"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import { ArrowRight, MoveHorizontal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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

type Project = {
  category: string;
  title: string;
  description: string;
  before: string;
  after: string;
};

function BeforeAfterCard({
  project,
  delay,
}: {
  project: Project;
  delay: number;
}) {
  const cardFade = useFadeIn(delay);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const draggingRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const updatePosFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    updatePosFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updatePosFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  return (
    <div
      ref={cardFade.ref}
      className={`transition-all duration-700 ease-out ${
        cardFade.visible
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0"
      }`}
    >
      {/* Before/After slider image */}
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden border-8 border-white w-full h-100 select-none touch-none cursor-ew-resize"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* After image (base layer) */}
        <img
          src={project.after}
          alt={`${project.title} — after`}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover bg-center pointer-events-none"
        />

        {/* Before image (clipped to slider position) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={project.before}
            alt={`${project.title} — before`}
            draggable={false}
            className="h-full object-cover max-w-none"
            style={{ width: containerWidth || "100%" }}
          />
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 bg-[#28282C] text-[#c5eb02] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full pointer-events-none">
          Before
        </span>
        <span className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white flex items-center justify-center pointer-events-none">
          <ArrowRight className="h-5 w-5 text-black" />
        </span>

        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center">
            <MoveHorizontal className="h-4 w-4 text-black" />
          </div>
        </div>
      </div>

      {/* Text below image */}
      <div className="pt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3 bg-[#28282C] text-[#c5eb02] rounded-xl px-3 py-1 w-fit">
          {project.category}
        </p>
        <h3 className="text-xl font-semibold mb-2 text-white">
          {project.title}
        </h3>
        <p className="text-md font-normal text-white/80">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 ">
        {/* Projects Header - Centered */}
        <section className="relative bg-[url('/images/footer/footer-bg.webp')] bg-cover overflow-hidden">
          <div className="bg-black/60 pt-30 py-20">
            <h1 className="text-[2rem] md:text-[3.5rem] font-extrabold leading-[1.15] text-white mx-auto text-center">
              Our <span className="text-[#C5EB02]">Project Gallery</span>
            </h1>
            <p className="mt-6 text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-medium">
              Explore our track record of excellence across the UK, featuring
              high-impact renewable energy installations and premium
              construction projects.
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-24 ">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {siteConfig.projects.map((project, index) => (
                <BeforeAfterCard
                  key={project.title}
                  project={project}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

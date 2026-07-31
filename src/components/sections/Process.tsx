"use client";

import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "STEP 1",
    title: "Free Survey",
    body: "Book online or call. A Greentek specialist visits your property to assess your solar, heating, insulation, or renovation needs.",
  },
  {
    number: "STEP 2",
    title: "Custom Quote",
    body: "Get a clear, fixed-price quote with material and brand options, and an honest timeline, no hidden fees.",
  },
  {
    number: "STEP 3",
    title: "Expert Installation",
    body: "Our in-house accredited team carries out the work, solar, heat pump, insulation, or renovation, no subcontractors passing the job around.",
  },
  {
    number: "STEP 4",
    title: "Handover & Warranty",
    body: "We walk you through everything on completion, clean up after ourselves, and hand over your written warranty.",
  },
];

export default function Process() {
  return (
    <section className="bg-black py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
          {/* Left: headline + CTA */}
          <div className="flex flex-col justify-start">
            <p className="text-[10px] md:text-[16px] font-semibold uppercase tracking-[0.3em mb-6 bg-[#28282C] text-[#c5eb02] rounded-2xl px-3 py-1 w-fit ">
              Our Process
            </p>
            <h2 className="text-[1.625rem] md:text-[2.5rem] font-bold leading-[1.2] tracking-tight text-white">
              Four Steps. <br />
              Zero Surprises.
            </h2>
            <p className="mt-4 text-lg md:text-xl text-white/80 leading-relaxed w-0/2 md:w-3/4 font-normal">
              From the first call to the final handover — a clear, transparent
              process designed to deliver solar, home improvement, and
              renovation work with zero hassle.
            </p>

            <div className="mt-12 mb-12">
              <a
                href="/contact"
                className="w-fit rounded px-4 py-3 text-sm md:text-[18px] font-semibold text-black backdrop-blur-sm transition active:scale-95 bg-[#c5eb02]"
              >
                Consult an Expert{" "}
                <ArrowRight className="inline ml-2 bg-black rounded px-1 py-1 text-white" />
              </a>
            </div>
          </div>

          {/* Right: stacked step cards */}
          <div className="flex flex-col gap-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
              >
                <span className="inline-block bg-[#c5eb02] text-black text-[10px] font-black uppercase tracking-wider rounded-full px-3 py-1 mb-4">
                  {step.number}
                </span>
                <h3 className="text-white text-lg sm:text-xl font-black uppercase tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-white/85 text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

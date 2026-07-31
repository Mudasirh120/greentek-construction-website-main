import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BlogFilterClient } from "./BlogFilter";

export const metadata: Metadata = {
  title: "Energy Saving & Home Improvement Insights | Greentek Blog",
  description: "Practical advice from Greentek on solar PV, air source heat pumps, insulation, property refurbishment, and energy-efficient living. Get expert tips to reduce your energy bills.",
  keywords: [
    "energy saving tips",
    "energy efficiency",
    "solar PV installation",
    "air source heat pump",
    "home insulation",
    "property refurbishment",
    "reduce energy bills",
    "energy blog",
    "renewable energy",
    "West Midlands",
    "Wales",
  ],
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-white">
        {/* Hero Section - Compact */}
        <section className="bg-gradient-to-br from-zinc-900 to-zinc-800 py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
          <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
            <span className="inline-block mb-3 text-green-400 text-[13px] md:text-sm font-bold uppercase tracking-widest">
              Energy & Home Insights
            </span>
            <h1 className="text-[2rem] md:text-[3.5rem] font-extrabold leading-[1.15] text-white mb-4">
              Energy Saving &amp; <span className="text-green-400">Home Improvement</span> Tips
            </h1>
            <p className="text-[15px] md:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Expert insights on solar PV, heat pumps, insulation, and energy-efficient living for your home.
            </p>
          </div>
        </section>

        <BlogFilterClient />
      </main>

      <Footer />
    </div>
  );
}

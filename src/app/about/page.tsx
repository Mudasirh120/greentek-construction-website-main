import type { Metadata } from "next";
import { withSeoOverride } from "@/lib/seo";
import AboutPageClient from "./AboutPageClient";

export function generateMetadata(): Metadata {
  return withSeoOverride("/about", {
    title: "About Us",
    description:
      "Greentek is an agile, multi-disciplinary construction and energy firm delivering solar, heat pump, insulation, and renovation projects across the West Midlands and Wales.",
  });
}

export default function AboutPage() {
  return <AboutPageClient />;
}

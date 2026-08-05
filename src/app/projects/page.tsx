import type { Metadata } from "next";
import { withSeoOverride } from "@/lib/seo";
import ProjectsPageClient from "./ProjectsPageClient";

export function generateMetadata(): Metadata {
  return withSeoOverride("/projects", {
    title: "Our Project Gallery",
    description:
      "Explore Greentek's track record of solar PV, heat pump, insulation, and construction projects across the West Midlands and Wales.",
  });
}

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}

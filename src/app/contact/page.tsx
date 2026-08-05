import type { Metadata } from "next";
import { withSeoOverride } from "@/lib/seo";
import ContactPageClient from "./ContactPageClient";

export function generateMetadata(): Metadata {
  return withSeoOverride("/contact", {
    title: "Contact Us",
    description:
      "Get in touch with Greentek for a free quote on solar PV, heating, insulation, or renovation work across the West Midlands and Wales.",
  });
}

export default function ContactPage() {
  return <ContactPageClient />;
}

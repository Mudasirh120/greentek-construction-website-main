"use server";

import { redirect } from "next/navigation";
import { getCurrentSiteConfig, saveSiteConfig } from "@/lib/cms";

function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function splitCommas(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function saveServiceAction(formData: FormData): Promise<void> {
  const slug = String(formData.get("slug") || "");
  const title = String(formData.get("title") || "").trim();
  const shortName = String(formData.get("shortName") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const formCategory = String(formData.get("formCategory") || "").trim();
  const highlights = splitLines(String(formData.get("highlights") || ""));

  const current = getCurrentSiteConfig();
  const next = {
    ...current,
    services: current.services.map((s) =>
      s.slug === slug
        ? { ...s, title, shortName, description, image, formCategory, highlights }
        : s,
    ),
  };

  try {
    await saveSiteConfig(next, `Update service: ${title}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    redirect(`/admin/services?error=${encodeURIComponent(message)}`);
  }

  redirect("/admin/services?saved=1");
}

export async function saveProjectAction(formData: FormData): Promise<void> {
  const slug = String(formData.get("slug") || "");
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const before = String(formData.get("before") || "").trim();
  const after = String(formData.get("after") || "").trim();
  const gallery = splitLines(String(formData.get("gallery") || ""));
  const overview = splitLines(String(formData.get("overview") || ""));

  const current = getCurrentSiteConfig();
  const next = {
    ...current,
    projects: current.projects.map((p) =>
      p.slug === slug
        ? {
            ...p,
            title,
            category,
            service,
            description,
            before,
            after,
            ...(gallery.length ? { gallery } : { gallery: undefined }),
            ...(overview.length ? { overview } : { overview: undefined }),
          }
        : p,
    ),
  };

  try {
    await saveSiteConfig(next, `Update project: ${title}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    redirect(`/admin/projects?error=${encodeURIComponent(message)}`);
  }

  redirect("/admin/projects?saved=1");
}

export async function saveLocationAction(formData: FormData): Promise<void> {
  const slug = String(formData.get("slug") || "");
  const name = String(formData.get("name") || "").trim();
  const region = String(formData.get("region") || "").trim();
  const image = String(formData.get("image") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  const blurb = String(formData.get("blurb") || "").trim();
  const nearbyAreas = splitCommas(String(formData.get("nearbyAreas") || ""));
  const isHomeBase = formData.get("isHomeBase") === "on";

  const current = getCurrentSiteConfig();
  const next = {
    ...current,
    locations: current.locations.map((l) =>
      l.slug === slug
        ? { ...l, name, region, image, tagline, blurb, nearbyAreas, isHomeBase }
        : l,
    ),
  };

  try {
    await saveSiteConfig(next, `Update location: ${name}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    redirect(`/admin/locations?error=${encodeURIComponent(message)}`);
  }

  redirect("/admin/locations?saved=1");
}

export async function saveSettingsAction(formData: FormData): Promise<void> {
  const current = getCurrentSiteConfig();

  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const addressLine1 = String(formData.get("addressLine1") || "").trim();
  const addressCity = String(formData.get("addressCity") || "").trim();
  const addressRegion = String(formData.get("addressRegion") || "").trim();
  const addressPostcode = String(formData.get("addressPostcode") || "").trim();
  const companyNo = String(formData.get("companyNo") || "").trim();
  const facebook = String(formData.get("facebook") || "").trim();
  const instagram = String(formData.get("instagram") || "").trim();
  const linkedin = String(formData.get("linkedin") || "").trim();
  const description = String(formData.get("description") || "").trim();

  // Format: "value | label" per line
  const stats = splitLines(String(formData.get("stats") || ""))
    .map((line) => {
      const [value, label] = line.split("|").map((s) => s.trim());
      return { value: value || "", label: label || "" };
    })
    .filter((s) => s.value && s.label);

  // Format: "title | description" per line
  const whyChooseUs = splitLines(String(formData.get("whyChooseUs") || ""))
    .map((line) => {
      const [title, desc] = line.split("|").map((s) => s.trim());
      return { title: title || "", description: desc || "" };
    })
    .filter((w) => w.title && w.description);

  const next = {
    ...current,
    phone,
    email,
    description,
    companyNo,
    address: {
      ...current.address,
      line1: addressLine1,
      city: addressCity,
      region: addressRegion,
      postcode: addressPostcode,
    },
    social: { facebook, instagram, linkedin },
    ...(stats.length ? { stats } : {}),
    ...(whyChooseUs.length ? { whyChooseUs } : {}),
  };

  try {
    await saveSiteConfig(next, "Update company settings");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    redirect(`/admin/settings?error=${encodeURIComponent(message)}`);
  }

  redirect("/admin/settings?saved=1");
}

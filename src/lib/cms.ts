import { commitFile } from "./github";
import siteData from "@/data/site.json";
import blogsData from "@/data/blogs.json";
import seoOverridesData from "@/data/seo.json";
import type { SiteConfig } from "@/data/site";
import type { BlogPost } from "@/data/blogs";
import type { SeoOverrides } from "@/lib/seo";

function stringifyJson(data: unknown): string {
  return JSON.stringify(data, null, 2) + "\n";
}

/** Current data as of the last deploy — the only source of truth between admin saves. */
export function getCurrentSiteConfig(): SiteConfig {
  return siteData as SiteConfig;
}

export function getCurrentBlogPosts(): BlogPost[] {
  return blogsData as BlogPost[];
}

export function getCurrentSeoOverrides(): SeoOverrides {
  return seoOverridesData as SeoOverrides;
}

export async function saveSiteConfig(next: SiteConfig, message: string): Promise<void> {
  await commitFile("src/data/site.json", stringifyJson(next), message);
}

export async function saveBlogPosts(next: BlogPost[], message: string): Promise<void> {
  await commitFile("src/data/blogs.json", stringifyJson(next), message);
}

export async function saveSeoOverrides(next: SeoOverrides, message: string): Promise<void> {
  await commitFile("src/data/seo.json", stringifyJson(next), message);
}

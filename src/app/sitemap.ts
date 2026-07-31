import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.greentekenergy.co.uk";

  const routes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const sitemapRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "" ? 1 : route === "/blog" ? 0.9 : 0.8,
  }));

  // Add blog posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...sitemapRoutes, ...blogRoutes];
}
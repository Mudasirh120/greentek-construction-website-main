"use server";

import { redirect } from "next/navigation";
import { getCurrentBlogPosts, saveBlogPosts } from "@/lib/cms";
import type { BlogPost } from "@/data/blogs";

function parseContentBlocks(formData: FormData): BlogPost["content"] {
  const types = formData.getAll("block_type") as string[];
  const texts = formData.getAll("block_text") as string[];
  const itemsRaw = formData.getAll("block_items") as string[];
  const ctaTexts = formData.getAll("block_ctaText") as string[];
  const ctaLinks = formData.getAll("block_ctaLink") as string[];

  return types.map((type, i) => {
    const block: BlogPost["content"][number] = {
      type: type as BlogPost["content"][number]["type"],
    };
    if (texts[i]) block.text = texts[i];
    if (type === "list" && itemsRaw[i]) {
      block.items = itemsRaw[i]
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (type === "cta") {
      if (ctaTexts[i]) block.ctaText = ctaTexts[i];
      if (ctaLinks[i]) block.ctaLink = ctaLinks[i];
    }
    return block;
  });
}

export async function saveBlogPostAction(formData: FormData): Promise<void> {
  const originalSlug = String(formData.get("originalSlug") || "");
  const isNew = !originalSlug;
  const editingPath = isNew ? "/admin/blog/new" : `/admin/blog/${originalSlug}`;

  const slug = String(formData.get("slug") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const date = String(formData.get("date") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const coverImage = String(formData.get("coverImage") || "").trim();
  const coverImageAlt = String(formData.get("coverImageAlt") || "").trim();
  const instagramUrl = String(formData.get("instagramUrl") || "").trim();
  const metaTitle = String(formData.get("metaTitle") || "").trim();
  const metaDescription = String(formData.get("metaDescription") || "").trim();
  const keywords = String(formData.get("keywords") || "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  if (!slug || !title) {
    redirect(
      `${editingPath}?error=${encodeURIComponent("Title and slug are required")}`,
    );
  }

  const current = getCurrentBlogPosts();

  if (!isNew && !current.some((p) => p.slug === originalSlug)) {
    redirect(`/admin/blog?error=${encodeURIComponent("Original post not found")}`);
  }

  if ((isNew || slug !== originalSlug) && current.some((p) => p.slug === slug)) {
    redirect(
      `${editingPath}?error=${encodeURIComponent("A post with that slug already exists")}`,
    );
  }

  const nextId = isNew
    ? Math.max(0, ...current.map((p) => p.id)) + 1
    : current.find((p) => p.slug === originalSlug)!.id;

  const updatedPost: BlogPost = {
    id: nextId,
    title,
    slug,
    excerpt,
    date,
    category,
    coverImage,
    coverImageAlt,
    ...(instagramUrl ? { instagramUrl } : {}),
    metaTitle,
    metaDescription,
    keywords,
    content: parseContentBlocks(formData),
  };

  const next = isNew
    ? [...current, updatedPost]
    : current.map((p) => (p.slug === originalSlug ? updatedPost : p));

  try {
    await saveBlogPosts(
      next,
      isNew ? `Add blog post: ${title}` : `Update blog post: ${title}`,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    redirect(`${editingPath}?error=${encodeURIComponent(message)}`);
  }

  redirect(`/admin/blog/${slug}?saved=1`);
}

export async function deleteBlogPostAction(formData: FormData): Promise<void> {
  const slug = String(formData.get("slug") || "");
  const current = getCurrentBlogPosts();
  const next = current.filter((p) => p.slug !== slug);

  try {
    await saveBlogPosts(next, `Delete blog post: ${slug}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    redirect(`/admin/blog?error=${encodeURIComponent(message)}`);
  }

  redirect("/admin/blog?deleted=1");
}

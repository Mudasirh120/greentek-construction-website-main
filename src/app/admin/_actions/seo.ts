"use server";

import { redirect } from "next/navigation";
import { getCurrentSeoOverrides, saveSeoOverrides } from "@/lib/cms";

export async function saveSeoOverrideAction(formData: FormData): Promise<void> {
  const path = String(formData.get("path") || "");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();

  if (!path) {
    redirect("/admin/seo");
  }

  const current = getCurrentSeoOverrides();
  const next = { ...current };

  if (!title && !description) {
    delete next[path];
  } else {
    next[path] = {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
    };
  }

  try {
    await saveSeoOverrides(next, `Update SEO meta for ${path}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    redirect(
      `/admin/seo/edit?path=${encodeURIComponent(path)}&error=${encodeURIComponent(message)}`,
    );
  }

  redirect(`/admin/seo/edit?path=${encodeURIComponent(path)}&saved=1`);
}

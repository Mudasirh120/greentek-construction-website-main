import { getCurrentSiteConfig } from "@/lib/cms";
import { saveProjectAction } from "../../_actions/content";
import SaveBanner from "../../_components/SaveBanner";

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function ProjectsAdminPage({ searchParams }: Props) {
  const params = await searchParams;
  const config = getCurrentSiteConfig();
  const { projects, services } = config;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Projects</h1>
      <p className="text-zinc-500 mb-6 text-sm">
        Edit each project&apos;s before/after images, description, and gallery.
      </p>

      <SaveBanner saved={params.saved === "1"} error={params.error} />

      <div className="space-y-3">
        {projects.map((project) => (
          <details
            key={project.slug}
            className="bg-white border border-zinc-200 rounded-xl overflow-hidden"
          >
            <summary className="cursor-pointer px-5 py-4 font-semibold text-zinc-900 hover:bg-zinc-50">
              {project.title}
            </summary>
            <form action={saveProjectAction} className="px-5 pb-5 pt-2 space-y-4">
              <input type="hidden" name="slug" value={project.slug} />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">
                    Title
                  </label>
                  <input
                    name="title"
                    defaultValue={project.title}
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">
                    Category
                  </label>
                  <input
                    name="category"
                    defaultValue={project.category}
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Related Service
                </label>
                <select
                  name="service"
                  defaultValue={project.service}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                >
                  <option value="">— None —</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={project.description}
                  rows={2}
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">
                    Before Image Path
                  </label>
                  <input
                    name="before"
                    defaultValue={project.before}
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">
                    After Image Path
                  </label>
                  <input
                    name="after"
                    defaultValue={project.after}
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Overview Paragraphs (one per line)
                </label>
                <textarea
                  name="overview"
                  defaultValue={project.overview?.join("\n")}
                  rows={3}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Extra Gallery Image Paths (one per line)
                </label>
                <textarea
                  name="gallery"
                  defaultValue={project.gallery?.join("\n")}
                  rows={2}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-zinc-900 text-white text-sm font-semibold px-5 py-2.5 hover:bg-zinc-800"
              >
                Save
              </button>
            </form>
          </details>
        ))}
      </div>
    </div>
  );
}

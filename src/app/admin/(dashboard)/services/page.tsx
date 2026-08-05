import { getCurrentSiteConfig } from "@/lib/cms";
import { saveServiceAction } from "../../_actions/content";
import SaveBanner from "../../_components/SaveBanner";

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

const FORM_CATEGORIES = [
  "solar_storage",
  "heating_boiler",
  "insulation",
  "refurb_extension",
  "commercial",
];

export default async function ServicesAdminPage({ searchParams }: Props) {
  const params = await searchParams;
  const services = getCurrentSiteConfig().services;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Services</h1>
      <p className="text-zinc-500 mb-6 text-sm">
        Edit the copy, image, and highlights shown on each service page.
      </p>

      <SaveBanner saved={params.saved === "1"} error={params.error} />

      <div className="space-y-3">
        {services.map((service) => (
          <details
            key={service.slug}
            className="bg-white border border-zinc-200 rounded-xl overflow-hidden"
          >
            <summary className="cursor-pointer px-5 py-4 font-semibold text-zinc-900 hover:bg-zinc-50">
              {service.title}
            </summary>
            <form action={saveServiceAction} className="px-5 pb-5 pt-2 space-y-4">
              <input type="hidden" name="slug" value={service.slug} />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">
                    Title
                  </label>
                  <input
                    name="title"
                    defaultValue={service.title}
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">
                    Short Name (used in headlines & CTAs)
                  </label>
                  <input
                    name="shortName"
                    defaultValue={service.shortName}
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={service.description}
                  rows={2}
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">
                    Image Path
                  </label>
                  <input
                    name="image"
                    defaultValue={service.image}
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">
                    Quote Form Category
                  </label>
                  <select
                    name="formCategory"
                    defaultValue={service.formCategory}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                  >
                    {FORM_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Highlights (one per line)
                </label>
                <textarea
                  name="highlights"
                  defaultValue={service.highlights.join("\n")}
                  rows={4}
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

import { getCurrentSiteConfig } from "@/lib/cms";
import { saveLocationAction } from "../../_actions/content";
import SaveBanner from "../../_components/SaveBanner";

interface Props {
  searchParams: Promise<{ saved?: string; error?: string }>;
}

export default async function LocationsAdminPage({ searchParams }: Props) {
  const params = await searchParams;
  const locations = getCurrentSiteConfig().locations;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Locations</h1>
      <p className="text-zinc-500 mb-6 text-sm">
        Edit the areas Greentek covers and the copy shown on each location
        page.
      </p>

      <SaveBanner saved={params.saved === "1"} error={params.error} />

      <div className="space-y-3">
        {locations.map((location) => (
          <details
            key={location.slug}
            className="bg-white border border-zinc-200 rounded-xl overflow-hidden"
          >
            <summary className="cursor-pointer px-5 py-4 font-semibold text-zinc-900 hover:bg-zinc-50">
              {location.name}
            </summary>
            <form action={saveLocationAction} className="px-5 pb-5 pt-2 space-y-4">
              <input type="hidden" name="slug" value={location.slug} />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">
                    Name
                  </label>
                  <input
                    name="name"
                    defaultValue={location.name}
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">
                    Region
                  </label>
                  <input
                    name="region"
                    defaultValue={location.region}
                    required
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Image Path
                </label>
                <input
                  name="image"
                  defaultValue={location.image}
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Tagline
                </label>
                <input
                  name="tagline"
                  defaultValue={location.tagline}
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Blurb
                </label>
                <textarea
                  name="blurb"
                  defaultValue={location.blurb}
                  rows={3}
                  required
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-1">
                  Nearby Areas (comma-separated)
                </label>
                <input
                  name="nearbyAreas"
                  defaultValue={location.nearbyAreas.join(", ")}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  name="isHomeBase"
                  defaultChecked={location.isHomeBase}
                  className="rounded border-zinc-300"
                />
                This is the home base location
              </label>
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

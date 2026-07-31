"use client";

// Placeholder data — replace image paths with real project photos,
// and confirm/replace the placeholder stats below with real figures
// before shipping. Anything marked "XX" is a placeholder, not a real number.

const majorAreas = [
  {
    name: "Solihull, Birmingham",
    stat: "Our Home Base Since 2020",
    note: "Same-week surveys across the wider Birmingham metro area.",
    image: "/images/areas/solihull.jpg",
    size: "large" as const,
  },
  {
    name: "Wolverhampton",
    stat: "XX projects completed",
    image: "/images/areas/wolverhampton.jpg",
    size: "small" as const,
  },
  {
    name: "Cardiff",
    stat: "XX projects completed",
    image: "/images/areas/cardiff.jpg",
    size: "small" as const,
  },
  {
    name: "Coventry",
    stat: "XX projects completed",
    image: "/images/areas/coventry.jpg",
    size: "small" as const,
  },
  {
    name: "Swansea",
    stat: "XX projects completed",
    image: "/images/areas/swansea.jpg",
    size: "small" as const,
  },
  {
    name: "Dudley",
    stat: "XX projects completed",
    image: "/images/areas/dudley.jpg",
    size: "small" as const,
  },
];

const moreAreas = [
  "West Bromwich",
  "Sandwell",
  "Sutton Coldfield",
  "Telford",
  "Kidderminster",
  "Bromsgrove",
  "Redditch",
  "Stourbridge",
  "Halesowen",
  "Smethwick",
  "Newport",
  "Bridgend",
  "Neath",
  "Wrexham",
  "Merthyr Tydfil",
  "Port Talbot",
];

export default function Areas() {
  const largeArea = majorAreas.find((a) => a.size === "large")!;
  const smallAreas = majorAreas.filter((a) => a.size === "small");

  // Duplicate the list so the marquee loops seamlessly
  const tickerItems = [...moreAreas, ...moreAreas];

  return (
    <section className="py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] font-black uppercase leading-tight tracking-tight text-white">
              Crews Local to Your Area.
            </h2>
            <p className="text-white/85 text-sm sm:text-base mt-3">
              Greentek is in-house, not a subcontracted franchise. Our team
              lives and works in the towns we serve.
            </p>
          </div>

          {/* Postcode check — visual only, not wired up */}
          <div className="flex-shrink-0">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 mb-2">
              Check Coverage
            </p>
            <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-full p-1.5 shadow-sm w-full sm:w-80">
              <svg
                className="w-4 h-4 text-zinc-400 ml-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Enter your postcode"
                disabled
                className="flex-1 bg-transparent outline-none text-sm text-zinc-500 placeholder:text-zinc-400 cursor-not-allowed"
              />
              <button
                type="button"
                disabled
                className="flex-shrink-0 bg-[#C5EB02] text-black text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-full opacity-70 cursor-not-allowed"
              >
                Check
              </button>
            </div>
          </div>
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large tile — home base */}
          <div className="lg:row-span-2 lg:col-span-2 relative rounded-2xl overflow-hidden min-h-[280px] lg:min-h-0">
            <img
              src={largeArea.image}
              alt={largeArea.name}
              className="absolute inset-0 w-full h-full object-cover position-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-tight">
                {largeArea.name}
              </h3>
              <p className="text-white/90 text-sm font-semibold mt-1">
                {largeArea.stat}
              </p>
              {largeArea.note && (
                <p className="text-white/70 text-xs mt-2 max-w-md">
                  {largeArea.note}
                </p>
              )}
            </div>
          </div>

          {/* Small tiles */}
          {smallAreas.map((area) => (
            <div
              key={area.name}
              className="relative rounded-2xl overflow-hidden min-h-[160px]"
            >
              <img
                src={area.image}
                alt={area.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from- 20% from-black/75 via-black/10 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-4">
                <h4 className="text-white text-lg font-black uppercase tracking-tight">
                  {area.name}
                </h4>
                <p className="text-white/85 text-xs font-semibold mt-0.5">
                  {area.stat}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee ticker */}
        <div className="mt-4 relative flex items-center bg-zinc-900 rounded-2xl overflow-hidden h-16">
          <div className="flex-shrink-0 z-10 h-full flex flex-col justify-center px-6 bg-zinc-900">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-400">
              Plus
            </p>
            <p className="text-white text-sm font-black uppercase tracking-tight leading-none whitespace-nowrap">
              XX More Areas
            </p>
          </div>

          <div className="relative flex-1 overflow-hidden h-full">
            <div className="absolute inset-0 flex items-center animate-marquee whitespace-nowrap">
              {tickerItems.map((city, i) => (
                <span
                  key={`${city}-${i}`}
                  className="flex items-center text-white/80 text-sm font-semibold px-4"
                >
                  {city}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5EB02] ml-4" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}

import Link from "next/link";
import { logoutAction } from "../_actions/auth";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/seo", label: "Page SEO" },
  { href: "/admin/blog", label: "Blog Posts" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/locations", label: "Locations" },
  { href: "/admin/settings", label: "Company Settings" },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex">
      <aside className="w-64 shrink-0 bg-white border-r border-zinc-200 flex flex-col">
        <div className="px-5 py-5 border-b border-zinc-200">
          <p className="font-bold text-lg">Greentek Admin</p>
          <p className="text-xs text-zinc-500">Content management</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-zinc-200">
          <Link
            href="/"
            target="_blank"
            className="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
          >
            View Live Site ↗
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 min-w-0 px-6 py-8 md:px-10 md:py-10">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}

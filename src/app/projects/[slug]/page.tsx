import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = siteConfig.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Greentek Projects`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Greentek Projects`,
      description: project.description,
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return siteConfig.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = siteConfig.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const otherProjects = siteConfig.projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  const relatedService = siteConfig.services.find(
    (s) => s.slug === project.service,
  );

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 border-b border-[#c5eb02]">
          <div className="mx-auto max-w-4xl px-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[#c5eb02] font-bold text-sm mb-6 hover:text-[#c5eb02]/80"
            >
              ← All Projects
            </Link>
            <span className="inline-block bg-[#c5eb02] text-black text-xs font-bold px-4 py-2 rounded-full mb-6">
              {project.category}
            </span>
            <h1 className="text-[2rem] md:text-[3.5rem] font-extrabold leading-[1.15] text-white mb-6">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-medium max-w-3xl">
              {project.description}
            </p>
          </div>
        </section>

        {/* Before / After Slider */}
        <section className="py-12 lg:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <BeforeAfterSlider
              before={project.before}
              after={project.after}
              title={project.title}
              className="h-80 md:h-125"
            />
            <p className="text-center text-white/50 text-sm mt-4 font-medium">
              Drag the slider to compare before and after
            </p>

            {/* CTA */}
            <div className="mt-12 p-8 md:p-12 bg-white/5 rounded-xl border border-[#c5eb02]">
              {relatedService ? (
                <>
                  <span className="inline-block bg-[#c5eb02] text-black text-xs font-bold px-4 py-2 rounded-full mb-4">
                    {relatedService.title}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                    Want the same results?
                  </h3>
                  <p className="text-lg text-white/80 mb-8 font-medium">
                    This project was completed as part of our{" "}
                    {relatedService.title} service. Explore what&apos;s
                    included, or get a free quote for your own property.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/services/${relatedService.slug}`}
                      className="inline-flex items-center justify-center px-6 md:px-8 py-4 rounded-full bg-[#c5eb02] text-black text-sm font-bold hover:bg-[#c5eb02]/80 transition-all shadow-xl shadow-zinc-900/10"
                    >
                      Explore {relatedService.shortName} →
                    </Link>
                    <Link
                      href={`/services/${relatedService.slug}#quote`}
                      className="inline-flex items-center justify-center px-6 md:px-8 py-4 rounded-full border border-white/30 text-white text-sm font-bold hover:border-[#c5eb02] hover:text-[#c5eb02] transition-all"
                    >
                      Get a Free Quote
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                    Considering a similar project?
                  </h3>
                  <p className="text-lg text-white/80 mb-8 font-medium">
                    Get in touch for a free, no-obligation survey and quote
                    tailored to your property.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 md:px-8 py-4 rounded-full bg-[#c5eb02] text-black text-sm font-bold hover:bg-[#c5eb02]/80 transition-all shadow-xl shadow-zinc-900/10"
                  >
                    Get in Touch
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Other Projects */}
        <section className="py-12 lg:py-24 border-t border-[#c5eb02]">
          <div className="mx-auto max-w-4xl px-6">
            <h3 className="text-[1.25rem] md:text-[1.5rem] font-bold leading-[1.3] text-white mb-8">
              More Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((other) => (
                <Link
                  key={other.slug}
                  href={`/projects/${other.slug}`}
                  className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#c5eb02] hover:bg-white/10 transition-all"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] mb-3 bg-[#28282C] text-[#c5eb02] rounded-xl px-3 py-1 w-fit">
                    {other.category}
                  </p>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#c5eb02] transition-colors">
                    {other.title}
                  </h4>
                  <p className="text-white/70 text-sm mb-4">
                    {other.description}
                  </p>
                  <span className="text-[#c5eb02] font-bold text-sm">
                    View Project →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutPreview from "@/components/sections/AboutPreview";
import CorePillars from "@/components/sections/CorePillars";
import AccreditationsSection from "@/components/sections/AccreditationsSection";
import BrandsSection from "@/components/sections/BrandsSection";
import ProjectsGallerySection from "@/components/sections/ProjectsGallerySection";
import FAQSection from "@/components/sections/FAQSection";
import Testimonials from "@/components/sections/Testimonials";
import ServicesGlimpse from "@/components/sections/ServicesGlimpse";
import Verticals from "@/components/sections/Verticals";
import WhyUs from "@/components/sections/WhyUs";
import Stats from "@/components/sections/Stats";
import CtaSection from "@/components/sections/CtaSection";
import Areas from "@/components/sections/Areas";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1">
        <HeroSection />
        <Stats />
        <Verticals />
        <WhyUs />
        <AccreditationsSection />
        <ServicesGlimpse />
        <BrandsSection />
        <Process />
        <Projects />
        <CtaSection />
        <Testimonials />
        <Areas />
        <FAQSection />
      </div>

      <Footer />
    </div>
  );
}

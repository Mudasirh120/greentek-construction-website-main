import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutPreview from "@/components/sections/AboutPreview";
import CorePillars from "@/components/sections/CorePillars";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import AccreditationsSection from "@/components/sections/AccreditationsSection";
import BrandsSection from "@/components/sections/BrandsSection";
import ProjectsGallerySection from "@/components/sections/ProjectsGallerySection";
import FAQSection from "@/components/sections/FAQSection";
import ContactCTASection from "@/components/sections/ContactCTASection";
import OurVision from "@/components/sections/OurVision";
import Testimonials from "@/components/sections/Testimonials";
import ServicesGlimpse from "@/components/sections/ServicesGlimpse";
import Verticals from "@/components/sections/Verticals";
import WhyUs from "@/components/sections/WhyUs";
import Stats from "@/components/sections/Stats";
import CtaSection from "@/components/sections/CtaSection";
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
        <AboutPreview />
        <CorePillars />
        <WhyChooseUs />
        <BrandsSection />
        <ProjectsGallerySection />
        <FAQSection />
        <Testimonials />
        <ContactCTASection />
        <CtaSection />
      </div>

      <Footer />
    </div>
  );
}

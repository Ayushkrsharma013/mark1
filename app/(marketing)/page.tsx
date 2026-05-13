import { HeroSection } from "@/components/home/HeroSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <ProductsPreview />
      <Testimonials />
      <CTASection />
    </>
  );
}

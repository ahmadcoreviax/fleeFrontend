import BrandsSection from "./Components/Brands";
import FAQ from "./Components/FAQ";
import FeaturedCars from "./Components/FeaturedCars";
import Features from "./Components/Features";
import FinalCTABanner from "./Components/FinalCTA";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import HowItWorks from "./Components/HowItWorks";
import PricingPlans from "./Components/PricingPlan";
import Testimonials from "./Components/Testimonials";
import WhyChoose from "./Components/WhyChoose";

const { default: Header } = require("./Components/Header");

export default function Page() {
  return (
    <>
      <Header />

      <main className="pt-20">
        <Hero />
        <BrandsSection />
        <FeaturedCars />
        <WhyChoose />
        <HowItWorks />
        <Testimonials />
        <PricingPlans />
        <FAQ />
        <FinalCTABanner />
      </main>
      <Footer />
    </>
  );
}

import { ProductProvider } from "@/context/ProductContext";
import Header from "../../../components/Templates/Fashion/Header";
import Footer from "../../../components/Templates/Fashion/Footer";
import HeroSection from "../../../components/Templates/Fashion/HeroSection";
import CategoryGrid from "../../../components/Templates/Fashion/CategoryGrid";
import FeaturedProducts from "../../../components/Templates/Fashion/FeaturedProducts";
import TestimonialCarousel from "../../../components/Templates/Fashion/TestmonialCarousel";

const Index = () => (
  <ProductProvider>
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <TestimonialCarousel />
      </main>
      <Footer />
    </div>
  </ProductProvider>
);

export default Index;

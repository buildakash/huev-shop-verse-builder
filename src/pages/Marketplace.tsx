
import { useState } from "react";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { HeroSection } from "@/components/marketplace/HeroSection";
import { CategorySection } from "@/components/marketplace/CategorySection";
import { FeaturedDeals } from "@/components/marketplace/FeaturedDeals";
import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { FilterSidebar } from "@/components/marketplace/FilterSidebar";
import { AboutSection } from "@/components/marketplace/AboutSection";
import { TopSellingSection } from "@/components/marketplace/TopSellingSection";
import { NewsletterSection } from "@/components/marketplace/NewsletterSection";
import { MarketplaceFooter } from "@/components/marketplace/MarketplaceFooter";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    sortBy: "newest"
  });
  const [showProductGrid, setShowProductGrid] = useState(false);
  const navigate = useNavigate();

  const handleViewProduct = (id: string) => {
    if (id === 'all') {
      setShowProductGrid(true);
    } else {
      navigate(`/product/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {!showProductGrid ? (
        // Landing Page View
        <div className="space-y-0">
          <HeroSection onExploreProducts={() => setShowProductGrid(true)} />
          <CategorySection onCategorySelect={(category) => {
            setFilters(prev => ({ ...prev, category }));
            setShowProductGrid(true);
          }} />
          <FeaturedDeals onViewAllDeals={() => setShowProductGrid(true)} />
          <TopSellingSection onViewProduct={handleViewProduct} />
          <AboutSection />
          <NewsletterSection />
          <MarketplaceFooter />
        </div>
      ) : (
        // Product Grid View
        <>
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex gap-6">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden fixed bottom-4 right-4 z-50">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  className="rounded-full w-12 h-12 shadow-lg"
                >
                  <Filter className="w-5 h-5" />
                </Button>
              </div>

              {/* Filter Sidebar */}
              <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
                <FilterSidebar filters={filters} setFilters={setFilters} />
              </div>

              {/* Product Grid */}
              <div className="flex-1">
                <div className="mb-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowProductGrid(false)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    ← Back to Home
                  </Button>
                </div>
                <ProductGrid searchQuery={searchQuery} filters={filters} />
              </div>
            </div>
          </div>
          <MarketplaceFooter />
        </>
      )}
    </div>
  );
};

export default Marketplace;

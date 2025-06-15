
import { useState } from "react";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { FilterSidebar } from "@/components/marketplace/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
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
            <ProductGrid searchQuery={searchQuery} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;


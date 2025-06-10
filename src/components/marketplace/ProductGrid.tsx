
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductGridProps {
  searchQuery: string;
  filters: any;
}

export const ProductGrid = ({ searchQuery, filters }: ProductGridProps) => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.8,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "Electronics",
      store: "AudioTech Pro",
      freeShipping: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.6,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      category: "Electronics",
      store: "FitTech",
      freeShipping: true
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.4,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      category: "Electronics",
      store: "SoundWave",
      freeShipping: false
    },
    {
      id: 4,
      name: "Designer Backpack",
      price: 89.99,
      originalPrice: 120.00,
      rating: 4.7,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      category: "Fashion",
      store: "Urban Style",
      freeShipping: true
    },
    {
      id: 5,
      name: "Coffee Maker Pro",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.5,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
      category: "Home & Garden",
      store: "Kitchen Essentials",
      freeShipping: true
    },
    {
      id: 6,
      name: "Running Shoes",
      price: 129.99,
      originalPrice: 160.00,
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
      category: "Sports",
      store: "SportMax",
      freeShipping: true
    }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.store.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !filters.category || product.category === filters.category;
      
      const matchesPrice = (!filters.minPrice || product.price >= parseFloat(filters.minPrice)) &&
                          (!filters.maxPrice || product.price <= parseFloat(filters.maxPrice));
      
      const matchesRating = !filters.rating || product.rating >= parseFloat(filters.rating);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [searchQuery, filters, products]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (filters.sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "reviews":
        return sorted.sort((a, b) => b.reviews - a.reviews);
      default:
        return sorted;
    }
  }, [filteredProducts, filters.sortBy]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {sortedProducts.length} of {products.length} products
          {searchQuery && (
            <span> for "<span className="font-medium">{searchQuery}</span>"</span>
          )}
        </p>
        <Select value={filters.sortBy} onValueChange={(value) => filters.setFilters?.(prev => ({ ...prev, sortBy: value }))}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="reviews">Most Reviews</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} 
                  />
                </Button>
                {product.originalPrice > product.price && (
                  <Badge className="absolute top-2 left-2" variant="destructive">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
              
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {product.store}
                  </Badge>
                  {product.freeShipping && (
                    <Badge variant="secondary" className="text-xs">
                      Free Shipping
                    </Badge>
                  )}
                </div>
                
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};

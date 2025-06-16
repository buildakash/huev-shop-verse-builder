// src/components/marketplace/MarketplaceHeader.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
// 🔑 Correct import using your alias
import { CartDropdown } from "@/components/marketplace/CartDropdown";

interface MarketplaceHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const MarketplaceHeader = ({
  searchQuery,
  setSearchQuery,
}: MarketplaceHeaderProps) => {
  return (
    <header className="border-b border-border/40 backdrop-blur-lg bg-background/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">PA</span>
            </div>
            <span className="text-xl font-bold">Pocket Angadi</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Navigation & Cart */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" className="hidden md:flex">
                Sell on Huev
              </Button>
            </Link>

            {/* Cart dropdown */}
            <CartDropdown />

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="hidden md:flex items-center space-x-6 py-2 border-t border-border/40">
          {[
            "Electronics",
            "Fashion",
            "Home & Garden",
            "Sports",
            "Books",
            "Beauty",
          ].map((category) => (
            <button
              key={category}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
  
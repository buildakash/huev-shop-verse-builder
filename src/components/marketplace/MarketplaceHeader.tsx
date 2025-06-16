
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, Menu, MapPin, Gift } from "lucide-react";
import { Link } from "react-router-dom";
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
    <header className="border-b border-border/40 backdrop-blur-lg bg-background/95 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Deliver to New York 10001</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>Customer Service</span>
              <span>Sell</span>
              <span>Registry</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/marketplace" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">PA</span>
            </div>
            <span className="text-2xl font-bold">Pocket Angadi</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-3xl mx-8">
            <div className="flex">
              <select className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>All</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home</option>
                <option>Sports</option>
              </select>
              <div className="relative flex-1">
                <Input
                  placeholder="Search Pocket Angadi"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-none border-l-0 border-r-0 focus:ring-0 focus:border-gray-300"
                />
              </div>
              <Button className="rounded-l-none px-6">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex items-center space-x-1">
              <Gift className="h-4 w-4" />
              <span className="text-sm">Deals</span>
            </Button>

            <Link to="/dashboard">
              <Button variant="ghost" className="hidden md:flex text-sm">
                Sell on Pocket Angadi
              </Button>
            </Link>

            <Button variant="ghost" className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <div className="hidden md:block text-left">
                <div className="text-xs">Hello, Sign in</div>
                <div className="text-sm font-medium">Account & Lists</div>
              </div>
            </Button>

            <CartDropdown />

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-6 py-2 text-sm overflow-x-auto">
            <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-gray-700 whitespace-nowrap">
              <Menu className="h-4 w-4 mr-1" />
              All
            </Button>
            {[
              "Today's Deals",
              "Electronics",
              "Fashion",
              "Home & Garden",
              "Sports & Outdoors",
              "Books",
              "Beauty & Personal Care",
              "Toys & Games"
            ].map((category) => (
              <Button 
                key={category}
                variant="ghost" 
                size="sm" 
                className="text-white hover:text-white hover:bg-gray-700 whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

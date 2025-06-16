// src/components/marketplace/MarketplaceHeader.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  User,
  Menu,
  MapPin,
  Gift,
  ShoppingCart as CartIcon,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface MarketplaceHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const navigate = useNavigate();
  const { getMarketplaceItems } = useCart();

  // total quantity in cart
  const cartItems = getMarketplaceItems();
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/40">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
          <div className="flex items-center space-x-4">
            <MapPin className="h-3 w-3" />
            <span>Deliver to New York 10001</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Customer Service</span>
            <span>Sell</span>
            <span>Registry</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/marketplace" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">
              PA
            </span>
          </div>
          <span className="text-2xl font-bold">Pocket Angadi</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-8 max-w-3xl">
          <div className="flex">
            <Input
              placeholder="Search Pocket Angadi"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-l-md border focus:ring-2 focus:ring-primary/20"
            />
            <Button
              className="rounded-l-none px-6"
              onClick={() => {}}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="hidden md:flex items-center space-x-1 text-sm"
            onClick={() => {}}
          >
            <Gift className="h-4 w-4" />
            <span>Deals</span>
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

          {/* Cart Button */}
          <Button
            variant="ghost"
            className="relative"
            onClick={() => navigate("/cart")}
          >
            <CartIcon className="h-5 w-5" />
            {totalCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-600 text-white">
                {totalCount}
              </Badge>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-6 py-2 text-sm overflow-x-auto">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700 whitespace-nowrap"
            >
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
              "Toys & Games",
            ].map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-700 whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

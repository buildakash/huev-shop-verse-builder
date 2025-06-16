import { useState } from "react";
import { ShoppingCart, Menu, X, Edit, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { CartDropdown } from "@/components/marketplace/CartDropdown";
import { useWebsite } from "@/context/WebsiteContext";
import { SaveWebsiteModal } from "@/components/dashboard/SaveWebsiteModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { items } = useCart();
  const { isLiveWebsiteActive } = useWebsite();

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">FASHION</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Home</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Shop</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Categories</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">About</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
              </div>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Live Website Button */}
              <Button
                variant={isLiveWebsiteActive ? "default" : "outline"}
                size="sm"
                onClick={() => setShowSaveModal(true)}
                className="relative overflow-hidden hidden sm:flex"
              >
                <div className="flex items-center space-x-2">
                  {isLiveWebsiteActive ? (
                    <>
                      <Globe className="h-4 w-4" />
                      <span>Live Website</span>
                      <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4" />
                      <span>Save as Website</span>
                    </>
                  )}
                </div>
                {isLiveWebsiteActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer -skew-x-12"></div>
                )}
              </Button>

              {/* Cart */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCartDropdown(!showCartDropdown)}
                  className="relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>

                {showCartDropdown && (
                  <div className="absolute right-0 top-full mt-2 z-50">
                    <CartDropdown onClose={() => setShowCartDropdown(false)} />
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Home</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Shop</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Categories</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">About</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
                
                {/* Mobile Live Website Button */}
                <Button
                  variant={isLiveWebsiteActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowSaveModal(true)}
                  className="relative overflow-hidden self-start"
                >
                  <div className="flex items-center space-x-2">
                    {isLiveWebsiteActive ? (
                      <>
                        <Globe className="h-4 w-4" />
                        <span>Live Website</span>
                        <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4" />
                        <span>Save as Website</span>
                      </>
                    )}
                  </div>
                  {isLiveWebsiteActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer -skew-x-12"></div>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <SaveWebsiteModal 
        open={showSaveModal} 
        onOpenChange={setShowSaveModal} 
      />

      <style>
        {`
          @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(200%) skewX(-12deg); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `}
      </style>
    </>
  );
};

export default Header;

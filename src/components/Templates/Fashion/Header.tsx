import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            AUXE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
              Women
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
              Men
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
              Accessories
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
              Sale
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="h-5 w-5" />
            </button>
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
                Women
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
                Men
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
                Accessories
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
                Sale
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexF from "./pages/Templates/Fashion/IndexF";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Templates/Fashion/Cart";
import Checkout from "./pages/Templates/Fashion/Checkout";
import Products from "./pages/Templates/Fashion/Products";
import LiveWebsite from "./pages/LiveWebsite";
import { ProductProvider } from "@/context/ProductContext";
import { CartProvider } from "@/context/CartContext";
import { WebsiteProvider } from "@/context/WebsiteContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <WebsiteProvider>
          <CartProvider>
            <ProductProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/live/:websiteName" element={<LiveWebsite />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/iheckout" element={<Checkout />} />
                <Route path="/index" element={<IndexF />} />
                <Route path="/NotFound" element={<NotFound />} />
                <Route path="/productDetail" element={<ProductDetail />} />
                <Route path="/product" element={<Products />} />
              </Routes>
            </ProductProvider>
          </CartProvider>
        </WebsiteProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

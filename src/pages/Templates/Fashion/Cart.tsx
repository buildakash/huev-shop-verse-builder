
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Templates/Fashion/Header";
import Footer from "@/components/Templates/Fashion/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePurchaseContext } from "@/hooks/usePurchaseContext";
import { WebsiteProvider } from "@/context/WebsiteContext";

const Cart = () => {
  const { getMarketplaceItems, getStoreItems, updateQuantity, removeFromCart, getMarketplaceTotalPrice, getStoreTotalPrice } = useCart();
  const { purchaseContext, storeId, storeName } = usePurchaseContext();

  // Get items based on current context
  const items = purchaseContext === 'marketplace' 
    ? getMarketplaceItems() 
    : getStoreItems(storeId);

  const totalPrice = purchaseContext === 'marketplace' 
    ? getMarketplaceTotalPrice() 
    : getStoreTotalPrice(storeId);

  const handleUpdateQuantity = (itemId: string, quantity: number, item: any) => {
    updateQuantity(itemId, quantity, item.purchaseContext, item.storeId);
  };

  const handleRemoveItem = (item: any) => {
    removeFromCart(item.id, item.purchaseContext, item.storeId);
  };

  const getCartTitle = () => {
    return purchaseContext === 'marketplace' 
      ? 'PocketAngadi Cart' 
      : `${storeName} Cart`;
  };

  if (items.length === 0) {
    return (
      <WebsiteProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
              <p className="mt-2 text-gray-600">Start shopping to add items to your cart.</p>
              <Link to={purchaseContext === 'marketplace' ? "/marketplace" : `/live/${storeId}`}>
                <Button className="mt-6">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          <Footer />
        </div>
      </WebsiteProvider>
    );
  }

  return (
    <WebsiteProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{getCartTitle()}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={`${item.id}-${item.purchaseContext}-${item.storeId}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">${item.price}</p>
                        {item.purchaseContext === 'store' && (
                          <p className="text-xs text-gray-500">From: {storeName}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, Math.max(0, item.quantity - 1), item)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-8 text-center">{item.quantity}</span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>$10.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${(totalPrice + 10 + totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Link to="/iheckout">
                    <Button className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  
                  <Link to={purchaseContext === 'marketplace' ? "/marketplace" : `/live/${storeId}`}>
                    <Button variant="outline" className="w-full mt-2">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </WebsiteProvider>
  );
};

export default Cart;

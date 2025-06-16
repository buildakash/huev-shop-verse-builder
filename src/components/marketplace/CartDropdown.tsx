
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { usePurchaseContext } from "@/hooks/usePurchaseContext";

export interface CartItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  image: string;
  purchaseContext: 'marketplace' | 'store';
  storeId?: string;
}

interface CartDropdownProps {
  onClose?: () => void;
}

export const CartDropdown = ({ onClose }: CartDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getMarketplaceItems, getStoreItems } = useCart();
  const { purchaseContext, storeId, storeName } = usePurchaseContext();
  
  // Get items based on current context
  const items = purchaseContext === 'marketplace' 
    ? getMarketplaceItems() 
    : getStoreItems(storeId);

  const totalQty = items.reduce((sum, it) => sum + it.qty, 0);
  const totalPrice = items.reduce((sum, it) => sum + it.qty * it.price, 0);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const getCartTitle = () => {
    return purchaseContext === 'marketplace' 
      ? 'PocketAngadi Cart' 
      : `${storeName} Cart`;
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((o) => !o)}
        className="relative"
      >
        <ShoppingBag className="w-4 h-4" />
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {totalQty}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h4 className="font-semibold">{getCartTitle()}</h4>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={`${item.id}-${item.purchaseContext}-${item.storeId}`} className="flex items-center space-x-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium line-clamp-2">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.qty} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold">${(item.qty * item.price).toFixed(2)}</p>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-4 border-t space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex space-x-2">
                <Link to="/cart" className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Cart
                  </Button>
                </Link>
                <Link to="/iheckout" className="flex-1">
                  <Button className="w-full">Checkout</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

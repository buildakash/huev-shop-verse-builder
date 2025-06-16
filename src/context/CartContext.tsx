
import React, {
    createContext,
    useContext,
    useState,
    ReactNode
  } from "react";
  
  // ❶ Define your CartItem shape
  export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    qty: number;
    quantity: number; // Add this for compatibility
  }
  
  interface CartContextType {
    cartItems: CartItem[];
    items: CartItem[]; // Add alias for compatibility
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    getTotalPrice: () => number;
  }
  
  const CartContext = createContext<CartContextType | undefined>(undefined);
  
  export const useCart = (): CartContextType => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
  };
  
  export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
    const addToCart = (item: CartItem) => {
      setCartItems((prev) => {
        const existing = prev.find((ci) => ci.id === item.id);
        if (existing) {
          return prev.map((ci) =>
            ci.id === item.id ? { 
              ...ci, 
              qty: ci.qty + item.qty,
              quantity: ci.qty + item.qty 
            } : ci
          );
        }
        return [...prev, { ...item, quantity: item.qty }];
      });
    };
  
    const removeFromCart = (id: string) => {
      setCartItems((prev) => prev.filter((ci) => ci.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(id);
        return;
      }
      setCartItems((prev) =>
        prev.map((ci) =>
          ci.id === id ? { ...ci, qty: quantity, quantity: quantity } : ci
        )
      );
    };

    const getTotalPrice = () => {
      return cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
    };
  
    return (
      <CartContext.Provider value={{ 
        cartItems, 
        items: cartItems, // Provide alias for compatibility
        addToCart, 
        removeFromCart,
        updateQuantity,
        getTotalPrice
      }}>
        {children}
      </CartContext.Provider>
    );
  };

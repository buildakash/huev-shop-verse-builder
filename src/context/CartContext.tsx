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
  }
  
  interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
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
            ci.id === item.id ? { ...ci, qty: ci.qty + item.qty } : ci
          );
        }
        return [...prev, item];
      });
    };
  
    const removeFromCart = (id: string) => {
      setCartItems((prev) => prev.filter((ci) => ci.id !== id));
    };
  
    return (
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  };
  
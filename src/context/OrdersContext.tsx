import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "@/context/CartContext";

export interface Order {
  id: string;
  date: string;                // ISO date: YYYY-MM-DD
  customer: string;            // full name
  email: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
}

interface OrdersContextType {
  orders: Order[];
  addOrder: (o: Omit<Order, "date" | "status">) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (o: Omit<Order, "date" | "status">) => {
    const newOrder: Order = {
      ...o,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
};

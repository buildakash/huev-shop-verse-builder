// src/context/ProductContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import localforage from "localforage";

// 1️⃣ Configure localForage
localforage.config({
  name: "huev-shop-verse-builder",
  storeName: "products",
});

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  status?: "active" | "out_of_stock";
  stock?: number;
  description?: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);
export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
};

// 2️⃣ Your original three products as default
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    stock: 45,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 299.99,
    stock: 23,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 79.99,
    stock: 0,
    status: "out_of_stock",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop",
  },
];

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // 3️⃣ Load from localForage on mount
  useEffect(() => {
    localforage
      .getItem<Product[]>("products")
      .then((stored) => {
        if (stored && stored.length > 0) {
          setProducts(stored);
        } else {
          setProducts(initialProducts);
        }
      })
      .catch(() => {
        setProducts(initialProducts);
      });
  }, []);

  // 4️⃣ Save to localForage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localforage.setItem("products", products);
    }
  }, [products]);

  const addProduct = (p: Product) => {
    setProducts((prev) => [...prev, p]);
  };
  const updateProduct = (p: Product) => {
    setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  };
  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

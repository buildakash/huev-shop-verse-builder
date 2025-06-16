
// 1. Import & setup
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import localforage from "localforage";

localforage.config({
  name: "Pocket Angadi",
  storeName: "products",
});

// 2. Define a Product type that covers *all* fields used in admin & marketplace
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  image: string;             // URL or base64
  images?: string[];         // Multiple images support
  category?: string;
  store?: string;
  freeShipping?: boolean;
  stock?: number;
  status?: "active" | "out_of_stock";
  description?: string;
  features?: string[];       // Key features list
}

// 3. Seed exactly the six marketplace defaults here:
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 16599,
    originalPrice: 20749,
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    store: "AudioTech Pro",
    freeShipping: true
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 24899,
    originalPrice: 33199,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Electronics",
    store: "FitTech",
    freeShipping: true
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 6639,
    originalPrice: 8299,
    rating: 4.4,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
    store: "SoundWave",
    freeShipping: false
  },
  {
    id: "4",
    name: "Designer Backpack",
    price: 7479,
    originalPrice: 9960,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Fashion",
    store: "Urban Style",
    freeShipping: true
  },
  {
    id: "5",
    name: "Coffee Maker Pro",
    price: 12459,
    originalPrice: 16599,
    rating: 4.5,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    category: "Home & Garden",
    store: "Kitchen Essentials",
    freeShipping: true
  },
  {
    id: "6",
    name: "Running Shoes",
    price: 10799,
    originalPrice: 13280,
    rating: 4.6,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Sports",
    store: "SportMax",
    freeShipping: true
  },
];

// 4. Context & persistence logic (localForage)
const ProductContext = createContext<{ 
  products: Product[]; 
  addProduct(p:Product):void; 
  updateProduct(p:Product):void; 
  deleteProduct(id:string):void;
  getCategories():string[];
} | undefined>(undefined);

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used within ProductProvider");
  return ctx;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Load on mount
  useEffect(() => {
    localforage.getItem<Product[]>("products").then(stored => {
      setProducts(stored && stored.length ? stored : initialProducts);
    }).catch(() => setProducts(initialProducts));
  }, []);

  // Save on change
  useEffect(() => {
    if (products.length) localforage.setItem("products", products);
  }, [products]);

  const addProduct = (p: Product) => setProducts(prev => [...prev, p]);
  const updateProduct = (p: Product) => setProducts(prev => prev.map(x => x.id === p.id ? p : x));
  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
  };
  
  const getCategories = () => {
    const categories = products.map(p => p.category).filter(Boolean);
    return [...new Set(categories)] as string[];
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getCategories }}>
      {children}
    </ProductContext.Provider>
  );
};

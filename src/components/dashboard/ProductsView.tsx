
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { ProductModal } from "./ProductModal";
import { useProducts, Product } from "@/context/ProductContext";

export const ProductsView = () => {

    const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { products, addProduct, updateProduct } = useProducts();

  // const products = [
  //   {
  //     id: 1,
  //     name: "Premium Wireless Headphones",
  //     price: 199.99,
  //     stock: 45,
  //     status: "active",
  //     image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
  //   },
  //   {
  //     id: 2,
  //     name: "Smart Fitness Watch",
  //     price: 299.99,
  //     stock: 23,
  //     status: "active",
  //     image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop"
  //   },
  //   {
  //     id: 3,
  //     name: "Bluetooth Speaker",
  //     price: 79.99,
  //     stock: 0,
  //     status: "out_of_stock",
  //     image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop"
  //   }
  // ];

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button onClick={handleAddProduct} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Button>
      </div>

      <div className="grid gap-4">
      {products.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-2xl font-bold text-primary">${product.price}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={product.status === "active" ? "default" : "destructive"}>
                        {product.status === "active" ? "Active" : "Out of Stock"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Stock: {product.stock}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProductModal 
        open={showModal} 
        onOpenChange={setShowModal}
        product={editingProduct}
        onSave={(prod) => {
          if (editingProduct) {
            updateProduct(prod);
          } else {
            addProduct(prod);
          }
          setShowModal(false);
        }}
      />
    </div>
  );
};

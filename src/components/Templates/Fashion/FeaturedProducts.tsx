import { useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { Pencil, Check, X } from "lucide-react";
import { useProducts   } from "@/context/ProductContext";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}



  const FeaturedProducts = () => {
      const { products, updateProduct } = useProducts();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [tempProduct, setTempProduct] = useState<Product | null>(products[0] ? { ...products[0], category: products[0].category || '' } : null);
  const [updateMessage, setUpdateMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showUpdateMessage = (msg: string) => {
    setUpdateMessage(msg);
    setTimeout(() => setUpdateMessage(""), 2000);
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setTempProduct({ ...products[index], category: products[index].category || '' });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
   updateProduct(tempProduct);
    setEditingIndex(null);
    showUpdateMessage("Product updated");
  };

  const handleFieldChange = (field: keyof Product, value: string | number) => {
    setTempProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        handleFieldChange("image", ev.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 bg-gray-50 animate-fade-in-up">
      {/* Toast */}
      {updateMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg text-sm animate-fade-in-up z-50">
          ✅ {updateMessage}
        </div>
      )}

      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Discover our hand-picked selection of trending pieces that define
            modern style
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((prod, idx) => (
            <div key={prod.id} className="relative rounded-lg overflow-hidden border">
              {editingIndex === idx ? (
                <div className="bg-white p-4 flex flex-col gap-3">
                  {/* Image Editor */}
                  <div className="relative">
                    <img
                      src={tempProduct.image}
                      alt={tempProduct.name}
                      className="w-full h-48 object-cover rounded"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-200"
                      title="Change image"
                    >
                      <Pencil size={16} />
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>

                  {/* Name */}
                  <input
                    type="text"
                    value={tempProduct.name}
                    onChange={(e) =>
                      handleFieldChange("name", e.target.value)
                    }
                    className="border px-2 py-1 rounded w-full"
                  />

                  {/* Price */}
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={tempProduct.price}
                      onChange={(e) =>
                        handleFieldChange("price", Number(e.target.value))
                      }
                      className="border px-2 py-1 rounded w-1/2"
                      placeholder="Price"
                    />
                    <input
                      type="number"
                      value={tempProduct.originalPrice || 0}
                      onChange={(e) =>
                        handleFieldChange(
                          "originalPrice",
                          Number(e.target.value)
                        )
                      }
                      className="border px-2 py-1 rounded w-1/2"
                      placeholder="Orig. Price"
                    />
                  </div>

                  {/* Category */}
                  <input
                    type="text"
                    value={tempProduct.category}
                    onChange={(e) =>
                      handleFieldChange("category", e.target.value)
                    }
                    className="border px-2 py-1 rounded w-full"
                    placeholder="Category"
                  />

                  {/* Save & Cancel */}
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      title="Save"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                      title="Cancel"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <ProductCard {...prod} category={prod.category || ''} />
                  <button
                    onClick={() => startEdit(idx)}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-200 z-10"
                    title="Edit product"
                  >
                    <Pencil size={16} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

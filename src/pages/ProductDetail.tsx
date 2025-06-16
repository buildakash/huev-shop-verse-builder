
import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Star, ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { usePurchaseContext } from "@/hooks/usePurchaseContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { addToCart: addItemToCart } = useCart();
  const { products } = useProducts();
  const { purchaseContext, storeId, storeName } = usePurchaseContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // 1️⃣ Find the real product by id
  const product = products.find((p) => p.id === id);

  // 2️⃣ If not found, you can navigate back or show a message
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Product not found.</p>
        <Link to="/marketplace" className="ml-4 text-primary underline">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const images = product.images || [product.image]; // support old single-image shape
  const features = product.features || [];

  const handleAddToCart = () => {
    addItemToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: images[selectedImage],
      qty: quantity,
      quantity: quantity,
      purchaseContext: purchaseContext,
      storeId: storeId,
    });
    
    const contextMessage = purchaseContext === 'marketplace' 
      ? 'Added to PocketAngadi cart' 
      : `Added to ${storeName} cart`;
    
    toast({
      title: contextMessage,
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const addToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: "Product saved to your wishlist.",
    });
  };

  const getBackLink = () => {
    if (purchaseContext === 'store') {
      return `/live/${storeId}`;
    }
    return "/marketplace";
  };

  const getBackText = () => {
    if (purchaseContext === 'store') {
      return `Back to ${storeName}`;
    }
    return "Back to Marketplace";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-lg bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to={getBackLink()}
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{getBackText()}</span>
          </Link>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                {purchaseContext === 'store' ? storeName.charAt(0).toUpperCase() : 'H'}
              </span>
            </div>
            <span className="font-bold">
              {purchaseContext === 'store' ? storeName : 'Huev'}
            </span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Purchase Context Indicator */}
        <div className="mb-4">
          <Badge variant={purchaseContext === 'marketplace' ? "default" : "secondary"} className="mb-2">
            {purchaseContext === 'marketplace' ? '🛒 PocketAngadi Marketplace' : `🏪 ${storeName} Official Store`}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {product.store && (
                  <Badge variant="secondary">{product.store}</Badge>
                )}
                {product.freeShipping && (
                  <Badge variant="outline">Free Shipping</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        product.rating && i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                {product.rating != null && product.reviews != null && (
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice != null &&
                product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                    <Badge variant="destructive">
                      {Math.round(
                        (1 - product.price / product.originalPrice) * 100
                      )}
                      % OFF
                    </Badge>
                  </>
                )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-muted-foreground">{product.description}</p>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Key Features:</h3>
                <ul className="space-y-1">
                  {features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-muted-foreground flex items-center"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                  >
                    –
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {purchaseContext === 'marketplace' ? 'Add to Cart' : `Add to ${storeName} Cart`}
                  </span>
                </Button>
                <Button onClick={addToWishlist} variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <p
                className={`text-sm ${
                  product.stock && product.stock > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {product.stock && product.stock > 0
                  ? "✓ In stock and ready to ship"
                  : "Out of stock"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

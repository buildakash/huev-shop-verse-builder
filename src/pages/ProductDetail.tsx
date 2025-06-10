
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Star, ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id,
    name: "Premium Wireless Headphones",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviews: 127,
    description: "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop"
    ],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge technology",
      "Premium materials",
      "Wireless connectivity"
    ],
    store: "AudioTech Pro",
    inStock: true,
    freeShipping: true
  };

  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };

  const addToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: "Product saved to your wishlist",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-lg bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/marketplace" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Link>
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <span className="font-bold">Huev</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{product.store}</Badge>
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
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">${product.price}</span>
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
              <Badge variant="destructive">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </Badge>
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button onClick={addToCart} className="flex-1 flex items-center space-x-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </Button>
                <Button onClick={addToWishlist} variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              {product.inStock ? (
                <p className="text-sm text-green-600">✓ In stock and ready to ship</p>
              ) : (
                <p className="text-sm text-red-600">Out of stock</p>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <Card className="mt-12">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b border-border pb-4 last:border-b-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Customer {review}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Great product! Excellent quality and fast shipping. Would definitely recommend.
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;

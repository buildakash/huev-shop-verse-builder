import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const products = [
    {
      id: "1",
      name: "Oversized Blazer",
      price: 129,
      originalPrice: 159,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
      category: "Women"
    },
    {
      id: "2",
      name: "Classic White Shirt",
      price: 79,
      image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=800&q=80",
      category: "Women"
    },
    {
      id: "3",
      name: "Denim Jacket",
      price: 99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
      category: "Men"
    },
    {
      id: "4",
      name: "Summer Dress",
      price: 89,
      originalPrice: 120,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
      category: "Women"
    },
    {
      id: "5",
      name: "Leather Boots",
      price: 189,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      category: "Shoes"
    },
    {
      id: "6",
      name: "Wool Sweater",
      price: 119,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
      category: "Men"
    }
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Discover our hand-picked selection of trending pieces that define modern style
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

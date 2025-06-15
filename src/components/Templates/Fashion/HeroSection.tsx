import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-[60vh] sm:h-[80vh] lg:h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=2000&q=80"
          alt="Fashion Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 sm:mb-6 tracking-wide fade-in">
          NEW COLLECTION
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 font-light opacity-90 fade-in max-w-2xl mx-auto">
          Discover the latest trends in fashion
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center fade-in">
          <Link to="/products" className="btn-primary w-full sm:w-auto inline-block text-center">
            Shop Women
          </Link>
          <Link to="/products" className="btn-secondary w-full sm:w-auto inline-block bg-white text-gray-900 hover:bg-gray-100 text-center">
            Shop Men
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

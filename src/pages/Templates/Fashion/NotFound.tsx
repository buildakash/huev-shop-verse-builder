
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Construction, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Construction className="w-24 h-24 text-orange-500 animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <Clock className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">We're Building Something Amazing!</h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Our team is working hard to bring you an incredible experience. 
            We'll be back soon with something special!
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-6 border border-orange-200">
            <p className="text-sm text-gray-500 mb-2">Expected completion:</p>
            <p className="text-orange-600 font-semibold">Coming Soon</p>
          </div>
        </div>
        
        <Button 
          onClick={() => window.history.back()} 
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
        
        <div className="mt-8 text-xs text-gray-400">
          Thank you for your patience
        </div>
      </div>
    </div>
  );
};

export default NotFound;


import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Wrench, ArrowLeft, AlertCircle } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench className="w-12 h-12 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <AlertCircle className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Under Construction</h1>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            We are currently working on this section. Our team is building something 
            great and it will be available soon. Thank you for your patience.
          </p>
          <div className="bg-card border rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Status:</p>
            <p className="text-primary font-semibold">Coming Soon</p>
          </div>
        </div>
        
        <Button 
          onClick={() => window.history.back()} 
          className="px-8 py-3 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
        
        <div className="mt-8 text-xs text-muted-foreground">
          We appreciate your understanding while we improve our services
        </div>
      </div>
    </div>
  );
};

export default NotFound;

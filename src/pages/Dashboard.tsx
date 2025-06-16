
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProductsView } from "@/components/dashboard/ProductsView";
import { AnalyticsView } from "@/components/dashboard/AnalyticsView";
import { OrdersView } from "@/components/dashboard/OrdersView";
import { TemplatesView } from "@/components/dashboard/TemplatesView";
import { SettingsView } from "@/components/dashboard/SettingsView";
import { ProductProvider } from "@/context/ProductContext";
import { WebsiteProvider } from "@/context/WebsiteContext";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case "products":
        return <ProductsView />;
      case "orders":
        return <OrdersView />;
      case "analytics":
        return <AnalyticsView />;
      case "templates":
        return <TemplatesView />;
      case "settings":
        return <SettingsView />;
      default:
        return <AnalyticsView />;
    }
  };

  return (
    <WebsiteProvider>
      <ProductProvider>
        <div className="min-h-screen bg-background flex">
          <Sidebar 
            activeView={activeView} 
            setActiveView={setActiveView}
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
          />
          <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "ml-16" : "ml-64"}`}>
            <DashboardHeader />
            <main className="p-6">
              {renderView()}
            </main>
          </div>
        </div>
      </ProductProvider>
    </WebsiteProvider>
  );
};

export default Dashboard;

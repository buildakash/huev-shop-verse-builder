
import React, { createContext, useContext, useState, ReactNode } from "react";

interface WebsiteContextType {
  isLiveWebsiteActive: boolean;
  setIsLiveWebsiteActive: (active: boolean) => void;
  saveAsNewWebsite: () => void;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error("useWebsite must be used within WebsiteProvider");
  }
  return context;
};

export const WebsiteProvider = ({ children }: { children: ReactNode }) => {
  const [isLiveWebsiteActive, setIsLiveWebsiteActive] = useState(false);

  const saveAsNewWebsite = () => {
    // Here you would implement the logic to save the current template
    // For now, we'll just toggle the live status
    setIsLiveWebsiteActive(true);
  };

  return (
    <WebsiteContext.Provider value={{
      isLiveWebsiteActive,
      setIsLiveWebsiteActive,
      saveAsNewWebsite
    }}>
      {children}
    </WebsiteContext.Provider>
  );
};

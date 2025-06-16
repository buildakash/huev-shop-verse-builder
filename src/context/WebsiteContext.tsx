
import React, { createContext, useContext, useState, ReactNode } from "react";

interface WebsiteData {
  name: string;
  url: string;
  template: 'fashion' | 'default';
  content: {
    heroTitle?: string;
    heroSubtitle?: string;
    logoText?: string;
    // Add more editable content fields as needed
  };
}

interface WebsiteContextType {
  isLiveWebsiteActive: boolean;
  setIsLiveWebsiteActive: (active: boolean) => void;
  currentWebsite: WebsiteData | null;
  setCurrentWebsite: (website: WebsiteData) => void;
  saveAsNewWebsite: (websiteData: Omit<WebsiteData, 'template'>) => void;
  updateWebsiteContent: (content: Partial<WebsiteData['content']>) => void;
  isEditMode: boolean;
  setIsEditMode: (editMode: boolean) => void;
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
  const [currentWebsite, setCurrentWebsite] = useState<WebsiteData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const saveAsNewWebsite = (websiteData: Omit<WebsiteData, 'template'>) => {
    const newWebsite: WebsiteData = {
      ...websiteData,
      template: 'fashion', // Default to fashion template
      content: {
        heroTitle: 'Welcome to Our Store',
        heroSubtitle: 'Discover amazing products',
        logoText: 'FASHION',
        ...websiteData.content
      }
    };
    
    setCurrentWebsite(newWebsite);
    setIsLiveWebsiteActive(true);
  };

  const updateWebsiteContent = (content: Partial<WebsiteData['content']>) => {
    if (currentWebsite) {
      setCurrentWebsite({
        ...currentWebsite,
        content: {
          ...currentWebsite.content,
          ...content
        }
      });
    }
  };

  return (
    <WebsiteContext.Provider value={{
      isLiveWebsiteActive,
      setIsLiveWebsiteActive,
      currentWebsite,
      setCurrentWebsite,
      saveAsNewWebsite,
      updateWebsiteContent,
      isEditMode,
      setIsEditMode
    }}>
      {children}
    </WebsiteContext.Provider>
  );
};

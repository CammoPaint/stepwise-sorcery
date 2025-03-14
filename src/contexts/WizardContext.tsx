
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define product launch types
export type ProductDetails = {
  name: string;
  description: string;
  category: string;
  targetAudience: string;
};

export type MarketingStrategy = {
  objective: string;
  channels: string[];
  budget: string;
  timeline: string;
};

export type CreativeAssets = {
  logo: boolean;
  images: boolean;
  videos: boolean;
  descriptions: string;
};

export type LaunchTimeline = {
  prelaunchDate: string;
  launchDate: string;
  postLaunchActivities: string[];
};

export type DistributionPlan = {
  channels: string[];
  partnerships: string;
  pricing: string;
};

export type WizardData = {
  productDetails: ProductDetails;
  marketingStrategy: MarketingStrategy;
  creativeAssets: CreativeAssets;
  launchTimeline: LaunchTimeline;
  distributionPlan: DistributionPlan;
};

// Default values
const defaultWizardData: WizardData = {
  productDetails: {
    name: '',
    description: '',
    category: '',
    targetAudience: '',
  },
  marketingStrategy: {
    objective: '',
    channels: [],
    budget: '',
    timeline: '',
  },
  creativeAssets: {
    logo: false,
    images: false,
    videos: false,
    descriptions: '',
  },
  launchTimeline: {
    prelaunchDate: '',
    launchDate: '',
    postLaunchActivities: [],
  },
  distributionPlan: {
    channels: [],
    partnerships: '',
    pricing: '',
  },
};

type WizardContextType = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  isStepCompleted: (step: number) => boolean;
  getTotalSteps: () => number;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>(defaultWizardData);

  const updateWizardData = (data: Partial<WizardData>) => {
    setWizardData((prev) => ({ ...prev, ...data }));
  };

  const isStepCompleted = (step: number): boolean => {
    // Logic to check if a step is completed based on required fields
    switch (step) {
      case 1: {
        const { name, description } = wizardData.productDetails;
        return !!name && !!description;
      }
      case 2: {
        const { objective, channels } = wizardData.marketingStrategy;
        return !!objective && channels.length > 0;
      }
      case 3: {
        const { logo, images, descriptions } = wizardData.creativeAssets;
        return (logo || images) && !!descriptions;
      }
      case 4: {
        const { launchDate } = wizardData.launchTimeline;
        return !!launchDate;
      }
      case 5: {
        const { channels, pricing } = wizardData.distributionPlan;
        return channels.length > 0 && !!pricing;
      }
      default:
        return false;
    }
  };

  const getTotalSteps = () => 5; // Total number of steps in our wizard

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        wizardData,
        updateWizardData,
        isStepCompleted,
        getTotalSteps,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};

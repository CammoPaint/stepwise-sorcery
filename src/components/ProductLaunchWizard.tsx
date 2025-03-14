
import React, { useState } from 'react';
import { WizardProvider } from '@/contexts/WizardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StepIndicator from '@/components/StepIndicator';
import WizardNavigation from '@/components/WizardNavigation';
import WizardPreview from '@/components/WizardPreview';
import StepOne from '@/components/steps/StepOne';
import StepTwo from '@/components/steps/StepTwo';
import StepThree from '@/components/steps/StepThree';
import StepFour from '@/components/steps/StepFour';
import StepFive from '@/components/steps/StepFive';
import { useWizard } from '@/contexts/WizardContext';
import { Sparkles, BarChartBig, Rocket } from 'lucide-react';

const WizardSteps: React.FC = () => {
  const { currentStep } = useWizard();
  const [showPreview, setShowPreview] = useState(false);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        return <StepFive />;
      default:
        return <StepOne />;
    }
  };

  return (
    <>
      <div className="space-y-6">
        <StepIndicator />
        {renderStep()}
        <WizardNavigation onPreview={() => setShowPreview(true)} />
      </div>
      {showPreview && <WizardPreview onClose={() => setShowPreview(false)} />}
    </>
  );
};

const ProductLaunchWizard: React.FC = () => {
  return (
    <WizardProvider>
      <div className="min-h-screen flex flex-col items-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-3xl mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold text-balance">Product Launch Wizard</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Complete each step to create a comprehensive product launch plan. Our AI-powered wizard will guide you through the process and provide recommendations.
          </p>
        </div>
        
        <div className="w-full max-w-3xl">
          <WizardSteps />
        </div>

        <div className="w-full max-w-3xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <CardTitle className="text-lg">AI-Powered Recommendations</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get intelligent suggestions for your launch strategy based on industry best practices and market data.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <BarChartBig className="h-4 w-4 text-primary" />
                <CardTitle className="text-lg">Launch Analytics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track the performance of your product launch and measure success against your goals and objectives.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </WizardProvider>
  );
};

export default ProductLaunchWizard;

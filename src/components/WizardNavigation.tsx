
import React from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWizard } from '@/contexts/WizardContext';
import { useToast } from '@/components/ui/use-toast';

interface WizardNavigationProps {
  onPreview: () => void;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({ onPreview }) => {
  const { currentStep, setCurrentStep, isStepCompleted, getTotalSteps } = useWizard();
  const { toast } = useToast();
  const totalSteps = getTotalSteps();

  const handleNext = () => {
    if (!isStepCompleted(currentStep)) {
      toast({
        title: "Incomplete Step",
        description: "Please complete the current step before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto pt-8 pb-4">
      <Button
        variant="outline"
        onClick={handleBack}
        disabled={currentStep === 1}
        className="flex items-center gap-2 transition-all hover:gap-3"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <Button 
        variant="outline" 
        onClick={onPreview}
        className="flex items-center gap-2"
      >
        <Eye className="h-4 w-4" />
        Preview
      </Button>

      <Button
        onClick={handleNext}
        disabled={currentStep === totalSteps}
        className="flex items-center gap-2 transition-all hover:gap-3 bg-primary hover:bg-primary/90"
      >
        {currentStep === totalSteps ? 'Complete' : 'Next'}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default WizardNavigation;

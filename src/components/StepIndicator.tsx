
import React from 'react';
import { Check } from 'lucide-react';
import { useWizard } from '@/contexts/WizardContext';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ className }) => {
  const { currentStep, isStepCompleted, getTotalSteps } = useWizard();
  const totalSteps = getTotalSteps();

  return (
    <div className={cn('w-full max-w-3xl mx-auto py-4', className)}>
      <div className="relative flex items-center justify-between">
        {/* Progress line that connects the steps */}
        <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Step indicators */}
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = isStepCompleted(stepNumber);
          const isPast = currentStep > stepNumber;

          return (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  'relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ease-in-out',
                  {
                    'border-primary bg-primary text-primary-foreground': isActive || isPast,
                    'border-muted bg-background': !isActive && !isPast,
                    'animate-pulse-soft': isActive,
                  }
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5 text-primary-foreground" />
                ) : (
                  <span className={cn('text-sm font-medium', {
                    'text-primary-foreground': isActive || isPast,
                    'text-muted-foreground': !isActive && !isPast,
                  })}>
                    {stepNumber}
                  </span>
                )}
              </div>
              <span
                className={cn('mt-2 hidden text-xs font-medium sm:block', {
                  'text-primary': isActive,
                  'text-foreground': isPast,
                  'text-muted-foreground': !isActive && !isPast,
                })}
              >
                Step {stepNumber}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;

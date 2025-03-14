
import React from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const distributionChannels = [
  { id: 'website', label: 'Company Website' },
  { id: 'marketplace', label: 'Online Marketplaces' },
  { id: 'retail', label: 'Retail Stores' },
  { id: 'distributors', label: 'Distributors/Resellers' },
  { id: 'direct_sales', label: 'Direct Sales Team' },
  { id: 'affiliate', label: 'Affiliate Program' },
];

const StepFive: React.FC = () => {
  const { wizardData, updateWizardData } = useWizard();
  const { distributionPlan } = wizardData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateWizardData({
      distributionPlan: {
        ...distributionPlan,
        [name]: value,
      },
    });
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    let updatedChannels = [...distributionPlan.channels];
    
    if (checked) {
      updatedChannels.push(id);
    } else {
      updatedChannels = updatedChannels.filter(channel => channel !== id);
    }
    
    updateWizardData({
      distributionPlan: {
        ...distributionPlan,
        channels: updatedChannels,
      },
    });
  };

  const generatePricingStrategy = () => {
    // Simulate AI generation of pricing strategy recommendations
    setTimeout(() => {
      updateWizardData({
        distributionPlan: {
          ...distributionPlan,
          pricing: "Based on market analysis, we recommend a tiered pricing strategy with a base price of $X and premium options at $Y and $Z. Consider an introductory offer with a 15% discount for early adopters."
        },
      });
      
      toast.success("AI-generated pricing strategy added!", {
        description: "Review and customize the suggestion as needed.",
      });
    }, 1000);
  };

  return (
    <Card className="w-full shadow-sm animate-slide-in-up glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-balance">Distribution Plan</CardTitle>
        <CardDescription>
          Define how your product will reach customers and your pricing strategy.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Distribution Channels <span className="text-destructive">*</span></Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {distributionChannels.map((channel) => (
              <div key={channel.id} className="flex items-center space-x-2">
                <Checkbox
                  id={channel.id}
                  checked={distributionPlan.channels.includes(channel.id)}
                  onCheckedChange={(checked) => handleCheckboxChange(channel.id, checked as boolean)}
                />
                <Label
                  htmlFor={channel.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {channel.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="partnerships">Strategic Partnerships</Label>
          <Textarea
            id="partnerships"
            name="partnerships"
            value={distributionPlan.partnerships}
            onChange={handleInputChange}
            placeholder="Potential partners or collaboration opportunities"
            className="min-h-[100px] w-full transition-all focus-within:ring-1 focus-within:ring-primary/20"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="pricing">Pricing Strategy <span className="text-destructive">*</span></Label>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 gap-1"
              onClick={generatePricingStrategy}
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI Generate
            </Button>
          </div>
          <Textarea
            id="pricing"
            name="pricing"
            value={distributionPlan.pricing}
            onChange={handleInputChange}
            placeholder="Describe your pricing model and strategy"
            className="min-h-[100px] w-full transition-all focus-within:ring-1 focus-within:ring-primary/20"
            required
          />
          <p className="text-xs text-muted-foreground">
            Include base pricing, tiers, potential discounts, and competitive positioning.
          </p>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <span className="text-destructive">*</span> Required fields
        </div>
      </CardContent>
    </Card>
  );
};

export default StepFive;


import React from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const marketingChannels = [
  { id: 'social_media', label: 'Social Media' },
  { id: 'email', label: 'Email Marketing' },
  { id: 'content', label: 'Content Marketing' },
  { id: 'ads', label: 'Paid Advertising' },
  { id: 'pr', label: 'PR & Media' },
  { id: 'events', label: 'Events & Webinars' },
  { id: 'influencers', label: 'Influencer Marketing' },
  { id: 'seo', label: 'SEO' },
];

const StepTwo: React.FC = () => {
  const { wizardData, updateWizardData } = useWizard();
  const { marketingStrategy } = wizardData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateWizardData({
      marketingStrategy: {
        ...marketingStrategy,
        [name]: value,
      },
    });
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    let updatedChannels = [...marketingStrategy.channels];
    
    if (checked) {
      updatedChannels.push(id);
    } else {
      updatedChannels = updatedChannels.filter(channel => channel !== id);
    }
    
    updateWizardData({
      marketingStrategy: {
        ...marketingStrategy,
        channels: updatedChannels,
      },
    });
  };

  return (
    <Card className="w-full shadow-sm animate-slide-in-up glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-balance">Marketing Strategy</CardTitle>
        <CardDescription>
          Define your marketing approach to successfully launch your product.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="objective">Marketing Objective <span className="text-destructive">*</span></Label>
          <Textarea
            id="objective"
            name="objective"
            value={marketingStrategy.objective}
            onChange={handleInputChange}
            placeholder="What do you want to achieve with this launch?"
            className="min-h-[100px] w-full transition-all focus-within:ring-1 focus-within:ring-primary/20"
            required
          />
        </div>

        <div className="space-y-3">
          <Label>Marketing Channels <span className="text-destructive">*</span></Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {marketingChannels.map((channel) => (
              <div key={channel.id} className="flex items-center space-x-2">
                <Checkbox
                  id={channel.id}
                  checked={marketingStrategy.channels.includes(channel.id)}
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
          <Label htmlFor="budget">Marketing Budget</Label>
          <Input
            id="budget"
            name="budget"
            value={marketingStrategy.budget}
            onChange={handleInputChange}
            placeholder="Estimated budget for the launch"
            className="w-full transition-all focus-within:ring-1 focus-within:ring-primary/20"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="timeline">Marketing Timeline</Label>
          <Input
            id="timeline"
            name="timeline"
            value={marketingStrategy.timeline}
            onChange={handleInputChange}
            placeholder="e.g., 3 months, 6 months"
            className="w-full transition-all focus-within:ring-1 focus-within:ring-primary/20"
          />
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <span className="text-destructive">*</span> Required fields
        </div>
      </CardContent>
    </Card>
  );
};

export default StepTwo;

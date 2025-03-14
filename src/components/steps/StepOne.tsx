
import React from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const StepOne: React.FC = () => {
  const { wizardData, updateWizardData } = useWizard();
  const { productDetails } = wizardData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateWizardData({
      productDetails: {
        ...productDetails,
        [name]: value,
      },
    });
  };

  const handleSelectChange = (value: string, field: string) => {
    updateWizardData({
      productDetails: {
        ...productDetails,
        [field]: value,
      },
    });
  };

  return (
    <Card className="w-full shadow-sm animate-slide-in-up glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-balance">Product Details</CardTitle>
        <CardDescription>
          Let's start by gathering some basic information about your product.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="name">Product Name <span className="text-destructive">*</span></Label>
          <Input
            id="name"
            name="name"
            value={productDetails.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="w-full transition-all focus-within:ring-1 focus-within:ring-primary/20"
            required
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="description">Product Description <span className="text-destructive">*</span></Label>
          <Textarea
            id="description"
            name="description"
            value={productDetails.description}
            onChange={handleInputChange}
            placeholder="Describe your product and its key features"
            className="min-h-[120px] w-full transition-all focus-within:ring-1 focus-within:ring-primary/20"
            required
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="category">Product Category</Label>
          <Select
            value={productDetails.category}
            onValueChange={(value) => handleSelectChange(value, 'category')}
          >
            <SelectTrigger id="category" className="w-full transition-all focus-within:ring-1 focus-within:ring-primary/20">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="software">Software</SelectItem>
              <SelectItem value="hardware">Hardware</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="consumer_goods">Consumer Goods</SelectItem>
              <SelectItem value="food_beverage">Food & Beverage</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="targetAudience">Target Audience</Label>
          <Textarea
            id="targetAudience"
            name="targetAudience"
            value={productDetails.targetAudience}
            onChange={handleInputChange}
            placeholder="Who is your product designed for?"
            className="min-h-[80px] w-full transition-all focus-within:ring-1 focus-within:ring-primary/20"
          />
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <span className="text-destructive">*</span> Required fields
        </div>
      </CardContent>
    </Card>
  );
};

export default StepOne;

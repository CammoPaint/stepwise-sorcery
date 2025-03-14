
import React from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Upload, Image, FileVideo } from 'lucide-react';

const StepThree: React.FC = () => {
  const { wizardData, updateWizardData } = useWizard();
  const { creativeAssets } = wizardData;

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateWizardData({
      creativeAssets: {
        ...creativeAssets,
        descriptions: e.target.value,
      },
    });
  };

  const handleCheckboxChange = (field: keyof typeof creativeAssets, checked: boolean) => {
    if (field === 'logo' || field === 'images' || field === 'videos') {
      updateWizardData({
        creativeAssets: {
          ...creativeAssets,
          [field]: checked,
        },
      });
    }
  };

  // Simulate file upload functionality (would connect to actual file upload in a real app)
  const handleUpload = (type: string) => {
    // This would typically trigger a file input dialog
    console.log(`Upload ${type} clicked`);
  };

  return (
    <Card className="w-full shadow-sm animate-slide-in-up glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-balance">Creative Assets</CardTitle>
        <CardDescription>
          Prepare the visual and textual assets you'll need for your product launch.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Asset Checklist <span className="text-destructive">*</span></Label>
          
          <div className="space-y-4">
            <div className="flex flex-col space-y-3 p-4 rounded-lg bg-muted/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="logo"
                    checked={creativeAssets.logo}
                    onCheckedChange={(checked) => handleCheckboxChange('logo', checked as boolean)}
                  />
                  <Label htmlFor="logo" className="font-medium cursor-pointer">Logo & Brand Assets</Label>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-8 gap-1"
                  onClick={() => handleUpload('logo')}
                >
                  <Upload className="h-3.5 w-3.5" />
                  Upload
                </Button>
              </div>
              <p className="text-xs text-muted-foreground ml-6">
                Include your logo, color palette, and other brand elements.
              </p>
            </div>

            <div className="flex flex-col space-y-3 p-4 rounded-lg bg-muted/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="images"
                    checked={creativeAssets.images}
                    onCheckedChange={(checked) => handleCheckboxChange('images', checked as boolean)}
                  />
                  <Label htmlFor="images" className="font-medium cursor-pointer">Product Images</Label>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-8 gap-1"
                  onClick={() => handleUpload('images')}
                >
                  <Image className="h-3.5 w-3.5" />
                  Upload
                </Button>
              </div>
              <p className="text-xs text-muted-foreground ml-6">
                High-quality images of your product from different angles.
              </p>
            </div>

            <div className="flex flex-col space-y-3 p-4 rounded-lg bg-muted/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="videos"
                    checked={creativeAssets.videos}
                    onCheckedChange={(checked) => handleCheckboxChange('videos', checked as boolean)}
                  />
                  <Label htmlFor="videos" className="font-medium cursor-pointer">Product Videos/Demos</Label>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-8 gap-1"
                  onClick={() => handleUpload('videos')}
                >
                  <FileVideo className="h-3.5 w-3.5" />
                  Upload
                </Button>
              </div>
              <p className="text-xs text-muted-foreground ml-6">
                Promotional videos, demonstrations, or tutorials.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="descriptions">Product Descriptions <span className="text-destructive">*</span></Label>
          <Textarea
            id="descriptions"
            value={creativeAssets.descriptions}
            onChange={handleDescriptionChange}
            placeholder="Enter key product descriptions for marketing materials"
            className="min-h-[150px] w-full transition-all focus-within:ring-1 focus-within:ring-primary/20"
            required
          />
          <p className="text-xs text-muted-foreground">
            Include product taglines, short descriptions, and key selling points.
          </p>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <span className="text-destructive">*</span> Required fields
        </div>
      </CardContent>
    </Card>
  );
};

export default StepThree;

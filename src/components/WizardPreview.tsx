
import React from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Download, Share2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface WizardPreviewProps {
  onClose: () => void;
}

const WizardPreview: React.FC<WizardPreviewProps> = ({ onClose }) => {
  const { wizardData } = useWizard();
  const { 
    productDetails, 
    marketingStrategy, 
    creativeAssets, 
    launchTimeline, 
    distributionPlan 
  } = wizardData;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[90vh] shadow-lg overflow-hidden animate-scale-in">
        <CardHeader className="border-b px-6 py-4 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Launch Plan Preview</CardTitle>
            <CardDescription>
              Review your product launch plan before finalizing
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        
        <ScrollArea className="h-[calc(90vh-120px)]">
          <CardContent className="p-6 space-y-8">
            {/* Product Summary Section */}
            <div>
              <h3 className="text-xl font-semibold mb-1">Product Summary</h3>
              <Separator className="mb-4" />
              
              <div className="grid grid-cols-1 gap-4 text-muted-foreground">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Product Name</h4>
                  <p>{productDetails.name || "Not specified"}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground">Product Description</h4>
                  <p className="whitespace-pre-line">{productDetails.description || "Not specified"}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Category</h4>
                    <p>{productDetails.category || "Not specified"}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Target Audience</h4>
                    <p>{productDetails.targetAudience || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Marketing Strategy Section */}
            <div>
              <h3 className="text-xl font-semibold mb-1">Marketing Strategy</h3>
              <Separator className="mb-4" />
              
              <div className="grid grid-cols-1 gap-4 text-muted-foreground">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Objective</h4>
                  <p className="whitespace-pre-line">{marketingStrategy.objective || "Not specified"}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground">Marketing Channels</h4>
                  {marketingStrategy.channels.length > 0 ? (
                    <ul className="list-disc pl-5 pt-1 space-y-1">
                      {marketingStrategy.channels.map((channel) => (
                        <li key={channel}>{channel.replace('_', ' ')}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No channels selected</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Budget</h4>
                    <p>{marketingStrategy.budget || "Not specified"}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Timeline</h4>
                    <p>{marketingStrategy.timeline || "Not specified"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Creative Assets Section */}
            <div>
              <h3 className="text-xl font-semibold mb-1">Creative Assets</h3>
              <Separator className="mb-4" />
              
              <div className="grid grid-cols-1 gap-4 text-muted-foreground">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Asset Checklist</h4>
                  <ul className="list-disc pl-5 pt-1 space-y-1">
                    <li className={creativeAssets.logo ? "" : "line-through opacity-50"}>
                      Logo & Brand Assets {creativeAssets.logo ? "✓" : ""}
                    </li>
                    <li className={creativeAssets.images ? "" : "line-through opacity-50"}>
                      Product Images {creativeAssets.images ? "✓" : ""}
                    </li>
                    <li className={creativeAssets.videos ? "" : "line-through opacity-50"}>
                      Product Videos/Demos {creativeAssets.videos ? "✓" : ""}
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground">Product Descriptions</h4>
                  <p className="whitespace-pre-line">{creativeAssets.descriptions || "Not specified"}</p>
                </div>
              </div>
            </div>
            
            {/* Launch Timeline Section */}
            <div>
              <h3 className="text-xl font-semibold mb-1">Launch Timeline</h3>
              <Separator className="mb-4" />
              
              <div className="grid grid-cols-1 gap-4 text-muted-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Pre-launch Date</h4>
                    <p>
                      {launchTimeline.prelaunchDate 
                        ? format(new Date(launchTimeline.prelaunchDate), "PPP") 
                        : "Not specified"}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Launch Date</h4>
                    <p>
                      {launchTimeline.launchDate 
                        ? format(new Date(launchTimeline.launchDate), "PPP") 
                        : "Not specified"}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground">Post-launch Activities</h4>
                  {launchTimeline.postLaunchActivities.length > 0 ? (
                    <ul className="list-disc pl-5 pt-1 space-y-1">
                      {launchTimeline.postLaunchActivities.map((activity) => (
                        <li key={activity}>{activity.replace('_', ' ')}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No activities selected</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Distribution Plan Section */}
            <div>
              <h3 className="text-xl font-semibold mb-1">Distribution Plan</h3>
              <Separator className="mb-4" />
              
              <div className="grid grid-cols-1 gap-4 text-muted-foreground">
                <div>
                  <h4 className="text-sm font-medium text-foreground">Distribution Channels</h4>
                  {distributionPlan.channels.length > 0 ? (
                    <ul className="list-disc pl-5 pt-1 space-y-1">
                      {distributionPlan.channels.map((channel) => (
                        <li key={channel}>{channel.replace('_', ' ')}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No channels selected</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground">Strategic Partnerships</h4>
                  <p className="whitespace-pre-line">{distributionPlan.partnerships || "Not specified"}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-foreground">Pricing Strategy</h4>
                  <p className="whitespace-pre-line">{distributionPlan.pricing || "Not specified"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </ScrollArea>
        
        <div className="border-t p-4 flex items-center justify-end gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Plan
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
            Close Preview
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WizardPreview;

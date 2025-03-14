
import React from 'react';
import { useWizard } from '@/contexts/WizardContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const postLaunchActivities = [
  { id: 'follow_up', label: 'Customer Follow-up' },
  { id: 'feedback', label: 'Collect User Feedback' },
  { id: 'updates', label: 'Product Updates/Improvements' },
  { id: 'social', label: 'Social Media Engagement' },
  { id: 'reviews', label: 'Request Reviews/Testimonials' },
  { id: 'promotion', label: 'Ongoing Promotion' },
];

const StepFour: React.FC = () => {
  const { wizardData, updateWizardData } = useWizard();
  const { launchTimeline } = wizardData;

  const handleDateChange = (field: 'prelaunchDate' | 'launchDate', date: Date | undefined) => {
    if (date) {
      updateWizardData({
        launchTimeline: {
          ...launchTimeline,
          [field]: date.toISOString(),
        },
      });
    }
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    let updatedActivities = [...launchTimeline.postLaunchActivities];
    
    if (checked) {
      updatedActivities.push(id);
    } else {
      updatedActivities = updatedActivities.filter(activity => activity !== id);
    }
    
    updateWizardData({
      launchTimeline: {
        ...launchTimeline,
        postLaunchActivities: updatedActivities,
      },
    });
  };

  return (
    <Card className="w-full shadow-sm animate-slide-in-up glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-balance">Launch Timeline</CardTitle>
        <CardDescription>
          Set your product launch schedule and plan post-launch activities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="prelaunchDate">Pre-launch Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="prelaunchDate"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !launchTimeline.prelaunchDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {launchTimeline.prelaunchDate ? (
                  format(new Date(launchTimeline.prelaunchDate), "PPP")
                ) : (
                  <span>Select pre-launch date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={launchTimeline.prelaunchDate ? new Date(launchTimeline.prelaunchDate) : undefined}
                onSelect={(date) => handleDateChange('prelaunchDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground">
            The date you'll start teasing or marketing your product before the official launch.
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="launchDate">Launch Date <span className="text-destructive">*</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="launchDate"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !launchTimeline.launchDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {launchTimeline.launchDate ? (
                  format(new Date(launchTimeline.launchDate), "PPP")
                ) : (
                  <span>Select launch date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={launchTimeline.launchDate ? new Date(launchTimeline.launchDate) : undefined}
                onSelect={(date) => handleDateChange('launchDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground">
            The official date when your product will be available to the public.
          </p>
        </div>

        <div className="space-y-3">
          <Label>Post-launch Activities</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {postLaunchActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-2">
                <Checkbox
                  id={activity.id}
                  checked={launchTimeline.postLaunchActivities.includes(activity.id)}
                  onCheckedChange={(checked) => handleCheckboxChange(activity.id, checked as boolean)}
                />
                <Label
                  htmlFor={activity.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {activity.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <span className="text-destructive">*</span> Required fields
        </div>
      </CardContent>
    </Card>
  );
};

export default StepFour;

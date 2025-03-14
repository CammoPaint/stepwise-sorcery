
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadPlaceholderProps {
  className?: string;
  onUpload?: () => void;
  label?: string;
}

const UploadPlaceholder: React.FC<UploadPlaceholderProps> = ({
  className,
  onUpload,
  label = 'Upload file',
}) => {
  return (
    <Card
      className={cn(
        'relative overflow-hidden flex flex-col items-center justify-center p-6 border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/30 transition-all rounded-lg hover:bg-muted/20',
        className
      )}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-muted-foreground">
            Drag & drop or click to upload
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onUpload}>
          Browse files
        </Button>
      </div>
    </Card>
  );
};

export default UploadPlaceholder;

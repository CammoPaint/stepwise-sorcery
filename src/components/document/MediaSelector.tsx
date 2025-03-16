
import React, { useState } from 'react';
import { useMediaLibrary, MediaItem } from '@/contexts/MediaLibraryContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Library, X, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import MediaDialog from './MediaDialog';

interface MediaSelectorProps {
  onSelect: (mediaItem: MediaItem) => void;
  selectedMediaItem?: MediaItem | null;
  documentId?: string;
  className?: string;
  label?: string;
  type?: 'image' | 'logo';
}

const MediaSelector: React.FC<MediaSelectorProps> = ({
  onSelect,
  selectedMediaItem,
  documentId,
  className,
  label = 'Upload Media',
  type = 'image',
}) => {
  const { addMediaItem } = useMediaLibrary();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDirectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    try {
      setIsUploading(true);
      const file = e.target.files[0];
      // By default make document-specific uploads (not global)
      const newMediaItem = await addMediaItem(file, false, documentId, type);
      onSelect(newMediaItem);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectFromLibrary = (mediaItem: MediaItem) => {
    onSelect(mediaItem);
  };

  const handleRemove = () => {
    onSelect({} as MediaItem);
  };

  return (
    <>
      {selectedMediaItem?.url ? (
        <Card className={cn("relative overflow-hidden group", className)}>
          <div className="aspect-square relative">
            <img 
              src={selectedMediaItem.url} 
              alt={selectedMediaItem.name || "Selected media"} 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className="h-8"
                onClick={() => setIsDialogOpen(true)}
              >
                <Library className="h-3.5 w-3.5 mr-1" />
                Change
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                className="h-8"
                onClick={handleRemove}
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card
          className={cn(
            "relative overflow-hidden flex flex-col items-center justify-center p-6 border-2 border-dashed border-muted-foreground/20 hover:border-muted-foreground/30 transition-all rounded-lg hover:bg-muted/20",
            className
          )}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Image className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">
                Drag & drop or choose an option
              </p>
            </div>
            <div className="flex gap-2 mt-2">
              <Button asChild variant="outline" size="sm" disabled={isUploading}>
                <label className="cursor-pointer">
                  <Upload className="h-3.5 w-3.5 mr-1" />
                  {isUploading ? 'Uploading...' : 'Upload'}
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleDirectUpload}
                    disabled={isUploading}
                  />
                </label>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsDialogOpen(true)}
              >
                <Library className="h-3.5 w-3.5 mr-1" />
                Select
              </Button>
            </div>
          </div>
        </Card>
      )}

      <MediaDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSelect={handleSelectFromLibrary}
        documentId={documentId}
      />
    </>
  );
};

export default MediaSelector;

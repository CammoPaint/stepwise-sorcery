
import React, { useState } from 'react';
import { useMediaLibrary, MediaItem } from '@/contexts/MediaLibraryContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Image, Library } from 'lucide-react';
import MediaLibrary from './MediaLibrary';

interface MediaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (mediaItem: MediaItem) => void;
  documentId?: string;
}

const MediaDialog: React.FC<MediaDialogProps> = ({
  isOpen,
  onClose,
  onSelect,
  documentId,
}) => {
  const { addMediaItem } = useMediaLibrary();
  const [activeTab, setActiveTab] = useState('library');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isGlobal, setIsGlobal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSelect = (mediaItem: MediaItem) => {
    setSelectedItem(mediaItem);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    try {
      setIsUploading(true);
      const file = e.target.files[0];
      const newMediaItem = await addMediaItem(
        file,
        isGlobal,
        isGlobal ? undefined : documentId
      );
      setSelectedItem(newMediaItem);
      setActiveTab('library');
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const confirmSelection = () => {
    if (selectedItem) {
      onSelect(selectedItem);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid grid-cols-2 w-60 mb-4">
            <TabsTrigger value="library">
              <Library className="h-4 w-4 mr-2" />
              Library
            </TabsTrigger>
            <TabsTrigger value="upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="library" className="flex-1 overflow-auto">
            <MediaLibrary 
              documentId={documentId} 
              onSelect={handleSelect} 
              selectable={true} 
            />
          </TabsContent>
          
          <TabsContent value="upload" className="flex-1 overflow-auto">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center hover:border-primary/50 transition-all">
                <Image className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Drag and drop files here</p>
                  <p className="text-xs text-muted-foreground">
                    Support for JPG, PNG and GIF files up to 5MB
                  </p>
                  <Button asChild variant="secondary" disabled={isUploading}>
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      {isUploading ? 'Uploading...' : 'Browse Files'}
                      <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={isUploading}
                      />
                    </Label>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="global-media"
                  checked={isGlobal}
                  onChange={(e) => setIsGlobal(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="global-media">
                  Make available in all documents (global media)
                </Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={confirmSelection} 
            disabled={!selectedItem}
          >
            Select Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MediaDialog;

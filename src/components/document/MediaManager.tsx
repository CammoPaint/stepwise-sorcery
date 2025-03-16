
import React, { useState } from 'react';
import { useMediaLibrary, MediaItem } from '@/contexts/MediaLibraryContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, FileImage, Globe, Library } from 'lucide-react';
import MediaLibrary from './MediaLibrary';

const MediaManager: React.FC = () => {
  const { addMediaItem } = useMediaLibrary();
  const [isUploading, setIsUploading] = useState(false);
  const [isGlobal, setIsGlobal] = useState(true);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    try {
      setIsUploading(true);
      const file = e.target.files[0];
      await addMediaItem(file, isGlobal);
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Library className="h-5 w-5" />
          Media Library
        </CardTitle>
        <CardDescription>
          Manage your media assets across all documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="library">
          <TabsList className="mb-4">
            <TabsTrigger value="library">All Media</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="library">
            <MediaLibrary />
          </TabsContent>
          
          <TabsContent value="upload">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center hover:border-primary/50 transition-all">
                <FileImage className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Drag and drop files here</p>
                  <p className="text-xs text-muted-foreground">
                    Support for JPG, PNG and GIF files up to 5MB
                  </p>
                  <Button asChild variant="secondary" disabled={isUploading}>
                    <Label htmlFor="file-upload-manager" className="cursor-pointer">
                      {isUploading ? 'Uploading...' : 'Browse Files'}
                      <input
                        id="file-upload-manager"
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
                  id="global-media-manager"
                  checked={isGlobal}
                  onChange={(e) => setIsGlobal(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="global-media-manager" className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" />
                  Make available in all documents (global media)
                </Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MediaManager;

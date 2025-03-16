
import React, { useState } from 'react';
import { useMediaLibrary, MediaItem } from '@/contexts/MediaLibraryContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Trash2, Globe, FileImage, File } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MediaLibraryProps {
  documentId?: string;
  onSelect?: (mediaItem: MediaItem) => void;
  selectable?: boolean;
  showGlobalOnly?: boolean;
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({
  documentId,
  onSelect,
  selectable = false,
  showGlobalOnly = false,
}) => {
  const { mediaItems, searchMedia, deleteMediaItem } = useMediaLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const filteredItems = searchQuery 
    ? searchMedia(searchQuery)
    : showGlobalOnly 
      ? mediaItems.filter(item => item.isGlobal)
      : documentId
        ? mediaItems.filter(item => item.isGlobal || item.documentId === documentId)
        : mediaItems;

  const handleSelect = (item: MediaItem) => {
    setSelectedItem(item.id);
    if (onSelect) {
      onSelect(item);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteMediaItem(id);
  };

  const getSizeLabel = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search media..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center p-8 text-muted-foreground">
          <FileImage className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
          <p>No media items found</p>
          <p className="text-sm mt-1">
            {searchQuery ? 'Try a different search term' : 'Upload some images to get started'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "overflow-hidden hover:shadow-md transition-all border",
                selectable && "cursor-pointer hover:border-primary/50",
                selectedItem === item.id && "ring-2 ring-primary"
              )}
              onClick={selectable ? () => handleSelect(item) : undefined}
            >
              <div className="aspect-square relative overflow-hidden bg-muted">
                {item.url ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <File className="h-10 w-10 text-muted-foreground/40" />
                  </div>
                )}
                {item.isGlobal && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-primary/90 text-white text-xs px-1.5 py-0.5 rounded-sm flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      Global
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-3">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-medium truncate" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(item.createdAt), 'MMM d, yyyy')}
                      {item.size && ` • ${getSizeLabel(item.size)}`}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={(e) => handleDelete(item.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;

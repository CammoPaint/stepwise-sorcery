
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
  isGlobal: boolean; // true if available to all documents, false if specific to a document
  documentId?: string; // only set if isGlobal is false
  type: 'image' | 'logo';
  size?: number; // file size in bytes
};

type MediaLibraryContextType = {
  mediaItems: MediaItem[];
  addMediaItem: (
    file: File, 
    isGlobal: boolean, 
    documentId?: string, 
    type?: 'image' | 'logo'
  ) => Promise<MediaItem>;
  deleteMediaItem: (id: string) => void;
  getDocumentMedia: (documentId: string) => MediaItem[];
  getGlobalMedia: () => MediaItem[];
  searchMedia: (query: string) => MediaItem[];
};

const MediaLibraryContext = createContext<MediaLibraryContextType | undefined>(undefined);

// Sample data
const defaultMediaItems: MediaItem[] = [
  {
    id: '1',
    name: 'Company Logo',
    url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    createdAt: new Date('2023-05-10'),
    isGlobal: true,
    type: 'logo',
  },
  {
    id: '2',
    name: 'Business Meeting',
    url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    createdAt: new Date('2023-05-15'),
    isGlobal: true,
    type: 'image',
  },
  {
    id: '3',
    name: 'Technology Background',
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    createdAt: new Date('2023-05-20'),
    isGlobal: true,
    type: 'image',
  },
];

export const MediaLibraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(defaultMediaItems);

  const addMediaItem = async (
    file: File, 
    isGlobal: boolean, 
    documentId?: string, 
    type: 'image' | 'logo' = 'image'
  ): Promise<MediaItem> => {
    // In a real application, this would upload to a server or cloud storage
    // Here we'll create a local URL
    const fileUrl = URL.createObjectURL(file);
    
    const newItem: MediaItem = {
      id: Date.now().toString(),
      name: file.name,
      url: fileUrl,
      createdAt: new Date(),
      isGlobal,
      documentId,
      type,
      size: file.size,
    };

    setMediaItems((prev) => [...prev, newItem]);
    return newItem;
  };

  const deleteMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getDocumentMedia = (documentId: string) => {
    return mediaItems.filter(
      (item) => item.isGlobal || item.documentId === documentId
    );
  };

  const getGlobalMedia = () => {
    return mediaItems.filter((item) => item.isGlobal);
  };

  const searchMedia = (query: string) => {
    if (!query.trim()) return mediaItems;
    const lowerQuery = query.toLowerCase();
    return mediaItems.filter((item) => 
      item.name.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <MediaLibraryContext.Provider
      value={{
        mediaItems,
        addMediaItem,
        deleteMediaItem,
        getDocumentMedia,
        getGlobalMedia,
        searchMedia,
      }}
    >
      {children}
    </MediaLibraryContext.Provider>
  );
};

export const useMediaLibrary = () => {
  const context = useContext(MediaLibraryContext);
  if (context === undefined) {
    throw new Error('useMediaLibrary must be used within a MediaLibraryProvider');
  }
  return context;
};

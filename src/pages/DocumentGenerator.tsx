
import React from 'react';
import DocumentDashboard from '@/components/document/DocumentDashboard';
import { DocumentProvider } from '@/contexts/DocumentContext';
import { MediaLibraryProvider } from '@/contexts/MediaLibraryContext';

const DocumentGenerator = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <MediaLibraryProvider>
        <DocumentProvider>
          <DocumentDashboard />
        </DocumentProvider>
      </MediaLibraryProvider>
    </main>
  );
};

export default DocumentGenerator;

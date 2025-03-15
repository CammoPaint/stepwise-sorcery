
import React from 'react';
import DocumentDashboard from '@/components/document/DocumentDashboard';
import { DocumentProvider } from '@/contexts/DocumentContext';

const DocumentGenerator = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <DocumentProvider>
        <DocumentDashboard />
      </DocumentProvider>
    </main>
  );
};

export default DocumentGenerator;

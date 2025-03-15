
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocument } from '@/contexts/DocumentContext';
import DocumentList from './DocumentList';
import TemplateGallery from './TemplateGallery';
import DocumentEditor from './DocumentEditor';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft, Save, Download, Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import NewDocumentForm from './NewDocumentForm';

const DocumentDashboard = () => {
  const { state, saveDocument, exportDocument } = useDocument();
  const { selectedDocument } = state;
  const [isNewDocumentDialogOpen, setIsNewDocumentDialogOpen] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Document Generator</h1>
        </div>
        
        <Dialog open={isNewDocumentDialogOpen} onOpenChange={setIsNewDocumentDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Document</DialogTitle>
              <DialogDescription>
                Choose a template and enter basic information to get started.
              </DialogDescription>
            </DialogHeader>
            <NewDocumentForm onClose={() => setIsNewDocumentDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {selectedDocument ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{selectedDocument.title}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => saveDocument()} className="gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" onClick={() => exportDocument('pdf')} className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          <DocumentEditor />
        </div>
      ) : (
        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="documents">My Documents</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <TabsContent value="documents" className="space-y-6">
            <DocumentList />
          </TabsContent>
          <TabsContent value="templates" className="space-y-6">
            <TemplateGallery onSelectTemplate={() => setIsNewDocumentDialogOpen(true)} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default DocumentDashboard;

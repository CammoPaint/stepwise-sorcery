
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Document types
export type DocumentTemplate = {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
};

export type DocumentCategory = {
  id: string;
  name: string;
  icon: string;
};

export type Document = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  templateId: string;
  category: string;
  content: string;
  status: 'draft' | 'completed';
  collaborators: string[];
  version: number;
};

export type DocumentState = {
  templates: DocumentTemplate[];
  categories: DocumentCategory[];
  documents: Document[];
  selectedDocument: Document | null;
  selectedTemplate: DocumentTemplate | null;
};

type DocumentContextType = {
  state: DocumentState;
  setSelectedTemplate: (template: DocumentTemplate | null) => void;
  setSelectedDocument: (document: Document | null) => void;
  createDocument: (templateId: string, title: string) => Document;
  updateDocument: (document: Partial<Document>) => void;
  saveDocument: () => void;
  exportDocument: (format: 'pdf' | 'docx' | 'gdoc') => void;
  deleteDocument: (id: string) => void;
};

// Sample data
const defaultCategories: DocumentCategory[] = [
  { id: '1', name: 'Business Plans', icon: 'file-text' },
  { id: '2', name: 'Contracts', icon: 'file-pen' },
  { id: '3', name: 'Marketing Materials', icon: 'presentation' },
  { id: '4', name: 'Financial Reports', icon: 'bar-chart' },
  { id: '5', name: 'Legal Documents', icon: 'gavel' },
];

const defaultTemplates: DocumentTemplate[] = [
  {
    id: '1',
    name: 'Startup Business Plan',
    category: '1',
    description: 'A comprehensive business plan template for startups seeking funding.',
    thumbnail: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Freelance Contract',
    category: '2',
    description: 'A standard contract for freelance services with customizable terms.',
    thumbnail: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Investor Pitch Deck',
    category: '3',
    description: 'A professional pitch deck template for presenting to potential investors.',
    thumbnail: '/placeholder.svg',
  },
  {
    id: '4',
    name: 'Non-Disclosure Agreement',
    category: '5',
    description: 'A standard NDA template to protect your confidential information.',
    thumbnail: '/placeholder.svg',
  },
  {
    id: '5',
    name: 'Financial Projection',
    category: '4',
    description: 'A template for creating financial projections for your business.',
    thumbnail: '/placeholder.svg',
  },
];

const defaultDocuments: Document[] = [
  {
    id: '1',
    title: 'My Business Plan',
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-17'),
    templateId: '1',
    category: '1',
    content: 'This is a sample business plan content...',
    status: 'draft',
    collaborators: [],
    version: 1,
  },
];

const defaultState: DocumentState = {
  templates: defaultTemplates,
  categories: defaultCategories,
  documents: defaultDocuments,
  selectedDocument: null,
  selectedTemplate: null,
};

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DocumentState>(defaultState);

  const setSelectedTemplate = (template: DocumentTemplate | null) => {
    setState((prev) => ({ ...prev, selectedTemplate: template }));
  };

  const setSelectedDocument = (document: Document | null) => {
    setState((prev) => ({ ...prev, selectedDocument: document }));
  };

  const createDocument = (templateId: string, title: string): Document => {
    const newDocument: Document = {
      id: Date.now().toString(),
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
      templateId,
      category: state.templates.find(t => t.id === templateId)?.category || '1',
      content: '',
      status: 'draft',
      collaborators: [],
      version: 1,
    };

    setState((prev) => ({
      ...prev,
      documents: [...prev.documents, newDocument],
      selectedDocument: newDocument,
    }));

    return newDocument;
  };

  const updateDocument = (documentUpdate: Partial<Document>) => {
    if (!state.selectedDocument) return;

    const updatedDocument = {
      ...state.selectedDocument,
      ...documentUpdate,
      updatedAt: new Date(),
    };

    setState((prev) => ({
      ...prev,
      documents: prev.documents.map((doc) =>
        doc.id === updatedDocument.id ? updatedDocument : doc
      ),
      selectedDocument: updatedDocument,
    }));
  };

  const saveDocument = () => {
    if (!state.selectedDocument) return;

    const updatedDocument = {
      ...state.selectedDocument,
      updatedAt: new Date(),
      version: state.selectedDocument.version + 1,
    };

    setState((prev) => ({
      ...prev,
      documents: prev.documents.map((doc) =>
        doc.id === updatedDocument.id ? updatedDocument : doc
      ),
      selectedDocument: updatedDocument,
    }));
  };

  const exportDocument = (format: 'pdf' | 'docx' | 'gdoc') => {
    // In a real app, this would trigger a document export
    console.log(`Exporting document to ${format}...`);
  };

  const deleteDocument = (id: string) => {
    setState((prev) => ({
      ...prev,
      documents: prev.documents.filter((doc) => doc.id !== id),
      selectedDocument: prev.selectedDocument?.id === id ? null : prev.selectedDocument,
    }));
  };

  return (
    <DocumentContext.Provider
      value={{
        state,
        setSelectedTemplate,
        setSelectedDocument,
        createDocument,
        updateDocument,
        saveDocument,
        exportDocument,
        deleteDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};

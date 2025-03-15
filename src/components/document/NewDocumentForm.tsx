
import React, { useState } from 'react';
import { useDocument } from '@/contexts/DocumentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface NewDocumentFormProps {
  onClose: () => void;
}

const NewDocumentForm: React.FC<NewDocumentFormProps> = ({ onClose }) => {
  const { state, createDocument, setSelectedTemplate } = useDocument();
  const { selectedTemplate, templates } = state;
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState(selectedTemplate?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title is required",
        description: "Please enter a title for your document",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTemplateId) {
      toast({
        title: "Template selection required",
        description: "Please select a template for your document",
        variant: "destructive",
      });
      return;
    }

    const newDocument = createDocument(selectedTemplateId, title);
    
    // Clear the selected template after creating the document
    setSelectedTemplate(null);
    
    toast({
      title: "Document created",
      description: `Your document "${title}" has been created successfully.`,
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Document Title</Label>
        <Input 
          id="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter a title for your document"
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="template">Template</Label>
        <div className="grid grid-cols-2 gap-2">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-md p-3 cursor-pointer transition-colors ${
                selectedTemplateId === template.id 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedTemplateId(template.id)}
            >
              <div className="font-medium">{template.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{template.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industry (Optional)</Label>
        <Input 
          id="industry" 
          value={industry} 
          onChange={(e) => setIndustry(e.target.value)} 
          placeholder="e.g., Technology, Retail, Healthcare"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Initial Brief (Optional)</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Briefly describe what this document is for..."
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          This will help our AI generate more relevant content for your document.
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Document</Button>
      </div>
    </form>
  );
};

export default NewDocumentForm;

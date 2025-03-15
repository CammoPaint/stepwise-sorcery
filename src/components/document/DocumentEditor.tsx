
import React, { useState } from 'react';
import { useDocument } from '@/contexts/DocumentContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, UserPlus, MessageSquare, Image, Table, BarChart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import UploadPlaceholder from '@/components/UploadPlaceholder';

const DocumentEditor = () => {
  const { state, updateDocument } = useDocument();
  const { selectedDocument } = state;
  const [content, setContent] = useState(selectedDocument?.content || '');

  if (!selectedDocument) {
    return null;
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    updateDocument({ content: e.target.value });
  };

  const handleAiSuggestion = () => {
    // In a real app, this would call an AI service
    updateDocument({
      content: content + "\n\nAI Suggestion: Consider adding a section about your target market and competitive analysis."
    });
    setContent(selectedDocument.content);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-4">
        <Card>
          <CardContent className="p-4">
            <Tabs defaultValue="editor">
              <TabsList className="mb-4">
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="editor" className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Button variant="outline" size="sm">
                    <Image className="h-4 w-4 mr-1" />
                    Image
                  </Button>
                  <Button variant="outline" size="sm">
                    <Table className="h-4 w-4 mr-1" />
                    Table
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart className="h-4 w-4 mr-1" />
                    Chart
                  </Button>
                  <Button onClick={handleAiSuggestion} variant="outline" size="sm" className="ml-auto">
                    <Sparkles className="h-4 w-4 mr-1" />
                    AI Suggest
                  </Button>
                </div>
                
                <Textarea
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Start typing your document content here..."
                  className="min-h-[400px] font-sans"
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="border rounded-md p-4 min-h-[400px]">
                  <div className="prose max-w-none">
                    {content ? (
                      <div className="whitespace-pre-line">{content}</div>
                    ) : (
                      <div className="text-muted-foreground italic">
                        Document preview will appear here.
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-3">Branding & Media</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UploadPlaceholder label="Upload Logo" />
              <UploadPlaceholder label="Upload Media" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-3">Document Info</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">Last Updated</span>
                <p>{format(new Date(selectedDocument.updatedAt), 'PPP p')}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Status</span>
                <div className="mt-1">
                  <Badge variant={selectedDocument.status === 'draft' ? 'secondary' : 'default'}>
                    {selectedDocument.status === 'draft' ? 'Draft' : 'Completed'}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Version</span>
                <p>{selectedDocument.version}.0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Collaborators</h3>
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4 mr-1" />
                Invite
              </Button>
            </div>
            {selectedDocument.collaborators.length > 0 ? (
              <div className="space-y-2">
                {selectedDocument.collaborators.map((collaborator, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-2">
                      {collaborator.charAt(0).toUpperCase()}
                    </div>
                    <div>{collaborator}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No collaborators yet. Invite team members to collaborate on this document.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">AI Suggestions</h3>
              <Button variant="outline" size="sm" onClick={handleAiSuggestion}>
                <Sparkles className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
            <div className="space-y-3">
              <div className="p-3 border border-blue-200 bg-blue-50 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Improve Introduction</span>
                </div>
                <p className="text-sm">Add a compelling executive summary to grab reader's attention.</p>
              </div>
              <div className="p-3 border border-blue-200 bg-blue-50 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Add Financial Section</span>
                </div>
                <p className="text-sm">Include projected revenue and cost estimates for the first year.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Comments</h3>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                Add Comment
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>No comments yet. Add a comment to provide feedback.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentEditor;

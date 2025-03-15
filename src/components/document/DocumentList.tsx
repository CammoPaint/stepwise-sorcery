
import React from 'react';
import { useDocument } from '@/contexts/DocumentContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Trash2, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const DocumentList = () => {
  const { state, setSelectedDocument, deleteDocument } = useDocument();
  const { documents, categories } = state;

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <FileText className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No documents yet</h3>
        <p className="text-muted-foreground mb-4 max-w-md">
          Create your first document by clicking the "New Document" button above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((document) => {
          const category = categories.find((c) => c.id === document.category);
          return (
            <Card key={document.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="line-clamp-1">{document.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {category?.name || 'Document'}
                      </Badge>
                      <Badge variant={document.status === 'draft' ? 'secondary' : 'default'} className="text-xs">
                        {document.status === 'draft' ? 'Draft' : 'Completed'}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  <span>Updated {format(new Date(document.updatedAt), 'MMM d, yyyy')}</span>
                </div>
                <Separator className="my-2" />
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Version {document.version} {document.collaborators.length > 0 && `• ${document.collaborators.length} collaborators`}
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedDocument(document)} 
                    className="gap-2"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => deleteDocument(document.id)}
                    className="text-destructive hover:text-destructive gap-2"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentList;

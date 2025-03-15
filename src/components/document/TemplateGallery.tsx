
import React, { useState } from 'react';
import { useDocument } from '@/contexts/DocumentContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { FileText, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface TemplateGalleryProps {
  onSelectTemplate: () => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  const { state, setSelectedTemplate } = useDocument();
  const { templates, categories } = state;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTemplates = selectedCategory
    ? templates.filter((template) => template.category === selectedCategory)
    : templates;

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      onSelectTemplate();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(null)}
          className="rounded-full"
        >
          All Templates
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="rounded-full"
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => {
          const category = categories.find((c) => c.id === template.category);
          return (
            <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <AspectRatio ratio={16 / 9}>
                <div className="h-full w-full bg-muted flex items-center justify-center">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
              </AspectRatio>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{category?.name}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground pb-2">
                <p className="line-clamp-2">{template.description}</p>
              </CardContent>
              <Separator />
              <CardFooter className="pt-4">
                <Button 
                  className="w-full gap-2" 
                  variant="outline"
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <PlusCircle className="h-4 w-4" />
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateGallery;

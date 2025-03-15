
import React from 'react';
import ProductLaunchWizard from '@/components/ProductLaunchWizard';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Business Tools</h1>
          <Link to="/documents">
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Document Generator
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <ProductLaunchWizard />
    </main>
  );
};

export default Index;

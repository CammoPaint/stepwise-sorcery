
import React, { useState } from 'react';
import { useDocument, DocumentAccess } from '@/contexts/DocumentContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Copy, Mail, Trash2, UserPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ open, onOpenChange }) => {
  const { state, shareDocument, removeCollaborator } = useDocument();
  const { selectedDocument } = state;
  
  const [email, setEmail] = useState('');
  const [access, setAccess] = useState<DocumentAccess>('view');
  
  if (!selectedDocument) return null;
  
  const handleShare = () => {
    if (!email.trim() || !selectedDocument) return;
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    shareDocument(selectedDocument.id, email, access);
    
    toast({
      title: "Invitation sent",
      description: `${email} has been invited to ${access} this document`,
    });
    
    setEmail('');
  };
  
  const handleCopyLink = () => {
    // In a real app, this would generate a shareable link
    const dummyLink = `https://yourdomain.com/documents/${selectedDocument.id}`;
    navigator.clipboard.writeText(dummyLink);
    
    toast({
      title: "Link copied",
      description: "Shareable link copied to clipboard",
    });
  };
  
  const handleRemoveCollaborator = (email: string) => {
    if (!selectedDocument) return;
    
    removeCollaborator(selectedDocument.id, email);
    
    toast({
      title: "Collaborator removed",
      description: `${email} has been removed from this document`,
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share "{selectedDocument.title}"</DialogTitle>
          <DialogDescription>
            Invite others to collaborate on this document
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 my-4">
          <Button variant="outline" className="flex-1 gap-2" onClick={handleCopyLink}>
            <Copy className="h-4 w-4" />
            Copy Link
          </Button>
          <Button className="flex-1 gap-2">
            <Mail className="h-4 w-4" />
            Email Link
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="flex gap-2">
              <Input
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={handleShare}>
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Permission</Label>
            <RadioGroup value={access} onValueChange={(value) => setAccess(value as DocumentAccess)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="view" id="view" />
                <Label htmlFor="view">Can view</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="edit" id="edit" />
                <Label htmlFor="edit">Can edit</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        {selectedDocument.collaborators.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">People with access</h3>
              <ul className="space-y-2 max-h-40 overflow-y-auto">
                {selectedDocument.collaborators.map((collaborator) => (
                  <li key={collaborator.email} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        {collaborator.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm">{collaborator.email}</p>
                        <div className="flex gap-2 items-center">
                          <Badge variant="outline" className="text-xs">
                            {collaborator.access === 'view' ? 'Viewer' : 'Editor'}
                          </Badge>
                          {collaborator.invitePending && (
                            <Badge variant="secondary" className="text-xs">Pending</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveCollaborator(collaborator.email)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;

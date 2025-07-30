import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from 'lucide-react';

export interface Template {
  title: string;
  description: string;
  icon: React.ElementType;
  tags: string[];
}

interface TemplatePreviewDialogProps {
  template: Template | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (template: Template) => void;
}

export function TemplatePreviewDialog({ template, open, onOpenChange, onConfirm }: TemplatePreviewDialogProps) {
  if (!template) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <template.icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl">{template.title}</DialogTitle>
              <DialogDescription>{template.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <h4 className="font-semibold">Template Preview</h4>
          <div className="bg-muted/50 rounded-lg p-4 border border-border aspect-video flex items-center justify-center">
            <p className="text-muted-foreground">Live preview placeholder for {template.title}</p>
          </div>
          <div className="flex gap-2">
            {template.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onConfirm(template)}>
            Confirm & Build <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
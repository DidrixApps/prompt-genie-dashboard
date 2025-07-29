import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Project } from '@/types';
import { useAuth } from "@/context/AuthContext";

interface EditProjectDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const updateProject = async (project: { id: number; name: string; description: string | null }) => {
  const { error } = await supabase
    .from('projects')
    .update({ name: project.name, description: project.description })
    .eq('id', project.id);

  if (error) throw new Error(error.message);
};

export function EditProjectDialog({ project, open, onOpenChange }: EditProjectDialogProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description || '');
    }
  }, [project]);

  const mutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      toast({
        title: "Project Updated!",
        description: "Your project details have been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
      onOpenChange(false);
    },
    onError: (err) => {
      toast({
        title: "Error updating project",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    mutation.mutate({ id: project.id, name, description });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project details here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>Cancel</Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
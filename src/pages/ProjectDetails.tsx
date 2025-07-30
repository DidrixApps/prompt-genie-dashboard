import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types';
import { Loader2, ArrowLeft, Smartphone, Calendar, Download, AlertCircle, Edit, Rocket, Wand2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getStatusColor } from '@/lib/utils';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { EditProjectDialog } from '@/components/EditProjectDialog';
import { useAuth } from '@/context/AuthContext';

const fetchProjectById = async (projectId: string): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();

  if (error) throw new Error(error.message);
  return data as Project;
};

const deployProject = async (projectId: number) => {
  const { error } = await supabase
    .from('projects')
    .update({ status: 'deployed' })
    .eq('id', projectId);
  if (error) throw new Error(error.message);
};

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editablePrompt, setEditablePrompt] = useState('');

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchProjectById(projectId!),
    enabled: !!projectId,
  });

  useEffect(() => {
    if (project?.prompt) {
      setEditablePrompt(project.prompt);
    }
  }, [project]);

  const deployMutation = useMutation({
    mutationFn: deployProject,
    onSuccess: () => {
      toast({
        title: "Deployment Started!",
        description: "Your app is being deployed and will be live shortly.",
      });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['userStats', user?.id] });
    },
    onError: (err) => {
      toast({ title: "Error deploying project", description: err.message, variant: "destructive" });
    },
  });

  const handleRegenerate = () => {
    toast({
      title: "Regeneration Started",
      description: "The AI is now regenerating your app with the updated prompt.",
    });
    // Here you would typically call a mutation to update the prompt and trigger regeneration
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="glass-card rounded-xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-6">
          Could not load project details. It may have been deleted or you may not have permission to view it.
        </p>
        <Link to="/projects/" className="btn-secondary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <>
      <EditProjectDialog
        project={project}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link to="/projects/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <Button variant="ghost" size="icon" onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          <Badge className={`text-base px-4 py-2 ${getStatusColor(project.status)}`}>
            {project.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>AI Prompt</CardTitle>
              <CardDescription>You can edit the prompt and regenerate your application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={editablePrompt}
                onChange={(e) => setEditablePrompt(e.target.value)}
                className="h-40 text-base"
                placeholder="Describe your app idea..."
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleRegenerate}>
                  <Wand2 className="w-4 h-4 mr-2" /> Regenerate
                </Button>
                {project.status !== 'deployed' && (
                  <Button onClick={() => deployMutation.mutate(project.id)} disabled={deployMutation.isPending}>
                    <Rocket className="w-4 h-4 mr-2" />
                    {deployMutation.isPending ? 'Deploying...' : 'Deploy'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center"><Smartphone className="w-4 h-4 mr-2" /> Framework</span>
                <span className="font-medium">{project.framework || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center"><Calendar className="w-4 h-4 mr-2" /> Created</span>
                <span className="font-medium">{format(new Date(project.created_at), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center"><Download className="w-4 h-4 mr-2" /> Downloads</span>
                <span className="font-medium">{project.downloads}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
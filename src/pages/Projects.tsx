import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Grid, List, Code, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Project, ProjectStatus } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectListItem } from '@/components/ProjectListItem';
import { NewProjectDialog } from '@/components/NewProjectDialog';
import { EditProjectDialog } from '@/components/EditProjectDialog';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const fetchProjects = async (userId: string): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Project[];
};

const deleteProject = async (projectId: number) => {
  const { error } = await supabase.from('projects').delete().eq('id', projectId);
  if (error) throw new Error(error.message);
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'all'>('all');
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false);
  const [selectedProjectForEdit, setSelectedProjectForEdit] = useState<Project | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects', user?.id],
    queryFn: () => fetchProjects(user!.id),
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast({ title: "Project deleted", description: "The project has been successfully deleted." });
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
    },
    onError: (err) => {
      toast({ title: "Error deleting project", description: err.message, variant: "destructive" });
    },
  });

  const handleAction = (action: string, projectId: number) => {
    if (action === 'View') {
      navigate(`/projects/${projectId}/`);
    } else if (action === 'Delete') {
      deleteMutation.mutate(projectId);
    } else if (action === 'Edit') {
      const projectToEdit = projects?.find(p => p.id === projectId);
      if (projectToEdit) {
        setSelectedProjectForEdit(projectToEdit);
        setIsEditProjectDialogOpen(true);
      }
    } else {
      toast({
        title: `Action: ${action}`,
        description: `This action is not yet implemented for project ID ${projectId}.`,
      });
    }
  };

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return !!matchesSearch && matchesFilter;
  }) ?? [];

  return (
    <div className="space-y-6">
      <NewProjectDialog 
        open={isNewProjectDialogOpen} 
        onOpenChange={setIsNewProjectDialogOpen}
        onProjectCreated={() => queryClient.invalidateQueries({ queryKey: ['projects', user?.id] })}
      />
      <EditProjectDialog
        project={selectedProjectForEdit}
        open={isEditProjectDialogOpen}
        onOpenChange={setIsEditProjectDialogOpen}
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Projects</h1>
          <p className="text-muted-foreground">Manage your AI-generated applications</p>
        </div>
        <button onClick={() => setIsNewProjectDialogOpen(true)} className="btn-primary flex items-center space-x-2">
          <Code className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="glass-card rounded-xl p-4">
        {/* Filter controls... */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as ProjectStatus | 'all')}
            className="px-4 py-2 bg-muted/50 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="deployed">Deployed</option>
            <option value="ready">Ready</option>
            <option value="in-progress">In Progress</option>
          </select>
          <div className="flex bg-muted rounded-lg p-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-background shadow-sm' : ''}`}>
              <Grid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-background shadow-sm' : ''}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}

      {error && (
        <div className="text-center py-12 text-destructive">
          <p>Error loading projects: {error.message}</p>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onAction={handleAction} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Project</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Framework</th>
                      <th className="text-left p-4 font-medium">Created</th>
                      <th className="text-left p-4 font-medium">Downloads</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <ProjectListItem key={project.id} project={project} onAction={handleAction} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try creating a new project to get started.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
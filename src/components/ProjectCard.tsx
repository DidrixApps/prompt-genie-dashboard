import { Project } from '@/types';
import { getStatusColor } from '@/lib/utils';
import { Smartphone, MoreHorizontal, Calendar, Download, Eye, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  onAction: (action: string, projectId: number) => void;
}

export function ProjectCard({ project, onAction }: ProjectCardProps) {
  return (
    <div className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-200 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-primary to-[hsl(242,74%,62%)] rounded-xl flex items-center justify-center">
          <Smartphone className="w-6 h-6 text-white" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAction('View', project.id)}>
              <Eye className="w-4 h-4 mr-2" /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction('Edit', project.id)}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction('Delete', project.id)} className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-grow">
        <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
      </div>

      <div className="space-y-4 mt-auto">
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <span className="text-xs text-muted-foreground">{project.framework || 'N/A'}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{format(new Date(project.created_at), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Download className="w-3 h-3" />
            <span>{project.downloads}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
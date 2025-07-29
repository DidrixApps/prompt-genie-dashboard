import { Project } from '@/types';
import { getStatusColor } from '@/lib/utils';
import { Smartphone, Eye, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface ProjectListItemProps {
  project: Project;
  onAction: (action: string, projectName: string) => void;
}

export function ProjectListItem({ project, onAction }: ProjectListItemProps) {
  return (
    <tr className="border-t border-border hover:bg-muted/25 transition-colors">
      <td className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-[hsl(242,74%,62%)] rounded-lg flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium">{project.name}</p>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </td>
      <td className="p-4 text-sm">{project.framework || 'N/A'}</td>
      <td className="p-4 text-sm text-muted-foreground">{format(new Date(project.created_at), 'MMM d, yyyy')}</td>
      <td className="p-4 text-sm">{project.downloads}</td>
      <td className="p-4">
        <div className="flex items-center space-x-2">
          <button onClick={() => onAction('View', project.name)} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={() => onAction('Edit', project.name)} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={() => onAction('Delete', project.name)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
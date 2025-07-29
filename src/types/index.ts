export type ProjectStatus = 'deployed' | 'ready' | 'in-progress';

export interface Project {
  id: number;
  created_at: string;
  user_id: string;
  name: string;
  description: string | null;
  prompt: string | null;
  status: ProjectStatus;
  framework: string | null;
  downloads: number;
}
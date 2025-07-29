export type ProjectStatus = 'deployed' | 'ready' | 'in-progress';

export interface Project {
  id: number;
  name: string;
  description: string;
  prompt: string;
  createdAt: string;
  status: ProjectStatus;
  framework: string;
  downloads: number;
}
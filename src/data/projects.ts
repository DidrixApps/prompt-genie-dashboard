import { Project } from '@/types';

export const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Weather App',
    description: 'A beautiful weather app with forecasts and alerts',
    prompt: 'Create a weather app with current conditions and 7-day forecast',
    createdAt: '2024-01-15',
    status: 'deployed',
    framework: 'React Native',
    downloads: 1250
  },
  {
    id: 2,
    name: 'Todo Manager',
    description: 'Task management app with categories and reminders',
    prompt: 'Build a todo app with categories, due dates, and priority levels',
    createdAt: '2024-01-12',
    status: 'ready',
    framework: 'Flutter',
    downloads: 890
  },
  {
    id: 3,
    name: 'Recipe Finder',
    description: 'Discover and save your favorite recipes',
    prompt: 'Create a recipe app with search, favorites, and meal planning',
    createdAt: '2024-01-10',
    status: 'in-progress',
    framework: 'React Native',
    downloads: 0
  },
  {
    id: 4,
    name: 'Fitness Tracker',
    description: 'Track workouts and monitor progress',
    prompt: 'Build a fitness app with workout tracking and statistics',
    createdAt: '2024-01-08',
    status: 'deployed',
    framework: 'Native iOS',
    downloads: 2100
  },
];
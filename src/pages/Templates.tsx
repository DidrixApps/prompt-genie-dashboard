import {
  CheckSquare,
  MessageSquare,
  ShoppingCart,
  HeartPulse,
  BookOpen,
  MessagesSquare,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const templates = [
  {
    title: 'Task Manager',
    description: 'A robust to-do list app with categories, priorities, and deadlines.',
    icon: CheckSquare,
    tags: ['Productivity', 'Utility'],
  },
  {
    title: 'Social Feed',
    description: 'A basic social media feed with posts, likes, and comments.',
    icon: MessageSquare,
    tags: ['Social', 'Content'],
  },
  {
    title: 'E-commerce Storefront',
    description: 'A clean storefront for selling products with a cart and checkout flow.',
    icon: ShoppingCart,
    tags: ['Business', 'E-commerce'],
  },
  {
    title: 'Workout Logger',
    description: 'Track your exercises, sets, reps, and progress over time.',
    icon: HeartPulse,
    tags: ['Health', 'Fitness'],
  },
  {
    title: 'Recipe Book',
    description: 'Save and organize your favorite recipes with ingredients and instructions.',
    icon: BookOpen,
    tags: ['Food', 'Lifestyle'],
  },
  {
    title: 'Real-time Chat',
    description: 'A messaging application with private and group chat functionality.',
    icon: MessagesSquare,
    tags: ['Communication', 'Social'],
  },
];

export default function Templates() {
  const { toast } = useToast();

  const handleUseTemplate = (title: string) => {
    toast({
      title: "Template selected!",
      description: `The "${title}" template will be available soon.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="text-muted-foreground">
          Start your next project with a pre-built template.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.title} className="glass-card rounded-xl p-6 flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <template.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex gap-2">
                {template.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold text-lg mb-2">{template.title}</h3>
              <p className="text-muted-foreground text-sm">{template.description}</p>
            </div>
            <div className="mt-6">
              <Button onClick={() => handleUseTemplate(template.title)} className="w-full">
                Use Template <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
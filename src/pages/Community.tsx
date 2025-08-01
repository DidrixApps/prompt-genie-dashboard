import { useState } from 'react';
import { ThumbsUp, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const initialFeaturedProjects = [
  {
    id: 1,
    name: 'Weatherly',
    author: 'Sarah J.',
    avatarFallback: 'SJ',
    description: 'A beautiful, minimalist weather app with hyper-local forecasts.',
    framework: 'React Native',
    likes: 128,
  },
  {
    id: 2,
    name: 'FinanceFlow',
    author: 'Mike R.',
    avatarFallback: 'MR',
    description: 'An intuitive expense tracker that helps you visualize your spending habits.',
    framework: 'Flutter',
    likes: 94,
  },
  {
    id: 3,
    name: 'SoundWave',
    author: 'Chloe B.',
    avatarFallback: 'CB',
    description: 'A music discovery platform that generates playlists based on your mood.',
    framework: 'SwiftUI',
    likes: 215,
  },
];

const discussions = [
  {
    id: 1,
    title: 'How do you handle state management in large apps?',
    author: 'Alex M.',
    avatarFallback: 'AM',
    replies: 15,
    lastReply: '2h ago',
  },
  {
    id: 2,
    title: 'Showcase: My new AI-generated portfolio website',
    author: 'Emily K.',
    avatarFallback: 'EK',
    replies: 8,
    lastReply: '5h ago',
  },
  {
    id: 3,
    title: 'Best practices for securing API keys on the client-side?',
    author: 'David L.',
    avatarFallback: 'DL',
    replies: 22,
    lastReply: '1d ago',
  },
];

export default function Community() {
  const { toast } = useToast();
  const [featuredProjects, setFeaturedProjects] = useState(initialFeaturedProjects);
  const [likedProjects, setLikedProjects] = useState<Record<number, boolean>>({});

  const handleLike = (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation(); // Prevent card click when liking
    const isLiked = likedProjects[projectId];
    
    setLikedProjects(prev => ({ ...prev, [projectId]: !isLiked }));
    
    setFeaturedProjects(projects => projects.map(p => 
      p.id === projectId ? { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const handleViewProject = (projectName: string) => {
    toast({
      title: `Viewing ${projectName}`,
      description: "This would navigate to the project's public showcase page.",
    });
  };

  const handleViewDiscussion = (discussionTitle: string) => {
    toast({
      title: `Opening Discussion`,
      description: `Navigating to thread: "${discussionTitle}"`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Community Hub</h1>
        <p className="text-muted-foreground">
          Connect with other builders and share your creations.
        </p>
      </div>

      {/* Featured Projects */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div 
              key={project.id} 
              className="glass-card rounded-xl p-6 flex flex-col cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => handleViewProject(project.name)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Avatar>
                  <AvatarImage src={`/avatars/${project.id}.png`} />
                  <AvatarFallback>{project.avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{project.author}</p>
                  <p className="text-xs text-muted-foreground">Community Member</p>
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-lg mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              </div>
              <div className="flex items-center justify-between text-sm mt-4">
                <Badge variant="outline">{project.framework}</Badge>
                <button 
                  onClick={(e) => handleLike(e, project.id)}
                  className={cn(
                    "flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors p-2 rounded-md -m-2",
                    likedProjects[project.id] && "text-primary"
                  )}
                >
                  <ThumbsUp className={cn("w-4 h-4", likedProjects[project.id] && "fill-primary")} />
                  <span>{project.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Discussions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Latest Discussions</h2>
        <div className="glass-card rounded-xl">
          <ul className="divide-y divide-border">
            {discussions.map((discussion) => (
              <li 
                key={discussion.id} 
                className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleViewDiscussion(discussion.title)}
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/avatars/discussion-${discussion.id}.png`} />
                    <AvatarFallback>{discussion.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{discussion.title}</p>
                    <p className="text-sm text-muted-foreground">
                      By {discussion.author}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{discussion.replies} replies</span>
                  </div>
                  <span>{discussion.lastReply}</span>
                  <Button variant="ghost" size="icon" className="pointer-events-none">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
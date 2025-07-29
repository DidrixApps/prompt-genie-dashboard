import { ThumbsUp, MessageCircle, ArrowRight, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const featuredProjects = [
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
            <div key={project.id} className="glass-card rounded-xl p-6 flex flex-col">
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
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{project.likes}</span>
                </div>
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
              <li key={discussion.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
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
                  <Button variant="ghost" size="icon">
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
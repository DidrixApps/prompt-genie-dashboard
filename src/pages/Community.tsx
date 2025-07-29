import { Users } from 'lucide-react';

export default function Community() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Community</h1>
        <p className="text-muted-foreground">
          Connect with other builders and share your creations.
        </p>
      </div>
      <div className="text-center py-24 glass-card rounded-xl">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          A space for creators to connect, share projects, and learn from each other is on its way. Join the conversation soon!
        </p>
      </div>
    </div>
  );
}
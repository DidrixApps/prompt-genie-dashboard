import { Code } from 'lucide-react';

export default function Templates() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="text-muted-foreground">
          Start your next project with a pre-built template.
        </p>
      </div>
      <div className="text-center py-24 glass-card rounded-xl">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Code className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We're building a library of ready-to-use templates to help you kickstart your app development. Stay tuned!
        </p>
      </div>
    </div>
  );
}
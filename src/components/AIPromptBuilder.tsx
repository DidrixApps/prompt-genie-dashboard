import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, Eye, Rocket, Sparkles, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FormattedAIResponse from '@/components/FormattedAIResponse';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const deployProject = async (projectId: number) => {
  const { error } = await supabase
    .from('projects')
    .update({ status: 'deployed' })
    .eq('id', projectId);

  if (error) throw new Error(error.message);
};

export function AIPromptBuilder() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const [newlyCreatedProjectId, setNewlyCreatedProjectId] = useState<number | null>(null);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deployMutation = useMutation({
    mutationFn: deployProject,
    onSuccess: (_, projectId) => {
      toast({
        title: "Deployment Started!",
        description: "Your app is being deployed and will be live shortly.",
      });
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId.toString()] });
      queryClient.invalidateQueries({ queryKey: ['userStats', user?.id] });
    },
    onError: (err) => {
      toast({
        title: "Error deploying project",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const handleGenerate = async () => {
    if (!prompt.trim() || !user) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate your app.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setShowTyping(true);
    setResponse('');
    setNewlyCreatedProjectId(null);

    const { data: newProject, error } = await supabase
      .from('projects')
      .insert({
        name: prompt.length > 50 ? prompt.substring(0, 47) + '...' : prompt,
        description: 'AI-generated application.',
        prompt: prompt,
        user_id: user.id,
        status: 'in-progress',
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error creating project",
        description: error.message,
        variant: "destructive",
      });
      setIsGenerating(false);
      setShowTyping(false);
      return;
    }

    toast({
      title: "Project Created!",
      description: `The project "${newProject.name}" is now in progress.`,
    });

    setNewlyCreatedProjectId(newProject.id);

    await queryClient.invalidateQueries({ queryKey: ['projects', user.id] });
    await queryClient.invalidateQueries({ queryKey: ['recentProjects', user.id] });
    await queryClient.invalidateQueries({ queryKey: ['projectCount', user.id] });
    await queryClient.invalidateQueries({ queryKey: ['userStats', user.id] });
    
    setTimeout(() => {
      const mockResponse = `I'll help you build "${prompt}". Here's what I can create for you:

🏗️ **App Structure:**
• Modern React Native interface
• User authentication system
• Data persistence with local storage

📱 **Core Features:**
• Clean, intuitive user interface
• Real-time data synchronization
• Push notifications

🎨 **Design Elements:**
• Modern Material Design
• Custom color scheme
• Smooth animations

This app will be production-ready. Would you like me to proceed?`;
      
      setResponse(mockResponse);
      setShowTyping(false);
      setIsGenerating(false);
    }, 2000);
  };

  const handlePreview = () => {
    if (newlyCreatedProjectId) {
      navigate(`/projects/${newlyCreatedProjectId}/`);
    }
  };

  const handleDeploy = () => {
    if (newlyCreatedProjectId) {
      deployMutation.mutate(newlyCreatedProjectId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Prompt Input */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-[hsl(242,74%,62%)] rounded-xl flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI App Builder</h2>
            <p className="text-muted-foreground text-sm">Describe your app idea and watch it come to life</p>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your app idea... (e.g., 'Create a todo app with reminders and categories')"
            className="w-full h-32 p-4 bg-muted/50 border border-border rounded-xl resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            disabled={isGenerating}
          />
          
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="absolute bottom-3 right-3 btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate App</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Quick ideas:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Todo app with categories',
              'Weather app with forecasts',
              'Recipe sharing platform',
              'Expense tracker',
              'Fitness workout planner'
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setPrompt(suggestion)}
                className="px-3 py-1 text-xs bg-muted rounded-full hover:bg-accent transition-colors"
                disabled={isGenerating}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Response */}
      {(response || showTyping) && (
        <div className="glass-card rounded-2xl p-6 animate-fade-in-up">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold">AI Assistant</h3>
          </div>

          {showTyping ? (
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
              </div>
              <span className="text-muted-foreground">AI is thinking...</span>
            </div>
          ) : (
            <FormattedAIResponse content={response} />
          )}
        </div>
      )}

      {/* Action Buttons */}
      {response && !showTyping && (
        <div className="flex items-center justify-between">
          <button onClick={handlePreview} className="btn-secondary flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>Preview Project</span>
          </button>
          
          <button onClick={handleDeploy} disabled={deployMutation.isPending} className="btn-primary flex items-center space-x-2">
            {deployMutation.isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Deploying...</span>
              </>
            ) : (
              <>
                <Rocket className="w-4 h-4" />
                <span>Deploy App</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
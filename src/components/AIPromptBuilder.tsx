import { useState } from 'react';
import { Send, Wand2, Save, Eye, Rocket, Sparkles, MessageSquare, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AIPromptBuilder() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState('');
  const [showTyping, setShowTyping] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate your app.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setShowTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const mockResponse = `I'll help you build "${prompt}". Here's what I can create for you:

🏗️ **App Structure:**
• Modern React Native interface
• User authentication system
• Data persistence with local storage
• Responsive design for all devices

📱 **Core Features:**
• Clean, intuitive user interface
• Real-time data synchronization
• Push notifications
• Offline functionality

🎨 **Design Elements:**
• Modern Material Design
• Custom color scheme
• Smooth animations
• Accessibility features

This app will be production-ready with industry best practices. Would you like me to proceed with the development?`;
      
      setResponse(mockResponse);
      setShowTyping(false);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSave = () => {
    toast({
      title: "Project saved!",
      description: "Your AI app prompt has been saved to your projects.",
    });
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

        {/* Quick Suggestions */}
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
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground font-sans">
                {response}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {response && !showTyping && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={handleSave} className="btn-secondary flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Project</span>
            </button>
            
            <button className="btn-secondary flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>

          <button className="btn-primary flex items-center space-x-2">
            <Rocket className="w-4 h-4" />
            <span>Deploy App</span>
          </button>
        </div>
      )}
    </div>
  );
}
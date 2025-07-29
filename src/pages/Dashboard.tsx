import { AIPromptBuilder } from '@/components/AIPromptBuilder';
import { MobilePreview } from '@/components/MobilePreview';
import { Zap, Users, Code, Rocket, TrendingUp, Clock } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Apps Created', value: '1,247', icon: Rocket, change: '+12%' },
    { label: 'Active Users', value: '8.5k', icon: Users, change: '+8%' },
    { label: 'Code Generated', value: '2.1M', icon: Code, change: '+23%' },
    { label: 'Deploy Time', value: '2.3s', icon: Clock, change: '-5%' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="relative h-48 md:h-64">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-[hsl(242,74%,62%)]/80 flex items-center">
            <div className="p-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Build Apps with AI
              </h1>
              <p className="text-lg opacity-90 mb-6 max-w-md">
                Transform your ideas into production-ready mobile apps using the power of artificial intelligence.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Production Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Prompt Builder */}
        <div className="lg:col-span-2">
          <AIPromptBuilder />
        </div>

        {/* Mobile Preview */}
        <div className="lg:col-span-1">
          <MobilePreview />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Generated', app: 'Weather App', time: '2 minutes ago', status: 'completed' },
            { action: 'Deployed', app: 'Todo Manager', time: '15 minutes ago', status: 'completed' },
            { action: 'Created', app: 'Recipe Finder', time: '1 hour ago', status: 'in-progress' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
                <div>
                  <p className="font-medium">{activity.action} "{activity.app}"</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activity.status === 'completed' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
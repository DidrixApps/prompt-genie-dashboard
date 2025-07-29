import { useQuery } from '@tanstack/react-query';
import { AIPromptBuilder } from '@/components/AIPromptBuilder';
import { MobilePreview } from '@/components/MobilePreview';
import { Zap, Rocket, TrendingUp, Clock, Loader2, CheckCircle, Download } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Project } from '@/types';
import { formatDistanceToNow } from 'date-fns';

const fetchProjects = async (userId: string): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) throw new Error(error.message);
  return data as Project[];
};

const fetchProjectCount = async (userId: string): Promise<number> => {
    const { count, error } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

    if (error) throw new Error(error.message);
    return count ?? 0;
};

interface UserStats {
  total_downloads: number;
  deployed_count: number;
  in_progress_count: number;
}

const fetchUserStats = async (userId: string): Promise<UserStats> => {
  const { data, error } = await supabase
    .rpc('get_user_stats', { p_user_id: userId })
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export default function Dashboard() {
  const { user } = useAuth();
  
  const { data: recentProjects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['recentProjects', user?.id],
    queryFn: () => fetchProjects(user!.id),
    enabled: !!user,
  });

  const { data: projectCount, isLoading: isLoadingCount } = useQuery({
    queryKey: ['projectCount', user?.id],
    queryFn: () => fetchProjectCount(user!.id),
    enabled: !!user,
  });

  const { data: userStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: () => fetchUserStats(user!.id),
    enabled: !!user,
  });

  const stats = [
    { label: 'Apps Created', value: isLoadingCount ? <Loader2 className="w-5 h-5 animate-spin" /> : projectCount, icon: Rocket },
    { label: 'Apps Deployed', value: isLoadingStats ? <Loader2 className="w-5 h-5 animate-spin" /> : userStats?.deployed_count, icon: CheckCircle },
    { label: 'Total Downloads', value: isLoadingStats ? <Loader2 className="w-5 h-5 animate-spin" /> : userStats?.total_downloads, icon: Download },
    { label: 'In Progress', value: isLoadingStats ? <Loader2 className="w-5 h-5 animate-spin" /> : userStats?.in_progress_count, icon: Clock },
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
          {isLoadingProjects ? (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : recentProjects && recentProjects.length > 0 ? (
            recentProjects.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'deployed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">Created "{activity.name}"</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'deployed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">No recent activity found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
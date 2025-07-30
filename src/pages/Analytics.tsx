import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Project } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';
import { Loader2, Download, CheckCircle, BarChart2, Star } from 'lucide-react';

// --- Data Fetching ---
interface UserStats {
  total_downloads: number;
  deployed_count: number;
}

const fetchUserStats = async (userId: string): Promise<UserStats> => {
  const { data, error } = await supabase
    .rpc('get_user_stats', { p_user_id: userId })
    .single();
  if (error) throw new Error(error.message);
  return data;
};

const fetchTopProjects = async (userId: string): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('downloads', { ascending: false })
    .limit(5);
  if (error) throw new Error(error.message);
  return data;
};

// --- Mock Data for Chart ---
const generateChartData = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      downloads: Math.floor(Math.random() * 100) + 10,
    });
  }
  return data;
};
const chartData = generateChartData();

export default function Analytics() {
  const { user } = useAuth();

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: () => fetchUserStats(user!.id),
    enabled: !!user,
  });

  const { data: topProjects, isLoading: isLoadingProjects } = useQuery({
    queryKey: ['topProjects', user?.id],
    queryFn: () => fetchTopProjects(user!.id),
    enabled: !!user,
  });

  const kpiCards = [
    {
      label: 'Total Downloads',
      value: stats?.total_downloads,
      icon: Download,
      isLoading: isLoadingStats,
    },
    {
      label: 'Apps Deployed',
      value: stats?.deployed_count,
      icon: CheckCircle,
      isLoading: isLoadingStats,
    },
    {
      label: 'Top Project',
      value: topProjects?.[0]?.name || 'N/A',
      icon: Star,
      isLoading: isLoadingProjects,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Track the performance and engagement of your projects.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiCards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {card.isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Downloads Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Downloads Over Time</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="downloads" fill="hsl(var(--primary))" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Projects Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Projects</CardTitle>
            <CardDescription>Your most downloaded projects.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingProjects ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Downloads</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProjects?.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell className="text-right">{project.downloads}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
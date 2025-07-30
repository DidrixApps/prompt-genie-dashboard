import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UserSettings } from "@/types";
import { Loader2 } from "lucide-react";

// Fetch user settings
const fetchUserSettings = async (userId: string): Promise<UserSettings> => {
  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

// Update profile info in both auth and public profiles
const updateProfileInfo = async ({ userId, fullName }: { userId: string; fullName: string }) => {
  const { error: authError } = await supabase.auth.updateUser({
    data: { full_name: fullName },
  });
  if (authError) throw authError;

  const { error: profileError } = await supabase
    .from('profiles')
    .update({ full_name: fullName })
    .eq('id', userId);
  if (profileError) throw profileError;
};

// Update user settings
const updateUserSettings = async (settings: Partial<UserSettings> & { id: string }) => {
  const { error } = await supabase
    .from('user_settings')
    .update(settings)
    .eq('id', settings.id);
  if (error) throw error;
};

export default function Settings() {
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // State for form fields
  const [fullName, setFullName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);

  // Fetch existing settings
  const { data: settings, isLoading: isLoadingSettings } = useQuery({
    queryKey: ['userSettings', user?.id],
    queryFn: () => fetchUserSettings(user!.id),
    enabled: !!user,
  });

  // Populate state when settings are loaded
  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setFullName(user.user_metadata.full_name);
    }
    if (settings) {
      setApiKey(settings.openai_api_key || '');
      setEmailNotifications(settings.email_notifications_enabled);
      setProjectUpdates(settings.project_updates_enabled);
    }
  }, [user, settings]);

  // Mutation for profile updates
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
    mutationFn: updateProfileInfo,
    onSuccess: () => {
      toast({ title: "Profile updated!", description: "Your name has been successfully updated." });
    },
    onError: (error) => {
      toast({ title: "Error updating profile", description: error.message, variant: "destructive" });
    },
  });

  // Mutation for settings updates
  const { mutate: updateSettings, isPending: isUpdatingSettings } = useMutation({
    mutationFn: updateUserSettings,
    onSuccess: (data, variables) => {
      toast({ title: "Settings saved!", description: `Your ${Object.keys(variables).length > 2 ? 'preferences' : 'API key'} have been updated.` });
      queryClient.invalidateQueries({ queryKey: ['userSettings', user?.id] });
    },
    onError: (error) => {
      toast({ title: "Error saving settings", description: error.message, variant: "destructive" });
    },
  });

  const handleProfileSave = () => {
    if (fullName.trim() && user) {
      updateProfile({ userId: user.id, fullName });
    }
  };

  const handleApiKeysSave = () => {
    if (user) {
      updateSettings({ id: user.id, openai_api_key: apiKey });
    }
  };

  const handleNotificationsSave = () => {
    if (user) {
      updateSettings({
        id: user.id,
        email_notifications_enabled: emailNotifications,
        project_updates_enabled: projectUpdates,
      });
    }
  };

  if (isLoadingSettings) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Make changes to your public information here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user?.email} disabled />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleProfileSave} disabled={isUpdatingProfile}>
                {isUpdatingProfile ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for integrating with external services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input id="openai-key" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="sk-..." />
                <p className="text-xs text-muted-foreground">
                  Your key is stored securely.
                  <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline text-primary ml-1">
                    How to find your key?
                  </a>
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleApiKeysSave} disabled={isUpdatingSettings}>
                {isUpdatingSettings ? "Saving..." : "Save Key"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">Select the theme for the dashboard.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => setTheme("light")}>Light</Button>
                <Button variant="outline" onClick={() => setTheme("dark")}>Dark</Button>
                <Button variant="outline" onClick={() => setTheme("system")}>System</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about new features and updates.</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="project-updates" className="text-base">Project Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified when your app generation is complete.</p>
                </div>
                <Switch id="project-updates" checked={projectUpdates} onCheckedChange={setProjectUpdates} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNotificationsSave} disabled={isUpdatingSettings}>
                {isUpdatingSettings ? "Saving..." : "Save Preferences"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
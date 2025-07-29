import { Auth, type Theme } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Smartphone } from 'lucide-react';
import { useTheme } from 'next-themes';

const customTheme: Theme = {
  ...ThemeSupa,
  default: {
    ...ThemeSupa.default,
    colors: {
      ...ThemeSupa.default.colors,
      brand: 'hsl(232 100% 59%)',
      brandAccent: 'hsl(232 100% 70%)',
      brandButtonText: 'white',
    },
  },
  dark: {
    ...ThemeSupa.dark,
    colors: {
      ...ThemeSupa.dark.colors,
      brand: 'hsl(232 100% 59%)',
      brandAccent: 'hsl(232 100% 70%)',
      brandButtonText: 'white',
    },
  },
};

const Login = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-[hsl(242,74%,62%)] rounded-2xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-3xl text-foreground">DidrixApps</span>
          </div>
          <h2 className="text-center text-xl text-muted-foreground">
            Sign in to build apps with AI
          </h2>
        </div>
        <div className="glass-card rounded-2xl p-8">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: customTheme }}
            providers={['github']}
            theme={resolvedTheme}
            socialLayout="horizontal"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
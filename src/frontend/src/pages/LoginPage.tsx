import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const { login, identity, isLoggingIn } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-accent/5">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <img
              src="/assets/generated/ait-mizo-logo.dim_1200x400.png"
              alt="AIT MIZO"
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome to AIT MIZO</CardTitle>
          <CardDescription className="text-base">
            Your central academic and memory archive platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Store, organize, and access your memories and academic resources in one secure place.
            </p>
            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              {isLoggingIn ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Connecting...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
          <div className="pt-4 border-t">
            <p className="text-xs text-center text-muted-foreground">
              Secure authentication powered by Internet Identity
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

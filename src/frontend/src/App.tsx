import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useActor } from './hooks/useActor';
import { useGetCallerUserProfile } from './hooks/useQueries';
import LoginPage from './pages/LoginPage';
import OnboardingUsernamePage from './pages/OnboardingUsernamePage';
import DashboardPage from './pages/DashboardPage';
import MemoryPage from './pages/memory/MemoryPage';
import QuestionPapersLandingPage from './pages/question-papers/QuestionPapersLandingPage';
import AdminPanelPage from './pages/admin/AdminPanelPage';
import AppLayout from './components/layout/AppLayout';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

// Service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(() => {
      // Silent fail - PWA is optional
    });
  });
}

function ProtectedLayout() {
  const { identity, isInitializing } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  if (isInitializing || actorFetching || profileLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!identity) {
    throw redirect({ to: '/login' });
  }

  if (isFetched && !userProfile) {
    throw redirect({ to: '/onboarding' });
  }

  if (!userProfile?.isActive) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Account Deactivated</h1>
          <p className="text-muted-foreground mb-6">
            Your account has been deactivated. Please contact an administrator to reactivate your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Outlet />
      <Toaster />
    </ThemeProvider>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/onboarding',
  component: OnboardingUsernamePage,
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protected',
  component: ProtectedLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/',
  component: DashboardPage,
});

const memoryRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/memory',
  component: MemoryPage,
});

const questionPapersRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/question-papers',
  component: QuestionPapersLandingPage,
});

const adminRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/admin',
  component: AdminPanelPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  onboardingRoute,
  protectedRoute.addChildren([indexRoute, memoryRoute, questionPapersRoute, adminRoute]),
]);

const router = createRouter({ routeTree, defaultPreload: 'intent' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

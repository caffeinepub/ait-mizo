import { Link, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin } from '../../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, Home, FolderOpen, FileText, Shield, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { SiCoffeescript } from 'react-icons/si';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { clear, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin } = useIsCallerAdmin();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/login' });
  };

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
        onClick={() => setMobileMenuOpen(false)}
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        to="/memory"
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
        onClick={() => setMobileMenuOpen(false)}
      >
        <FolderOpen className="h-4 w-4" />
        Memory
      </Link>
      <Link
        to="/question-papers"
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
        onClick={() => setMobileMenuOpen(false)}
      >
        <FileText className="h-4 w-4" />
        Question Papers
      </Link>
      {isAdmin && (
        <Link
          to="/admin"
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Shield className="h-4 w-4" />
          Admin
        </Link>
      )}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/assets/generated/ait-mizo-icon.dim_512x512.png"
                alt="AIT MIZO"
                className="h-8 w-8"
              />
              <span className="font-bold text-xl hidden sm:inline">AIT MIZO</span>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              <NavLinks />
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{userProfile?.username || 'User'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm">
                  <p className="font-medium">{userProfile?.username}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {identity?.getPrincipal().toText()}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-6 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} AIT MIZO. Built with{' '}
            <SiCoffeescript className="inline h-4 w-4 text-primary" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, FileText, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Welcome to your central archive. Choose a section to get started.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <FolderOpen className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Memory Section</CardTitle>
            </div>
            <CardDescription className="text-base">
              Upload and organize your photos, videos, and documents. Create folders, search, and share memories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/memory">
              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground" variant="outline">
                Open Memory Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <FileText className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Question Papers</CardTitle>
            </div>
            <CardDescription className="text-base">
              Access old question paper images and external academic resources. Organized by subject and year.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/question-papers">
              <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground" variant="outline">
                Open Question Papers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-6 bg-muted/50 rounded-lg border">
        <h2 className="text-lg font-semibold mb-2">About AIT MIZO</h2>
        <p className="text-muted-foreground">
          AIT MIZO is your centralized academic and memory archive platform. All registered users can access and contribute to the shared knowledge base. Upload content, organize it into folders, and help build a comprehensive resource for everyone.
        </p>
      </div>
    </div>
  );
}

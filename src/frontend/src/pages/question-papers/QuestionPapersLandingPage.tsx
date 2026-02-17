import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileImage, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function QuestionPapersLandingPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Question Papers</h1>
        <p className="text-muted-foreground text-lg">
          Access old question papers and external academic resources
        </p>
      </div>

      <Alert className="mb-6 border-primary/50 bg-primary/5">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription className="text-primary">
          The backend storage functionality is currently being implemented. Question paper management features will be available soon.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <FileImage className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Old Question Paper Images</CardTitle>
            </div>
            <CardDescription className="text-base">
              Upload and browse question paper images organized by subject and year. Bulk upload supported.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" disabled>
              Coming Soon
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <LinkIcon className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">External Links & Sources</CardTitle>
            </div>
            <CardDescription className="text-base">
              Add and organize external academic resources with titles and descriptions. Categorize by subject and exam type.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" disabled>
              Coming Soon
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-6 bg-muted/50 rounded-lg border">
        <h2 className="text-lg font-semibold mb-2">Shared Academic Resources</h2>
        <p className="text-muted-foreground">
          All question papers and resources are accessible to all registered users. Contribute to the knowledge base by uploading question papers or adding useful external links.
        </p>
      </div>
    </div>
  );
}

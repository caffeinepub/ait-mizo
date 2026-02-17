import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Upload, Search, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MemoryPage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Memory Section</h1>
        <p className="text-muted-foreground text-lg">
          Upload and organize your photos, videos, and documents
        </p>
      </div>

      <Alert className="mb-6 border-primary/50 bg-primary/5">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription className="text-primary">
          The backend storage functionality is currently being implemented. Upload, folder management, and search features will be available soon.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Upload Files</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Drag and drop or select files to upload. Supports photos, videos, and documents.
            </CardDescription>
            <Button className="w-full mt-4" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FolderPlus className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Create Folders</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Organize your memories into folders and categories for easy access.
            </CardDescription>
            <Button className="w-full mt-4" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Search & Filter</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Find your files quickly with powerful search and filtering options.
            </CardDescription>
            <Button className="w-full mt-4" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Memories</CardTitle>
          <CardDescription>
            All uploaded files will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p>No files uploaded yet. Backend storage is being implemented.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

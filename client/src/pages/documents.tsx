import { DocumentCard } from "@/components/document-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";

//todo: remove mock functionality
const documents = {
  hr: [
    { id: 1, title: "Employee Handbook 2025", category: "HR", uploadDate: "Jan 1, 2025", fileSize: "2.4 MB" },
    { id: 2, title: "Benefits Guide", category: "HR", uploadDate: "Dec 15, 2024", fileSize: "1.8 MB" },
    { id: 3, title: "Payroll Schedule", category: "HR", uploadDate: "Nov 20, 2024", fileSize: "450 KB" },
  ],
  policies: [
    { id: 4, title: "Code of Conduct", category: "Policies", uploadDate: "Jan 5, 2025", fileSize: "980 KB" },
    { id: 5, title: "Remote Work Policy", category: "Policies", uploadDate: "Dec 10, 2024", fileSize: "720 KB" },
    { id: 6, title: "Leave Policy 2025", category: "Policies", uploadDate: "Dec 1, 2024", fileSize: "650 KB" },
  ],
  training: [
    { id: 7, title: "Onboarding Guide", category: "Training", uploadDate: "Oct 15, 2024", fileSize: "3.2 MB" },
    { id: 8, title: "Safety Training Materials", category: "Training", uploadDate: "Sep 20, 2024", fileSize: "5.1 MB" },
  ],
  projects: [
    { id: 9, title: "Q4 Project Plans", category: "Projects", uploadDate: "Oct 1, 2024", fileSize: "1.5 MB" },
    { id: 10, title: "Client Presentation Template", category: "Projects", uploadDate: "Nov 5, 2024", fileSize: "890 KB" },
  ],
};

export default function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Documents</h1>
          <p className="text-muted-foreground">Access company documents and resources</p>
        </div>
        <Button data-testid="button-upload-document">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <Tabs defaultValue="hr" className="w-full">
        <TabsList>
          <TabsTrigger value="hr" data-testid="tab-hr">HR</TabsTrigger>
          <TabsTrigger value="policies" data-testid="tab-policies">Policies</TabsTrigger>
          <TabsTrigger value="training" data-testid="tab-training">Training</TabsTrigger>
          <TabsTrigger value="projects" data-testid="tab-projects">Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hr" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.hr.map((doc) => (
              <DocumentCard
                key={doc.id}
                {...doc}
                testId={`doc-${doc.id}`}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="policies" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.policies.map((doc) => (
              <DocumentCard
                key={doc.id}
                {...doc}
                testId={`doc-${doc.id}`}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="training" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.training.map((doc) => (
              <DocumentCard
                key={doc.id}
                {...doc}
                testId={`doc-${doc.id}`}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="projects" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.projects.map((doc) => (
              <DocumentCard
                key={doc.id}
                {...doc}
                testId={`doc-${doc.id}`}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

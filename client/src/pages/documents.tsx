import React, { useState } from "react";
import { DocumentCard } from "@/components/document-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Search,
  Filter,
  FileText,
  Folder,
  Download,
  Eye,
  Share2,
  Trash2,
  Edit,
  Star,
  Clock,
  Users,
  Shield,
  Archive,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  File,
  Image,
  Video,
  Music
} from "lucide-react";
import { format } from "date-fns";
import { useNotifications } from "@/hooks/use-notifications";

interface Document {
  id: number;
  title: string;
  category: string;
  uploadDate: string;
  fileSize: string;
  fileType: string;
  description?: string;
  uploadedBy: string;
  version: string;
  tags: string[];
  isStarred: boolean;
  downloadCount: number;
  lastModified: string;
  permissions: "public" | "restricted" | "confidential";
  status: "active" | "archived" | "draft";
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      title: "Employee Handbook 2025",
      category: "HR",
      uploadDate: "2025-01-01",
      fileSize: "2.4 MB",
      fileType: "pdf",
      description: "Comprehensive guide for all employees covering policies, procedures, and company culture",
      uploadedBy: "HR Team",
      version: "v2.1",
      tags: ["handbook", "policies", "onboarding"],
      isStarred: true,
      downloadCount: 156,
      lastModified: "2025-01-01",
      permissions: "public",
      status: "active"
    },
    {
      id: 2,
      title: "Benefits Guide",
      category: "HR",
      uploadDate: "2024-12-15",
      fileSize: "1.8 MB",
      fileType: "pdf",
      description: "Complete overview of employee benefits including health, dental, and retirement plans",
      uploadedBy: "Benefits Team",
      version: "v1.3",
      tags: ["benefits", "health", "retirement"],
      isStarred: false,
      downloadCount: 89,
      lastModified: "2024-12-15",
      permissions: "public",
      status: "active"
    },
    {
      id: 3,
      title: "Payroll Schedule 2025",
      category: "HR",
      uploadDate: "2024-11-20",
      fileSize: "450 KB",
      fileType: "xlsx",
      description: "Annual payroll calendar with pay dates and holiday schedules",
      uploadedBy: "Payroll Team",
      version: "v1.0",
      tags: ["payroll", "schedule", "calendar"],
      isStarred: true,
      downloadCount: 234,
      lastModified: "2024-11-20",
      permissions: "restricted",
      status: "active"
    },
    {
      id: 4,
      title: "Code of Conduct",
      category: "Policies",
      uploadDate: "2025-01-05",
      fileSize: "980 KB",
      fileType: "pdf",
      description: "Ethical guidelines and behavioral expectations for all employees",
      uploadedBy: "Legal Team",
      version: "v3.0",
      tags: ["ethics", "conduct", "compliance"],
      isStarred: false,
      downloadCount: 67,
      lastModified: "2025-01-05",
      permissions: "public",
      status: "active"
    },
    {
      id: 5,
      title: "Remote Work Policy",
      category: "Policies",
      uploadDate: "2024-12-10",
      fileSize: "720 KB",
      fileType: "docx",
      description: "Guidelines and requirements for remote work arrangements",
      uploadedBy: "HR Team",
      version: "v2.0",
      tags: ["remote", "work", "policy"],
      isStarred: true,
      downloadCount: 145,
      lastModified: "2024-12-10",
      permissions: "public",
      status: "active"
    },
    {
      id: 6,
      title: "Security Training Module",
      category: "Training",
      uploadDate: "2024-10-15",
      fileSize: "15.2 MB",
      fileType: "mp4",
      description: "Interactive security awareness training video",
      uploadedBy: "Security Team",
      version: "v1.2",
      tags: ["security", "training", "awareness"],
      isStarred: false,
      downloadCount: 312,
      lastModified: "2024-10-15",
      permissions: "public",
      status: "active"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPermission, setSelectedPermission] = useState("all");
  const [selectedFileType, setSelectedFileType] = useState("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [newDocument, setNewDocument] = useState({
    title: "",
    category: "",
    description: "",
    tags: "",
    permissions: "public" as const,
    file: null as File | null
  });

  const { showSuccess, showError, showInfo } = useNotifications();

  const categories = ["HR", "Policies", "Training", "Projects", "Legal", "Finance", "IT"];
  const fileTypes = ["pdf", "docx", "xlsx", "pptx", "mp4", "jpg", "png"];
  const permissions = ["public", "restricted", "confidential"];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || doc.category.toLowerCase() === selectedCategory;
    const matchesPermission = selectedPermission === "all" || doc.permissions === selectedPermission;
    const matchesFileType = selectedFileType === "all" || doc.fileType === selectedFileType;

    return matchesSearch && matchesCategory && matchesPermission && matchesFileType;
  });

  const handleUpload = async () => {
    if (!newDocument.title || !newDocument.category || !newDocument.file) {
      showError("Missing Information", "Please fill in all required fields and select a file");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          const document: Document = {
            id: Date.now(),
            title: newDocument.title,
            category: newDocument.category,
            uploadDate: format(new Date(), "yyyy-MM-dd"),
            fileSize: `${(newDocument.file!.size / 1024 / 1024).toFixed(1)} MB`,
            fileType: newDocument.file!.name.split('.').pop() || 'unknown',
            description: newDocument.description,
            uploadedBy: "Current User",
            version: "v1.0",
            tags: newDocument.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            isStarred: false,
            downloadCount: 0,
            lastModified: format(new Date(), "yyyy-MM-dd"),
            permissions: newDocument.permissions,
            status: "active" as const
          };

          setDocuments(prev => [document, ...prev]);
          setIsUploadDialogOpen(false);
          setNewDocument({
            title: "",
            category: "",
            description: "",
            tags: "",
            permissions: "public",
            file: null
          });
          setUploadProgress(0);

          showSuccess("Document Uploaded", `${document.title} has been uploaded successfully`);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const toggleStar = (id: number) => {
    setDocuments(prev => prev.map(doc =>
      doc.id === id ? { ...doc, isStarred: !doc.isStarred } : doc
    ));
    const doc = documents.find(d => d.id === id);
    showSuccess(
      doc?.isStarred ? "Removed from Favorites" : "Added to Favorites",
      `${doc?.title} ${doc?.isStarred ? 'removed from' : 'added to'} your favorites`
    );
  };

  const downloadDocument = (id: number) => {
    setDocuments(prev => prev.map(doc =>
      doc.id === id ? { ...doc, downloadCount: doc.downloadCount + 1 } : doc
    ));
    const doc = documents.find(d => d.id === id);
    showSuccess("Download Started", `${doc?.title} is being downloaded`);
  };

  const deleteDocument = (id: number) => {
    const doc = documents.find(d => d.id === id);
    setDocuments(prev => prev.filter(d => d.id !== id));
    showSuccess("Document Deleted", `${doc?.title} has been deleted`);
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'xlsx':
      case 'xls':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'pptx':
      case 'ppt':
        return <FileText className="h-5 w-5 text-orange-500" />;
      case 'mp4':
      case 'avi':
      case 'mov':
        return <Video className="h-5 w-5 text-purple-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="h-5 w-5 text-pink-500" />;
      case 'mp3':
      case 'wav':
        return <Music className="h-5 w-5 text-indigo-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'public':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'restricted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confidential':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const stats = {
    total: documents.length,
    starred: documents.filter(d => d.isStarred).length,
    downloads: documents.reduce((acc, doc) => acc + doc.downloadCount, 0),
    categories: new Set(documents.map(d => d.category)).size
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Document Management System</h1>
          <p className="text-muted-foreground">Centralized document storage with advanced search and organization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-upload-document">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>
                  Add a new document to the company repository
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doc-title">Document Title *</Label>
                    <Input
                      id="doc-title"
                      value={newDocument.title}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter document title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-category">Category *</Label>
                    <Select value={newDocument.category} onValueChange={(value) => setNewDocument(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doc-description">Description</Label>
                  <Textarea
                    id="doc-description"
                    value={newDocument.description}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the document"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doc-tags">Tags (comma-separated)</Label>
                    <Input
                      id="doc-tags"
                      value={newDocument.tags}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="policy, handbook, training"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doc-permissions">Access Level</Label>
                    <Select value={newDocument.permissions} onValueChange={(value: any) => setNewDocument(prev => ({ ...prev, permissions: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">🌐 Public</SelectItem>
                        <SelectItem value="restricted">🔒 Restricted</SelectItem>
                        <SelectItem value="confidential">🔐 Confidential</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>File Upload *</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop your file here, or click to browse
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewDocument(prev => ({ ...prev, file }));
                        }
                      }}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp4,.jpg,.jpeg,.png"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => document.querySelector('input[type="file"]')?.click()}
                    >
                      Choose File
                    </Button>
                    {newDocument.file && (
                      <p className="text-sm text-green-600 mt-2">
                        Selected: {newDocument.file.name}
                      </p>
                    )}
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)} disabled={isUploading}>
                  Cancel
                </Button>
                <Button onClick={handleUpload} disabled={isUploading}>
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Document'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Folder className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total Documents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{stats.starred}</div>
            <div className="text-xs text-muted-foreground">Starred</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Download className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{stats.downloads}</div>
            <div className="text-xs text-muted-foreground">Total Downloads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{stats.categories}</div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents by title, description, or tags..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPermission} onValueChange={setSelectedPermission}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Access</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="restricted">Restricted</SelectItem>
                <SelectItem value="confidential">Confidential</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedFileType} onValueChange={setSelectedFileType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {fileTypes.map(type => (
                  <SelectItem key={type} value={type}>{type.toUpperCase()}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                title={doc.title}
                category={doc.category}
                uploadDate={format(new Date(doc.uploadDate), "MMM dd, yyyy")}
                fileSize={doc.fileSize}
                fileType={doc.fileType}
                description={doc.description}
                uploadedBy={doc.uploadedBy}
                version={doc.version}
                tags={doc.tags}
                isStarred={doc.isStarred}
                downloadCount={doc.downloadCount}
                permissions={doc.permissions}
                onDownload={() => downloadDocument(doc.id)}
                onStar={() => toggleStar(doc.id)}
                onDelete={() => deleteDocument(doc.id)}
                testId={`doc-${doc.id}`}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="starred" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.filter(doc => doc.isStarred).map((doc) => (
              <DocumentCard
                key={doc.id}
                title={doc.title}
                category={doc.category}
                uploadDate={format(new Date(doc.uploadDate), "MMM dd, yyyy")}
                fileSize={doc.fileSize}
                fileType={doc.fileType}
                description={doc.description}
                uploadedBy={doc.uploadedBy}
                version={doc.version}
                tags={doc.tags}
                isStarred={doc.isStarred}
                downloadCount={doc.downloadCount}
                permissions={doc.permissions}
                onDownload={() => downloadDocument(doc.id)}
                onStar={() => toggleStar(doc.id)}
                onDelete={() => deleteDocument(doc.id)}
                testId={`doc-${doc.id}`}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents
              .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
              .slice(0, 6)
              .map((doc) => (
                <DocumentCard
                  key={doc.id}
                  title={doc.title}
                  category={doc.category}
                  uploadDate={format(new Date(doc.uploadDate), "MMM dd, yyyy")}
                  fileSize={doc.fileSize}
                  fileType={doc.fileType}
                  description={doc.description}
                  uploadedBy={doc.uploadedBy}
                  version={doc.version}
                  tags={doc.tags}
                  isStarred={doc.isStarred}
                  downloadCount={doc.downloadCount}
                  permissions={doc.permissions}
                  onDownload={() => downloadDocument(doc.id)}
                  onStar={() => toggleStar(doc.id)}
                  onDelete={() => deleteDocument(doc.id)}
                  testId={`doc-${doc.id}`}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Share2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Shared Documents</h3>
              <p className="text-muted-foreground">
                Documents shared with external users will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Analytics</CardTitle>
              <CardDescription>
                Usage statistics and insights for document management
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Detailed analytics and reporting features coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FolderOpen, Upload, Search, Filter, Download, Edit, Trash2, File, FileText, Image, Video } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function AdminDocuments() {
  const { showSuccess } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const categories = [
    "HR Policies",
    "Employee Handbook",
    "Training Materials",
    "Compliance Documents",
    "Forms & Templates",
    "Company Policies",
    "Islamic Guidelines",
    "Safety Procedures"
  ];

  const mockDocuments = [
    {
      id: 1,
      name: "Employee Handbook 2025",
      category: "Employee Handbook",
      type: "PDF",
      size: "2.5 MB",
      uploadedBy: "Admin",
      uploadDate: "2025-01-10",
      downloads: 45,
      icon: <FileText className="h-5 w-5 text-red-500" />
    },
    {
      id: 2,
      name: "Leave Policy",
      category: "HR Policies",
      type: "PDF",
      size: "1.2 MB",
      uploadedBy: "Admin",
      uploadDate: "2025-01-08",
      downloads: 32,
      icon: <FileText className="h-5 w-5 text-blue-500" />
    },
    {
      id: 3,
      name: "Prayer Room Guidelines",
      category: "Islamic Guidelines",
      type: "PDF",
      size: "0.8 MB",
      uploadedBy: "Admin",
      uploadDate: "2025-01-05",
      downloads: 28,
      icon: <FileText className="h-5 w-5 text-green-500" />
    },
    {
      id: 4,
      name: "Onboarding Checklist",
      category: "Forms & Templates",
      type: "DOCX",
      size: "0.5 MB",
      uploadedBy: "Admin",
      uploadDate: "2025-01-03",
      downloads: 18,
      icon: <File className="h-5 w-5 text-purple-500" />
    },
    {
      id: 5,
      name: "Safety Training Video",
      category: "Training Materials",
      type: "MP4",
      size: "45 MB",
      uploadedBy: "Admin",
      uploadDate: "2024-12-28",
      downloads: 67,
      icon: <Video className="h-5 w-5 text-orange-500" />
    }
  ];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpload = () => {
    showSuccess("Document Uploaded", "Document has been uploaded successfully.");
    setIsUploadDialogOpen(false);
  };

  const handleDelete = (name: string) => {
    showSuccess("Document Deleted", `${name} has been removed.`);
  };

  const stats = {
    total: mockDocuments.length,
    categories: categories.length,
    totalSize: "50.0 MB",
    totalDownloads: mockDocuments.reduce((sum, doc) => sum + doc.downloads, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Management</h1>
          <p className="text-muted-foreground">Upload and manage company documents</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>
                Add a new document to the company library
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="docName">Document Name</Label>
                <Input id="docName" placeholder="Employee Handbook 2025" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Brief description of the document..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">File Upload</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, XLS, XLSX (Max 50MB)</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleUpload}>Upload Document</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{stats.categories}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Size</p>
                <p className="text-2xl font-bold">{stats.totalSize}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
                <p className="text-2xl font-bold">{stats.totalDownloads}</p>
              </div>
              <Download className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            All Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center">
                    {doc.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{doc.name}</h3>
                      <Badge variant="outline">{doc.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{doc.category}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.downloads} downloads</span>
                      <span>•</span>
                      <span>Uploaded {doc.uploadDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(doc.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
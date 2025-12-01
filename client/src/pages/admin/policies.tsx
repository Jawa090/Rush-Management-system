import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, Plus, Edit, Trash2, Eye, Search, Calendar } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function AdminPolicies() {
  const { showSuccess } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const mockPolicies = [
    {
      id: 1,
      title: "Code of Conduct",
      description: "Guidelines for professional behavior and workplace ethics",
      category: "General",
      status: "active",
      lastUpdated: "2025-01-10",
      version: "2.0",
      views: 234
    },
    {
      id: 2,
      title: "Leave Policy",
      description: "Annual leave, sick leave, and other time-off policies",
      category: "HR",
      status: "active",
      lastUpdated: "2025-01-08",
      version: "1.5",
      views: 189
    },
    {
      id: 3,
      title: "Remote Work Policy",
      description: "Guidelines for working from home and flexible arrangements",
      category: "Operations",
      status: "active",
      lastUpdated: "2025-01-05",
      version: "1.2",
      views: 156
    },
    {
      id: 4,
      title: "Data Privacy Policy",
      description: "Protection of employee and company data",
      category: "Security",
      status: "active",
      lastUpdated: "2024-12-20",
      version: "3.0",
      views: 298
    },
    {
      id: 5,
      title: "Islamic Practices Policy",
      description: "Support for prayer times, Ramadan, and Islamic observances",
      category: "Religious",
      status: "active",
      lastUpdated: "2024-12-15",
      version: "1.0",
      views: 167
    },
    {
      id: 6,
      title: "Dress Code Policy (Draft)",
      description: "Professional attire guidelines",
      category: "General",
      status: "draft",
      lastUpdated: "2024-12-10",
      version: "0.9",
      views: 45
    }
  ];

  const filteredPolicies = mockPolicies.filter(policy =>
    policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    policy.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPolicy = () => {
    showSuccess("Policy Created", "New policy has been created successfully.");
    setIsAddDialogOpen(false);
  };

  const handleDeletePolicy = (title: string) => {
    showSuccess("Policy Deleted", `${title} has been removed.`);
  };

  const stats = {
    total: mockPolicies.length,
    active: mockPolicies.filter(p => p.status === 'active').length,
    draft: mockPolicies.filter(p => p.status === 'draft').length,
    totalViews: mockPolicies.reduce((sum, p) => sum + p.views, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Policy Management</h1>
          <p className="text-muted-foreground">Create and manage company policies</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Policy
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Policy</DialogTitle>
              <DialogDescription>
                Add a new company policy or guideline
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="policyTitle">Policy Title</Label>
                <Input id="policyTitle" placeholder="e.g., Remote Work Policy" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option value="general">General</option>
                  <option value="hr">HR</option>
                  <option value="operations">Operations</option>
                  <option value="security">Security</option>
                  <option value="religious">Religious</option>
                  <option value="compliance">Compliance</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Input id="description" placeholder="Brief summary of the policy" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Policy Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Enter the full policy text here..." 
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select className="w-full p-2 border border-border rounded-md bg-background">
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddPolicy}>Create Policy</Button>
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
                <p className="text-sm text-muted-foreground">Total Policies</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-orange-600">{stats.draft}</p>
              </div>
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalViews}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policies List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              All Policies
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredPolicies.map((policy) => (
            <div key={policy.id} className="p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{policy.title}</h3>
                    <Badge variant={policy.status === 'active' ? 'default' : 'secondary'}>
                      {policy.status}
                    </Badge>
                    <Badge variant="outline">{policy.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{policy.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Updated: {policy.lastUpdated}</span>
                    </div>
                    <span>•</span>
                    <span>Version {policy.version}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{policy.views} views</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeletePolicy(policy.title)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
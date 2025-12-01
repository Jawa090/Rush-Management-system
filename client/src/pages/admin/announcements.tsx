import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Plus, Edit, Trash2, Send, Calendar, Users, Eye } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function AdminAnnouncements() {
  const { showSuccess } = useNotifications();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const mockAnnouncements = [
    {
      id: 1,
      title: "Ramadan Schedule Changes",
      content: "During Ramadan, office hours will be adjusted to 9 AM - 4 PM. Prayer facilities will be available throughout the day.",
      priority: "high",
      status: "published",
      publishDate: "2025-01-15",
      author: "Admin",
      views: 234,
      targetAudience: "All Employees"
    },
    {
      id: 2,
      title: "New Employee Benefits Program",
      content: "We're excited to announce enhanced health insurance coverage and additional paid time off starting February 1st.",
      priority: "medium",
      status: "published",
      publishDate: "2025-01-12",
      author: "Admin",
      views: 189,
      targetAudience: "All Employees"
    },
    {
      id: 3,
      title: "IT System Maintenance",
      content: "Scheduled maintenance on Saturday, January 20th from 2 AM - 6 AM. Some services may be temporarily unavailable.",
      priority: "medium",
      status: "published",
      publishDate: "2025-01-10",
      author: "Admin",
      views: 156,
      targetAudience: "All Employees"
    },
    {
      id: 4,
      title: "Team Building Event - Save the Date",
      content: "Annual company retreat scheduled for March 15-17. More details coming soon!",
      priority: "low",
      status: "scheduled",
      publishDate: "2025-02-01",
      author: "Admin",
      views: 0,
      targetAudience: "All Employees"
    },
    {
      id: 5,
      title: "Security Policy Update (Draft)",
      content: "Updated security protocols will be implemented next month. Please review the new guidelines.",
      priority: "high",
      status: "draft",
      publishDate: null,
      author: "Admin",
      views: 0,
      targetAudience: "All Employees"
    }
  ];

  const handleCreateAnnouncement = () => {
    showSuccess("Announcement Created", "Your announcement has been created successfully.");
    setIsCreateDialogOpen(false);
  };

  const handlePublish = (title: string) => {
    showSuccess("Announcement Published", `${title} is now visible to all employees.`);
  };

  const handleDelete = (title: string) => {
    showSuccess("Announcement Deleted", `${title} has been removed.`);
  };

  const stats = {
    total: mockAnnouncements.length,
    published: mockAnnouncements.filter(a => a.status === 'published').length,
    scheduled: mockAnnouncements.filter(a => a.status === 'scheduled').length,
    draft: mockAnnouncements.filter(a => a.status === 'draft').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground">Create and manage company announcements</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>
                Share important information with your employees
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., Office Closure Notice" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Write your announcement here..." 
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select className="w-full p-2 border border-border rounded-md bg-background">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <select className="w-full p-2 border border-border rounded-md bg-background">
                    <option value="all">All Employees</option>
                    <option value="department">Specific Department</option>
                    <option value="role">Specific Role</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishDate">Publish Date (Optional)</Label>
                <Input id="publishDate" type="datetime-local" />
                <p className="text-xs text-muted-foreground">Leave empty to publish immediately</p>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="sendEmail" className="rounded border-border" />
                <Label htmlFor="sendEmail" className="text-sm font-normal cursor-pointer">
                  Send email notification to all recipients
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Save as Draft</Button>
              <Button onClick={handleCreateAnnouncement}>
                <Send className="h-4 w-4 mr-2" />
                Publish Now
              </Button>
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
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-green-600">{stats.published}</p>
              </div>
              <Bell className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-orange-600">{stats.scheduled}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-purple-600">{stats.draft}</p>
              </div>
              <Edit className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            All Announcements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockAnnouncements.map((announcement) => (
            <div key={announcement.id} className="p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{announcement.title}</h3>
                    <Badge variant={
                      announcement.status === 'published' ? 'default' :
                      announcement.status === 'scheduled' ? 'secondary' : 'outline'
                    }>
                      {announcement.status}
                    </Badge>
                    <Badge variant={
                      announcement.priority === 'high' || announcement.priority === 'urgent' ? 'destructive' :
                      announcement.priority === 'medium' ? 'default' : 'secondary'
                    }>
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{announcement.content}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{announcement.targetAudience}</span>
                    </div>
                    {announcement.publishDate && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{announcement.status === 'scheduled' ? 'Scheduled for' : 'Published'}: {announcement.publishDate}</span>
                        </div>
                      </>
                    )}
                    {announcement.status === 'published' && (
                      <>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{announcement.views} views</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {announcement.status === 'draft' && (
                    <Button 
                      size="sm"
                      onClick={() => handlePublish(announcement.title)}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Publish
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(announcement.title)}
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
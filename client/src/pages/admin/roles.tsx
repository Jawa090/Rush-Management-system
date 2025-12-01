import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, Plus, Edit, Trash2, Users, Lock, CheckCircle } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function AdminRoles() {
  const { showSuccess } = useNotifications();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const mockRoles = [
    {
      id: 1,
      name: "Super Admin",
      description: "Full system access with all permissions",
      users: 2,
      permissions: {
        users: { view: true, create: true, edit: true, delete: true },
        departments: { view: true, create: true, edit: true, delete: true },
        documents: { view: true, create: true, edit: true, delete: true },
        policies: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, create: true, edit: true, delete: true }
      },
      color: "red"
    },
    {
      id: 2,
      name: "HR Manager",
      description: "Manage employees, leave requests, and HR documents",
      users: 5,
      permissions: {
        users: { view: true, create: true, edit: true, delete: false },
        departments: { view: true, create: false, edit: true, delete: false },
        documents: { view: true, create: true, edit: true, delete: false },
        policies: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false }
      },
      color: "blue"
    },
    {
      id: 3,
      name: "Department Manager",
      description: "Manage team members and approve leave requests",
      users: 12,
      permissions: {
        users: { view: true, create: false, edit: true, delete: false },
        departments: { view: true, create: false, edit: false, delete: false },
        documents: { view: true, create: true, edit: false, delete: false },
        policies: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false }
      },
      color: "green"
    },
    {
      id: 4,
      name: "Employee",
      description: "Standard employee access",
      users: 108,
      permissions: {
        users: { view: false, create: false, edit: false, delete: false },
        departments: { view: true, create: false, edit: false, delete: false },
        documents: { view: true, create: false, edit: false, delete: false },
        policies: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false }
      },
      color: "gray"
    }
  ];

  const handleAddRole = () => {
    showSuccess("Role Created", "New role has been created successfully.");
    setIsAddDialogOpen(false);
  };

  const handleDelete = (name: string) => {
    showSuccess("Role Deleted", `${name} has been removed.`);
  };

  const PermissionToggle = ({ label, checked }: { label: string; checked: boolean }) => (
    <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
      <span className="text-sm">{label}</span>
      <Switch checked={checked} />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and access control</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>Define a new role with specific permissions</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Role Name</Label>
                <Input id="roleName" placeholder="e.g., Content Manager" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roleDesc">Description</Label>
                <Input id="roleDesc" placeholder="Brief description of the role" />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Permissions</h3>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">User Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <PermissionToggle label="View Users" checked={false} />
                    <PermissionToggle label="Create Users" checked={false} />
                    <PermissionToggle label="Edit Users" checked={false} />
                    <PermissionToggle label="Delete Users" checked={false} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Document Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <PermissionToggle label="View Documents" checked={false} />
                    <PermissionToggle label="Upload Documents" checked={false} />
                    <PermissionToggle label="Edit Documents" checked={false} />
                    <PermissionToggle label="Delete Documents" checked={false} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">System Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <PermissionToggle label="View Settings" checked={false} />
                    <PermissionToggle label="Modify Settings" checked={false} />
                  </CardContent>
                </Card>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddRole}>Create Role</Button>
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
                <p className="text-sm text-muted-foreground">Total Roles</p>
                <p className="text-2xl font-bold">{mockRoles.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{mockRoles.reduce((sum, role) => sum + role.users, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Admin Roles</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Lock className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Custom Roles</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockRoles.map((role) => (
          <Card key={role.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-${role.color}-100 dark:bg-${role.color}-950/20 flex items-center justify-center`}>
                    <Shield className={`h-6 w-6 text-${role.color}-600`} />
                  </div>
                  <div>
                    <CardTitle>{role.name}</CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {role.id > 2 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(role.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{role.users} users assigned</span>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Permissions</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(role.permissions).map(([key, perms]) => {
                    const hasAnyPermission = Object.values(perms).some(p => p);
                    return hasAnyPermission && (
                      <div key={key} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="capitalize">{key}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                View Assigned Users
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
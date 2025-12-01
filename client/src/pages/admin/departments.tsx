import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, Plus, Edit, Trash2, Users, TrendingUp } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function AdminDepartments() {
  const { showSuccess } = useNotifications();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const mockDepartments = [
    {
      id: 1,
      name: "Information Technology",
      code: "IT",
      head: "John Smith",
      employees: 35,
      budget: "$500,000",
      description: "Manages all technology infrastructure and software development",
      status: "active"
    },
    {
      id: 2,
      name: "Human Resources",
      code: "HR",
      head: "Sarah Johnson",
      employees: 12,
      budget: "$200,000",
      description: "Handles recruitment, employee relations, and benefits",
      status: "active"
    },
    {
      id: 3,
      name: "Finance & Accounting",
      code: "FIN",
      head: "Michael Brown",
      employees: 18,
      budget: "$300,000",
      description: "Manages financial operations and reporting",
      status: "active"
    },
    {
      id: 4,
      name: "Operations",
      code: "OPS",
      head: "Emily Davis",
      employees: 42,
      budget: "$800,000",
      description: "Oversees daily business operations and logistics",
      status: "active"
    },
    {
      id: 5,
      name: "Marketing",
      code: "MKT",
      head: "David Wilson",
      employees: 20,
      budget: "$400,000",
      description: "Manages brand, advertising, and customer engagement",
      status: "active"
    },
    {
      id: 6,
      name: "Sales",
      code: "SAL",
      head: "Lisa Anderson",
      employees: 25,
      budget: "$600,000",
      description: "Drives revenue through customer acquisition",
      status: "active"
    }
  ];

  const handleAddDepartment = () => {
    showSuccess("Department Created", "New department has been added successfully.");
    setIsAddDialogOpen(false);
  };

  const handleDelete = (name: string) => {
    showSuccess("Department Deleted", `${name} has been removed.`);
  };

  const totalEmployees = mockDepartments.reduce((sum, dept) => sum + dept.employees, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Departments</h1>
          <p className="text-muted-foreground">Manage organizational departments and structure</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Department</DialogTitle>
              <DialogDescription>Add a new department to your organization</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deptName">Department Name</Label>
                  <Input id="deptName" placeholder="e.g., Information Technology" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deptCode">Department Code</Label>
                  <Input id="deptCode" placeholder="e.g., IT" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deptHead">Department Head</Label>
                <Input id="deptHead" placeholder="Select employee" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Annual Budget</Label>
                <Input id="budget" type="text" placeholder="$500,000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Department responsibilities and objectives..." rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddDepartment}>Create Department</Button>
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
                <p className="text-sm text-muted-foreground">Total Departments</p>
                <p className="text-2xl font-bold">{mockDepartments.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg per Dept</p>
                <p className="text-2xl font-bold">{Math.round(totalEmployees / mockDepartments.length)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{mockDepartments.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockDepartments.map((dept) => (
          <Card key={dept.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{dept.name}</CardTitle>
                    <Badge variant="secondary">{dept.code}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(dept.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{dept.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Department Head</p>
                  <p className="font-medium">{dept.head}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Employees</p>
                  <p className="font-medium">{dept.employees}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Annual Budget</p>
                  <p className="font-medium">{dept.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant="default">{dept.status}</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                View Employees
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
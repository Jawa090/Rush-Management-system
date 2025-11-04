import React, { useState } from "react";
import { EmployeeCard } from "@/components/employee-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Plus, 
  Search, 
  Users, 
  UserPlus, 
  GraduationCap, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText,
  Calendar as CalendarIcon,
  Mail,
  Phone,
  MapPin,
  Building,
  Award,
  Target,
  TrendingUp,
  Download,
  Upload,
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { useNotifications } from "@/hooks/use-notifications";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  joiningDate: string;
  status: "active" | "onboarding" | "inactive";
  onboardingProgress: number;
  manager?: string;
  location: string;
  employeeId: string;
  startDate: string;
  salary?: number;
  skills: string[];
  photoUrl?: string;
}

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  category: "documentation" | "training" | "setup" | "meeting";
  completed: boolean;
  dueDate: string;
  assignedTo: string;
  priority: "high" | "medium" | "low";
}

export default function Onboarding() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "John Smith",
      role: "Senior Developer",
      department: "Engineering",
      email: "john.smith@rush.com",
      phone: "+1 234 567 8901",
      joiningDate: "Jan 15, 2023",
      status: "active",
      onboardingProgress: 100,
      manager: "Tech Lead",
      location: "New York",
      employeeId: "EMP001",
      startDate: "2023-01-15",
      skills: ["React", "TypeScript", "Node.js"]
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "HR Manager",
      department: "Human Resources",
      email: "sarah.j@rush.com",
      phone: "+1 234 567 8902",
      joiningDate: "Mar 10, 2022",
      status: "active",
      onboardingProgress: 100,
      manager: "HR Director",
      location: "San Francisco",
      employeeId: "EMP002",
      startDate: "2022-03-10",
      skills: ["Recruitment", "Employee Relations", "Policy Development"]
    },
    {
      id: "3",
      name: "Mike Chen",
      role: "Product Designer",
      department: "Design",
      email: "mike.chen@rush.com",
      phone: "+1 234 567 8903",
      joiningDate: "Jul 22, 2023",
      status: "onboarding",
      onboardingProgress: 75,
      manager: "Design Director",
      location: "Remote",
      employeeId: "EMP003",
      startDate: "2023-07-22",
      skills: ["UI/UX", "Figma", "Prototyping"]
    },
    {
      id: "4",
      name: "Emily Davis",
      role: "Marketing Specialist",
      department: "Marketing",
      email: "emily.d@rush.com",
      phone: "+1 234 567 8904",
      joiningDate: "Sep 5, 2023",
      status: "onboarding",
      onboardingProgress: 45,
      manager: "Marketing Manager",
      location: "Chicago",
      employeeId: "EMP004",
      startDate: "2023-09-05",
      skills: ["Digital Marketing", "Content Creation", "Analytics"]
    },
  ]);

  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>([
    {
      id: "1",
      title: "Complete I-9 Form",
      description: "Submit employment eligibility verification",
      category: "documentation",
      completed: true,
      dueDate: "2024-12-20",
      assignedTo: "Emily Davis",
      priority: "high"
    },
    {
      id: "2",
      title: "IT Setup & Equipment",
      description: "Receive laptop, phone, and access credentials",
      category: "setup",
      completed: true,
      dueDate: "2024-12-21",
      assignedTo: "Emily Davis",
      priority: "high"
    },
    {
      id: "3",
      title: "Security Training",
      description: "Complete mandatory security awareness training",
      category: "training",
      completed: false,
      dueDate: "2024-12-25",
      assignedTo: "Emily Davis",
      priority: "medium"
    },
    {
      id: "4",
      title: "Meet with Manager",
      description: "Initial one-on-one meeting with direct manager",
      category: "meeting",
      completed: false,
      dueDate: "2024-12-23",
      assignedTo: "Emily Davis",
      priority: "high"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    department: "",
    email: "",
    phone: "",
    startDate: "",
    manager: "",
    location: "",
    salary: ""
  });

  const { showSuccess, showError, showInfo } = useNotifications();

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || employee.department.toLowerCase() === departmentFilter;
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const addEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role) {
      showError("Missing Information", "Please fill in all required fields");
      return;
    }

    const employee: Employee = {
      id: Date.now().toString(),
      name: newEmployee.name,
      role: newEmployee.role,
      department: newEmployee.department,
      email: newEmployee.email,
      phone: newEmployee.phone,
      joiningDate: format(new Date(newEmployee.startDate), "MMM dd, yyyy"),
      status: "onboarding",
      onboardingProgress: 0,
      manager: newEmployee.manager,
      location: newEmployee.location,
      employeeId: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      startDate: newEmployee.startDate,
      skills: []
    };

    setEmployees(prev => [...prev, employee]);
    setIsAddDialogOpen(false);
    setNewEmployee({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      startDate: "",
      manager: "",
      location: "",
      salary: ""
    });

    showSuccess("Employee Added", `${employee.name} has been added to the system`);
    showInfo("Onboarding Started", "Onboarding tasks have been automatically created");
  };

  const editEmployee = () => {
    if (!selectedEmployee || !newEmployee.name || !newEmployee.email || !newEmployee.role) {
      showError("Missing Information", "Please fill in all required fields");
      return;
    }

    setEmployees(prev => prev.map(emp => 
      emp.id === selectedEmployee.id 
        ? {
            ...emp,
            name: newEmployee.name,
            role: newEmployee.role,
            department: newEmployee.department,
            email: newEmployee.email,
            phone: newEmployee.phone,
            manager: newEmployee.manager,
            location: newEmployee.location,
          }
        : emp
    ));

    setIsEditDialogOpen(false);
    setSelectedEmployee(null);
    setNewEmployee({
      name: "",
      role: "",
      department: "",
      email: "",
      phone: "",
      startDate: "",
      manager: "",
      location: "",
      salary: ""
    });

    showSuccess("Employee Updated", `${newEmployee.name}'s information has been updated`);
  };

  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setNewEmployee({
      name: employee.name,
      role: employee.role,
      department: employee.department,
      email: employee.email,
      phone: employee.phone,
      startDate: employee.startDate,
      manager: employee.manager || "",
      location: employee.location,
      salary: ""
    });
    setIsEditDialogOpen(true);
  };

  const deleteEmployee = (id: string) => {
    const employee = employees.find(emp => emp.id === id);
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    showSuccess("Employee Removed", `${employee?.name} has been removed from the system`);
  };

  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === "active").length,
    onboarding: employees.filter(e => e.status === "onboarding").length,
    avgProgress: Math.round(employees.reduce((acc, emp) => acc + emp.onboardingProgress, 0) / employees.length)
  };

  const departments = ["Engineering", "Human Resources", "Design", "Marketing", "Sales", "Finance"];
  const locations = ["New York", "San Francisco", "Chicago", "Remote", "Los Angeles"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Employee Onboarding Hub</h1>
          <p className="text-muted-foreground">Comprehensive employee management and onboarding system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-employee">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
                <DialogDescription>
                  Create a new employee profile and start the onboarding process
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john.doe@rush.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Job Title *</Label>
                    <Input
                      id="role"
                      value={newEmployee.role}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newEmployee.startDate}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manager">Reporting Manager</Label>
                    <Input
                      id="manager"
                      value={newEmployee.manager}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, manager: e.target.value }))}
                      placeholder="Manager Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Work Location</Label>
                    <Select value={newEmployee.location} onValueChange={(value) => setNewEmployee(prev => ({ ...prev, location: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map(loc => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Salary (Optional)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, salary: e.target.value }))}
                    placeholder="75000"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addEmployee}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Edit Employee Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Employee</DialogTitle>
                <DialogDescription>
                  Update employee information and details
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Full Name *</Label>
                    <Input
                      id="edit-name"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email Address *</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john.doe@rush.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">Job Title *</Label>
                    <Input
                      id="edit-role"
                      value={newEmployee.role}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, role: e.target.value }))}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-department">Department</Label>
                    <Select value={newEmployee.department} onValueChange={(value) => setNewEmployee(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone Number</Label>
                    <Input
                      id="edit-phone"
                      value={newEmployee.phone}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-manager">Reporting Manager</Label>
                    <Input
                      id="edit-manager"
                      value={newEmployee.manager}
                      onChange={(e) => setNewEmployee(prev => ({ ...prev, manager: e.target.value }))}
                      placeholder="Manager Name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-location">Work Location</Label>
                  <Select value={newEmployee.location} onValueChange={(value) => setNewEmployee(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(loc => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={editEmployee}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Update Employee
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
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total Employees</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{stats.active}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{stats.onboarding}</div>
            <div className="text-xs text-muted-foreground">Onboarding</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{stats.avgProgress}%</div>
            <div className="text-xs text-muted-foreground">Avg Progress</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="employees">All Employees</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees by name, role, or email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="input-search-employees"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48" data-testid="select-department-filter">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept.toLowerCase()}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="onboarding">Onboarding</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                {...employee}
                onEdit={() => openEditDialog(employee)}
                onDelete={() => deleteEmployee(employee.id)}
                testId={`employee-${employee.id}`}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="onboarding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Onboarding</CardTitle>
              <CardDescription>
                Employees currently in the onboarding process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.filter(emp => emp.status === "onboarding").map((employee) => (
                  <div key={employee.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{employee.name}</h4>
                      <p className="text-sm text-muted-foreground">{employee.role} • {employee.department}</p>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Onboarding Progress</span>
                          <span>{employee.onboardingProgress}%</span>
                        </div>
                        <Progress value={employee.onboardingProgress} className="h-2" />
                      </div>
                    </div>
                    <Badge variant={employee.onboardingProgress === 100 ? "default" : "secondary"}>
                      {employee.onboardingProgress === 100 ? "Complete" : "In Progress"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Tasks</CardTitle>
              <CardDescription>
                Track and manage onboarding tasks for new employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onboardingTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}>
                      {task.completed && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                            {task.priority}
                          </Badge>
                          <Badge variant="outline">
                            {task.category}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Assigned to: {task.assignedTo}</span>
                        <span>Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Analytics</CardTitle>
                <CardDescription>
                  Insights and metrics for employee onboarding
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

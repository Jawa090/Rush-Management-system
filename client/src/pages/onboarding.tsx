import { EmployeeCard } from "@/components/employee-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

//todo: remove mock functionality
const employees = [
  {
    id: "1",
    name: "John Smith",
    role: "Senior Developer",
    department: "Engineering",
    email: "john.smith@rush.com",
    phone: "+1 234 567 8901",
    joiningDate: "Jan 15, 2023",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "HR Manager",
    department: "Human Resources",
    email: "sarah.j@rush.com",
    phone: "+1 234 567 8902",
    joiningDate: "Mar 10, 2022",
  },
  {
    id: "3",
    name: "Mike Chen",
    role: "Product Designer",
    department: "Design",
    email: "mike.chen@rush.com",
    phone: "+1 234 567 8903",
    joiningDate: "Jul 22, 2023",
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "Marketing Specialist",
    department: "Marketing",
    email: "emily.d@rush.com",
    phone: "+1 234 567 8904",
    joiningDate: "Sep 5, 2023",
  },
];

export default function Onboarding() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Employee Management</h1>
          <p className="text-muted-foreground">Manage employee records and onboarding</p>
        </div>
        <Button data-testid="button-add-employee">
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-10"
            data-testid="input-search-employees"
          />
        </div>
        <Select>
          <SelectTrigger className="w-48" data-testid="select-department-filter">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            {...employee}
            testId={`employee-${employee.id}`}
          />
        ))}
      </div>
    </div>
  );
}

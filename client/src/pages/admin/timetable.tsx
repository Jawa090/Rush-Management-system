import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Plus, Edit, Trash2, Clock, Users, Download } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function AdminTimetable() {
  const { showSuccess } = useNotifications();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const mockSchedules = [
    {
      id: 1,
      department: "Information Technology",
      shift: "Morning Shift",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      workDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      employees: 35,
      breakTime: "1 hour",
      status: "active"
    },
    {
      id: 2,
      department: "Operations",
      shift: "Day Shift",
      startTime: "08:00 AM",
      endTime: "04:00 PM",
      workDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      employees: 42,
      breakTime: "1 hour",
      status: "active"
    },
    {
      id: 3,
      department: "Customer Service",
      shift: "Evening Shift",
      startTime: "02:00 PM",
      endTime: "10:00 PM",
      workDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      employees: 18,
      breakTime: "30 minutes",
      status: "active"
    },
    {
      id: 4,
      department: "Security",
      shift: "Night Shift",
      startTime: "10:00 PM",
      endTime: "06:00 AM",
      workDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      employees: 12,
      breakTime: "1 hour",
      status: "active"
    }
  ];

  const handleAddSchedule = () => {
    showSuccess("Schedule Created", "New work schedule has been created successfully.");
    setIsAddDialogOpen(false);
  };

  const handleDelete = (dept: string) => {
    showSuccess("Schedule Deleted", `Schedule for ${dept} has been removed.`);
  };

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Work Timetable Management</h1>
          <p className="text-muted-foreground">Manage employee work schedules and shifts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Work Schedule</DialogTitle>
                <DialogDescription>Define a new work schedule for a department or team</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">Information Technology</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shiftName">Shift Name</Label>
                    <Input id="shiftName" placeholder="e.g., Morning Shift" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input id="startTime" type="time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breakTime">Break Duration</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select break duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Work Days</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {weekDays.map((day) => (
                      <label key={day} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" defaultChecked={day !== 'Saturday' && day !== 'Sunday'} />
                        <span className="text-sm">{day.slice(0, 3)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddSchedule}>Create Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Schedules</p>
                <p className="text-2xl font-bold">{mockSchedules.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Shifts</p>
                <p className="text-2xl font-bold text-green-600">{mockSchedules.length}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{mockSchedules.reduce((sum, s) => sum + s.employees, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold">{mockSchedules.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedules List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockSchedules.map((schedule) => (
          <Card key={schedule.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{schedule.department}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="default">{schedule.shift}</Badge>
                    <Badge variant="secondary">{schedule.employees} employees</Badge>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(schedule.department)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Start Time</p>
                  <p className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {schedule.startTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">End Time</p>
                  <p className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {schedule.endTime}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Work Days</p>
                <div className="flex flex-wrap gap-2">
                  {schedule.workDays.map((day) => (
                    <Badge key={day} variant="outline">{day.slice(0, 3)}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">Break Time: {schedule.breakTime}</span>
                <Badge variant="default">{schedule.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
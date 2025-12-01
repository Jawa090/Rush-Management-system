import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Search, Download, Filter, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function AdminAttendance() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("today");
  const [filterStatus, setFilterStatus] = useState("all");

  const mockAttendance = [
    {
      id: 1,
      employee: "John Doe",
      department: "IT",
      date: "2025-01-15",
      checkIn: "09:00 AM",
      checkOut: "05:30 PM",
      status: "present",
      hours: "8.5",
      overtime: "0.5"
    },
    {
      id: 2,
      employee: "Sarah Smith",
      department: "HR",
      date: "2025-01-15",
      checkIn: "08:45 AM",
      checkOut: "05:00 PM",
      status: "present",
      hours: "8.25",
      overtime: "0"
    },
    {
      id: 3,
      employee: "Mike Johnson",
      department: "Finance",
      date: "2025-01-15",
      checkIn: "09:15 AM",
      checkOut: "05:45 PM",
      status: "late",
      hours: "8.5",
      overtime: "0.5"
    },
    {
      id: 4,
      employee: "Emily Brown",
      department: "Marketing",
      date: "2025-01-15",
      checkIn: "-",
      checkOut: "-",
      status: "absent",
      hours: "0",
      overtime: "0"
    },
    {
      id: 5,
      employee: "David Wilson",
      department: "Operations",
      date: "2025-01-15",
      checkIn: "09:00 AM",
      checkOut: "02:00 PM",
      status: "half-day",
      hours: "5",
      overtime: "0"
    }
  ];

  const filteredAttendance = mockAttendance.filter(record => {
    const matchesSearch = record.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    present: mockAttendance.filter(r => r.status === 'present' || r.status === 'late').length,
    absent: mockAttendance.filter(r => r.status === 'absent').length,
    late: mockAttendance.filter(r => r.status === 'late').length,
    halfDay: mockAttendance.filter(r => r.status === 'half-day').length,
    attendanceRate: Math.round((mockAttendance.filter(r => r.status !== 'absent').length / mockAttendance.length) * 100)
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'half-day':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
      present: "default",
      absent: "destructive",
      late: "secondary",
      "half-day": "outline"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Records</h1>
          <p className="text-muted-foreground">Track and manage employee attendance</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="text-2xl font-bold text-orange-600">{stats.late}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Half Day</p>
                <p className="text-2xl font-bold text-blue-600">{stats.halfDay}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rate</p>
                <p className="text-2xl font-bold text-purple-600">{stats.attendanceRate}%</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Records */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Attendance Records
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger className="w-[150px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="half-day">Half Day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filteredAttendance.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(record.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{record.employee}</h3>
                      {getStatusBadge(record.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{record.department}</span>
                      <span>•</span>
                      <span>{record.date}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-muted-foreground text-xs">Check In</p>
                    <p className="font-medium">{record.checkIn}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground text-xs">Check Out</p>
                    <p className="font-medium">{record.checkOut}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground text-xs">Hours</p>
                    <p className="font-medium">{record.hours}h</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground text-xs">Overtime</p>
                    <p className="font-medium">{record.overtime}h</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
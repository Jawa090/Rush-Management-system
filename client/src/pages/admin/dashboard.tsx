import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Calendar,
  FileText,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  DollarSign,
  UserCheck,
  UserX,
  ArrowRight
} from "lucide-react";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  const stats = [
    {
      title: "Total Employees",
      value: "127",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      title: "Pending Leave Requests",
      value: "8",
      change: "-3 from yesterday",
      trend: "down",
      icon: <Calendar className="h-5 w-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20"
    },
    {
      title: "Active Today",
      value: "89",
      change: "70% attendance",
      trend: "up",
      icon: <UserCheck className="h-5 w-5" />,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20"
    },
    {
      title: "Documents Uploaded",
      value: "234",
      change: "+18 this week",
      trend: "up",
      icon: <FileText className="h-5 w-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    }
  ];

  const recentActivities = [
    {
      user: "John Doe",
      action: "submitted a leave request",
      time: "5 minutes ago",
      type: "leave",
      status: "pending"
    },
    {
      user: "Sarah Smith",
      action: "uploaded a document",
      time: "15 minutes ago",
      type: "document",
      status: "completed"
    },
    {
      user: "Mike Johnson",
      action: "updated profile information",
      time: "1 hour ago",
      type: "profile",
      status: "completed"
    },
    {
      user: "Emily Brown",
      action: "requested password reset",
      time: "2 hours ago",
      type: "security",
      status: "pending"
    },
    {
      user: "David Wilson",
      action: "completed onboarding",
      time: "3 hours ago",
      type: "onboarding",
      status: "completed"
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      employee: "John Doe",
      type: "Annual Leave",
      dates: "Jan 20-25, 2025",
      days: 5,
      status: "pending"
    },
    {
      id: 2,
      employee: "Sarah Smith",
      type: "Sick Leave",
      dates: "Jan 18, 2025",
      days: 1,
      status: "pending"
    },
    {
      id: 3,
      employee: "Mike Johnson",
      type: "Personal Leave",
      dates: "Jan 22-23, 2025",
      days: 2,
      status: "pending"
    }
  ];

  const departmentStats = [
    { name: "IT", employees: 35, attendance: 92 },
    { name: "HR", employees: 12, attendance: 100 },
    { name: "Finance", employees: 18, attendance: 88 },
    { name: "Operations", employees: 42, attendance: 85 },
    { name: "Marketing", employees: 20, attendance: 95 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Leave Approvals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Pending Leave Approvals
              </CardTitle>
              <Badge variant="destructive">{pendingApprovals.length} Pending</Badge>
            </div>
            <CardDescription>Review and approve employee leave requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingApprovals.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                <div className="flex-1">
                  <div className="font-medium text-sm">{request.employee}</div>
                  <div className="text-xs text-muted-foreground">{request.type} • {request.dates}</div>
                  <div className="text-xs text-muted-foreground">{request.days} days</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    Reject
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Approve
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full" onClick={() => setLocation("/admin/leave-requests")}>
              View All Requests <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest actions across the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                {activity.status === 'completed' ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 text-orange-500" />
                )}
              </div>
            ))}
            <Button variant="ghost" className="w-full" onClick={() => setLocation("/admin/logs")}>
              View All Activity <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Department Overview
          </CardTitle>
          <CardDescription>Employee distribution and attendance by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{dept.name}</span>
                    <Badge variant="secondary">{dept.employees} employees</Badge>
                  </div>
                  <span className="text-sm font-medium">{dept.attendance}% attendance</span>
                </div>
                <Progress value={dept.attendance} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setLocation("/admin/employees")}>
              <Users className="h-5 w-5" />
              <span className="text-xs">Manage Employees</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setLocation("/admin/announcements")}>
              <FileText className="h-5 w-5" />
              <span className="text-xs">Create Announcement</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setLocation("/admin/documents")}>
              <FileText className="h-5 w-5" />
              <span className="text-xs">Upload Document</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setLocation("/admin/settings")}>
              <Activity className="h-5 w-5" />
              <span className="text-xs">System Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
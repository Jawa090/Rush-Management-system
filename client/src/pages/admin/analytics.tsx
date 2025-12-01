import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Clock,
  FileText,
  Activity,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminAnalytics() {
  const employeeMetrics = {
    totalEmployees: 127,
    activeToday: 89,
    onLeave: 8,
    newThisMonth: 5,
    turnoverRate: 2.3,
    avgTenure: "2.5 years"
  };

  const leaveMetrics = {
    totalRequests: 45,
    pending: 8,
    approved: 32,
    rejected: 5,
    avgDuration: "3.2 days",
    mostCommonType: "Annual Leave"
  };

  const attendanceData = [
    { month: "Jan", rate: 92 },
    { month: "Feb", rate: 94 },
    { month: "Mar", rate: 91 },
    { month: "Apr", rate: 93 },
    { month: "May", rate: 95 },
    { month: "Jun", rate: 90 }
  ];

  const departmentPerformance = [
    { name: "IT", employees: 35, attendance: 92, productivity: 88 },
    { name: "HR", employees: 12, attendance: 100, productivity: 95 },
    { name: "Finance", employees: 18, attendance: 88, productivity: 90 },
    { name: "Operations", employees: 42, attendance: 85, productivity: 82 },
    { name: "Marketing", employees: 20, attendance: 95, productivity: 91 }
  ];

  const topDocuments = [
    { name: "Employee Handbook", downloads: 234, views: 456 },
    { name: "Leave Policy", downloads: 189, views: 378 },
    { name: "Prayer Guidelines", downloads: 167, views: 289 },
    { name: "Safety Procedures", downloads: 145, views: 267 },
    { name: "Code of Conduct", downloads: 134, views: 245 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                    <p className="text-3xl font-bold">{employeeMetrics.totalEmployees}</p>
                  </div>
                  <Users className="h-10 w-10 text-blue-500" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-600">+{employeeMetrics.newThisMonth} this month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Today</p>
                    <p className="text-3xl font-bold text-green-600">{employeeMetrics.activeToday}</p>
                  </div>
                  <Activity className="h-10 w-10 text-green-500" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">
                    {Math.round((employeeMetrics.activeToday / employeeMetrics.totalEmployees) * 100)}% attendance rate
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">On Leave</p>
                    <p className="text-3xl font-bold text-orange-600">{employeeMetrics.onLeave}</p>
                  </div>
                  <Calendar className="h-10 w-10 text-orange-500" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{leaveMetrics.pending} pending requests</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Attendance and productivity metrics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentPerformance.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{dept.name}</span>
                        <Badge variant="secondary">{dept.employees} employees</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">Attendance: {dept.attendance}%</span>
                        <span className="text-muted-foreground">Productivity: {dept.productivity}%</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Progress value={dept.attendance} className="h-2" />
                      <Progress value={dept.productivity} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Attendance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trend (Last 6 Months)</CardTitle>
              <CardDescription>Monthly attendance rate overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendanceData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{data.month}</span>
                      <span className="text-sm font-medium">{data.rate}%</span>
                    </div>
                    <Progress value={data.rate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{employeeMetrics.totalEmployees}</p>
                <p className="text-sm text-muted-foreground mt-2">Across all departments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Turnover Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-600">{employeeMetrics.turnoverRate}%</p>
                <p className="text-sm text-muted-foreground mt-2">Below industry average</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average Tenure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{employeeMetrics.avgTenure}</p>
                <p className="text-sm text-muted-foreground mt-2">Employee retention</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Employee Distribution</CardTitle>
              <CardDescription>Breakdown by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentPerformance.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="font-medium">{dept.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{dept.employees} employees</span>
                      <span className="text-sm font-medium">
                        {Math.round((dept.employees / employeeMetrics.totalEmployees) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round((employeeMetrics.activeToday / employeeMetrics.totalEmployees) * 100)}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">92%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">94%</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">This Year</p>
                <p className="text-2xl font-bold">93%</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance Trend</CardTitle>
              <CardDescription>Attendance rates over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-4">
                {attendanceData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-primary/20 rounded-t-lg relative" style={{ height: `${data.rate}%` }}>
                      <div className="absolute inset-0 bg-primary rounded-t-lg" style={{ height: '100%' }} />
                    </div>
                    <span className="text-xs font-medium">{data.month}</span>
                    <span className="text-xs text-muted-foreground">{data.rate}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Documents</CardTitle>
              <CardDescription>Top downloaded and viewed documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.downloads} downloads • {doc.views} views
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{doc.downloads}</p>
                        <p className="text-xs text-muted-foreground">downloads</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
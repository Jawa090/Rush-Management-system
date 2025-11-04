import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveRequestCard } from "@/components/leave-request-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  CalendarDays, 
  Clock, 
  FileText, 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Upload,
  Download,
  Filter
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { useNotifications } from "@/hooks/use-notifications";

interface LeaveRequest {
  id: number;
  employeeName: string;
  employeeId: string;
  department: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedDate: string;
  approvedBy?: string;
  documents?: string[];
  days: number;
}

export default function Leave() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      employeeName: "Sarah Johnson",
      employeeId: "EMP001",
      department: "Engineering",
      leaveType: "Annual Leave",
      startDate: "2024-12-20",
      endDate: "2024-12-27",
      reason: "Family vacation during holidays",
      status: "pending",
      appliedDate: "2024-12-10",
      days: 8
    },
    {
      id: 2,
      employeeName: "Mike Chen",
      employeeId: "EMP002",
      department: "Marketing",
      leaveType: "Sick Leave",
      startDate: "2024-11-15",
      endDate: "2024-11-16",
      reason: "Medical appointment",
      status: "approved",
      appliedDate: "2024-11-10",
      approvedBy: "HR Manager",
      days: 2
    },
    {
      id: 3,
      employeeName: "Emily Davis",
      employeeId: "EMP003",
      department: "Sales",
      leaveType: "Personal Leave",
      startDate: "2024-12-10",
      endDate: "2024-12-11",
      reason: "Personal matters",
      status: "rejected",
      appliedDate: "2024-12-05",
      days: 2
    },
  ]);

  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    department: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    emergencyContact: "",
    documents: [] as File[]
  });

  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const { showSuccess, showError, showInfo } = useNotifications();

  // Leave balance data
  const leaveBalance = {
    annual: { used: 12, total: 25 },
    sick: { used: 3, total: 10 },
    personal: { used: 2, total: 5 },
    emergency: { used: 0, total: 3 }
  };

  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    return differenceInDays(new Date(end), new Date(start)) + 1;
  };

  const submitLeaveRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.employeeName || !formData.startDate || !formData.endDate || !formData.reason) {
      showError("Missing Information", "Please fill in all required fields");
      return;
    }

    const days = calculateDays(formData.startDate, formData.endDate);
    
    const newRequest: LeaveRequest = {
      id: Date.now(),
      employeeName: formData.employeeName,
      employeeId: formData.employeeId,
      department: formData.department,
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: "pending",
      appliedDate: format(new Date(), "yyyy-MM-dd"),
      days
    };

    setLeaveRequests(prev => [newRequest, ...prev]);
    
    // Reset form
    setFormData({
      employeeName: "",
      employeeId: "",
      department: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      emergencyContact: "",
      documents: []
    });

    showSuccess("Leave Request Submitted", `Your ${days}-day leave request has been submitted for approval`);
    showInfo("Next Steps", "You will receive a notification once your request is reviewed");
  };

  const approveRequest = (id: number) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: "approved" as const, approvedBy: "HR Manager" } : req
    ));
    const request = leaveRequests.find(req => req.id === id);
    showSuccess("Request Approved", `${request?.employeeName}'s leave request has been approved`);
  };

  const rejectRequest = (id: number) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: "rejected" as const } : req
    ));
    const request = leaveRequests.find(req => req.id === id);
    showError("Request Rejected", `${request?.employeeName}'s leave request has been rejected`);
  };

  const filteredRequests = leaveRequests.filter(req => {
    if (filterStatus !== "all" && req.status !== filterStatus) return false;
    if (selectedDate && req.startDate !== format(selectedDate, "yyyy-MM-dd")) return false;
    return true;
  });

  const stats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter(r => r.status === "pending").length,
    approved: leaveRequests.filter(r => r.status === "approved").length,
    rejected: leaveRequests.filter(r => r.status === "rejected").length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Smart Leave Management</h1>
          <p className="text-muted-foreground">Intelligent leave tracking with automated workflows</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <CalendarDays className="h-4 w-4 mr-2" />
            Leave Calendar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total Requests</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{stats.approved}</div>
            <div className="text-xs text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="h-6 w-6 mx-auto mb-2 text-red-500" />
            <div className="text-2xl font-bold">{stats.rejected}</div>
            <div className="text-xs text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="submit" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="submit" data-testid="tab-submit">Submit Leave</TabsTrigger>
          <TabsTrigger value="requests" data-testid="tab-requests">All Requests</TabsTrigger>
          <TabsTrigger value="balance" data-testid="tab-balance">Leave Balance</TabsTrigger>
          <TabsTrigger value="analytics" data-testid="tab-analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Leave Request</CardTitle>
              <p className="text-sm text-muted-foreground">
                Fill out the form below to submit your leave request
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6 max-w-2xl" onSubmit={submitLeaveRequest}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-name">Employee Name *</Label>
                    <Input
                      id="employee-name"
                      value={formData.employeeName}
                      onChange={(e) => setFormData(prev => ({ ...prev, employeeName: e.target.value }))}
                      placeholder="John Doe"
                      data-testid="input-employee-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-id">Employee ID *</Label>
                    <Input
                      id="employee-id"
                      value={formData.employeeId}
                      onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                      placeholder="EMP001"
                      data-testid="input-employee-id"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger id="department" data-testid="select-department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">🔧 Engineering</SelectItem>
                        <SelectItem value="hr">👥 Human Resources</SelectItem>
                        <SelectItem value="sales">💼 Sales</SelectItem>
                        <SelectItem value="marketing">📈 Marketing</SelectItem>
                        <SelectItem value="finance">💰 Finance</SelectItem>
                        <SelectItem value="operations">⚙️ Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leave-type">Leave Type *</Label>
                    <Select value={formData.leaveType} onValueChange={(value) => setFormData(prev => ({ ...prev, leaveType: value }))}>
                      <SelectTrigger id="leave-type" data-testid="select-leave-type">
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Annual Leave">🏖️ Annual Leave</SelectItem>
                        <SelectItem value="Sick Leave">🏥 Sick Leave</SelectItem>
                        <SelectItem value="Personal Leave">👤 Personal Leave</SelectItem>
                        <SelectItem value="Emergency Leave">🚨 Emergency Leave</SelectItem>
                        <SelectItem value="Maternity Leave">👶 Maternity Leave</SelectItem>
                        <SelectItem value="Paternity Leave">👨‍👶 Paternity Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date *</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      data-testid="input-start-date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date *</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      data-testid="input-end-date"
                    />
                  </div>
                </div>

                {formData.startDate && formData.endDate && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">
                        Total Days: {calculateDays(formData.startDate, formData.endDate)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Leave *</Label>
                  <Textarea
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Please provide a detailed reason for your leave request..."
                    rows={4}
                    data-testid="input-reason"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency-contact">Emergency Contact</Label>
                  <Input
                    id="emergency-contact"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                    placeholder="Emergency contact person and phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Supporting Documents</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, JPG up to 10MB
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" data-testid="button-submit-leave">
                    <FileText className="h-4 w-4 mr-2" />
                    Submit Request
                  </Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setFormData({
                      employeeName: "",
                      employeeId: "",
                      department: "",
                      leaveType: "",
                      startDate: "",
                      endDate: "",
                      reason: "",
                      emergencyContact: "",
                      documents: []
                    });
                  }}>
                    Clear Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests" className="mt-6 space-y-4">
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  {selectedDate ? format(selectedDate, "MMM dd") : "All Dates"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
                <div className="p-3 border-t">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedDate(undefined)}
                    className="w-full"
                  >
                    Clear Filter
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRequests.map((request) => (
              <LeaveRequestCard
                key={request.id}
                employeeName={request.employeeName}
                leaveType={request.leaveType}
                startDate={format(new Date(request.startDate), "MMM dd, yyyy")}
                endDate={format(new Date(request.endDate), "MMM dd, yyyy")}
                reason={request.reason}
                status={request.status}
                onApprove={() => approveRequest(request.id)}
                onReject={() => rejectRequest(request.id)}
                testId={`leave-${request.id}`}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="balance" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Leave Balance Overview</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Track your remaining leave days for the current year
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(leaveBalance).map(([type, balance]) => (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="capitalize font-medium">{type.replace(/([A-Z])/g, ' $1')} Leave</Label>
                      <span className="text-sm text-muted-foreground">
                        {balance.used}/{balance.total} days used
                      </span>
                    </div>
                    <Progress 
                      value={(balance.used / balance.total) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{balance.total - balance.used} days remaining</span>
                      <span>{Math.round((balance.used / balance.total) * 100)}% used</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Leave Analytics</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Insights and trends for leave management
                </p>
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

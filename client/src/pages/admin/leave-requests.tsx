import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle, XCircle, Clock, Filter, Download } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function AdminLeaveRequests() {
  const { showSuccess, showError } = useNotifications();
  const [activeTab, setActiveTab] = useState("pending");

  const mockLeaveRequests = [
    {
      id: 1,
      employee: "John Doe",
      type: "Annual Leave",
      startDate: "2025-01-20",
      endDate: "2025-01-25",
      days: 5,
      reason: "Family vacation",
      status: "pending",
      submittedDate: "2025-01-10"
    },
    {
      id: 2,
      employee: "Sarah Smith",
      type: "Sick Leave",
      startDate: "2025-01-18",
      endDate: "2025-01-18",
      days: 1,
      reason: "Medical appointment",
      status: "pending",
      submittedDate: "2025-01-15"
    },
    {
      id: 3,
      employee: "Mike Johnson",
      type: "Personal Leave",
      startDate: "2025-01-22",
      endDate: "2025-01-23",
      days: 2,
      reason: "Personal matters",
      status: "pending",
      submittedDate: "2025-01-12"
    },
    {
      id: 4,
      employee: "Emily Brown",
      type: "Annual Leave",
      startDate: "2025-01-15",
      endDate: "2025-01-17",
      days: 3,
      reason: "Weekend trip",
      status: "approved",
      submittedDate: "2025-01-05",
      approvedDate: "2025-01-06"
    },
    {
      id: 5,
      employee: "David Wilson",
      type: "Sick Leave",
      startDate: "2025-01-12",
      endDate: "2025-01-14",
      days: 3,
      reason: "Flu",
      status: "rejected",
      submittedDate: "2025-01-11",
      rejectedDate: "2025-01-11",
      rejectionReason: "Insufficient sick leave balance"
    }
  ];

  const handleApprove = (id: number, employee: string) => {
    showSuccess("Leave Approved", `${employee}'s leave request has been approved.`);
  };

  const handleReject = (id: number, employee: string) => {
    showError("Leave Rejected", `${employee}'s leave request has been rejected.`);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredRequests = mockLeaveRequests.filter(req => req.status === activeTab);

  const stats = {
    pending: mockLeaveRequests.filter(r => r.status === 'pending').length,
    approved: mockLeaveRequests.filter(r => r.status === 'approved').length,
    rejected: mockLeaveRequests.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leave Requests</h1>
          <p className="text-muted-foreground">Review and manage employee leave requests</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            All Leave Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">
                Pending ({stats.pending})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({stats.approved})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({stats.rejected})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4 mt-6">
              {filteredRequests.map((request) => (
                <div key={request.id} className="p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(request.employee)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{request.employee}</h3>
                          <Badge variant={
                            request.status === 'pending' ? 'default' :
                            request.status === 'approved' ? 'secondary' : 'destructive'
                          }>
                            {request.status}
                          </Badge>
                          <Badge variant="outline">{request.type}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Start Date</p>
                            <p className="font-medium">{request.startDate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">End Date</p>
                            <p className="font-medium">{request.endDate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Duration</p>
                            <p className="font-medium">{request.days} days</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Submitted</p>
                            <p className="font-medium">{request.submittedDate}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Reason:</p>
                          <p className="text-sm">{request.reason}</p>
                        </div>
                        {request.status === 'rejected' && request.rejectionReason && (
                          <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                            <p className="text-sm text-red-600 dark:text-red-400">
                              <strong>Rejection Reason:</strong> {request.rejectionReason}
                            </p>
                          </div>
                        )}
                        {request.status === 'approved' && request.approvedDate && (
                          <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                            <p className="text-sm text-green-600 dark:text-green-400">
                              <strong>Approved on:</strong> {request.approvedDate}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    {request.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleReject(request.id, request.employee)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(request.id, request.employee)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {filteredRequests.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No {activeTab} leave requests</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
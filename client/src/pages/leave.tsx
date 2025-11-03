import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeaveRequestCard } from "@/components/leave-request-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

//todo: remove mock functionality
const leaveRequests = [
  {
    id: 1,
    employeeName: "Sarah Johnson",
    leaveType: "Annual Leave",
    startDate: "Dec 20, 2024",
    endDate: "Dec 27, 2024",
    reason: "Family vacation during holidays",
    status: "pending" as const,
  },
  {
    id: 2,
    employeeName: "Mike Chen",
    leaveType: "Sick Leave",
    startDate: "Nov 15, 2024",
    endDate: "Nov 16, 2024",
    reason: "Medical appointment",
    status: "approved" as const,
  },
  {
    id: 3,
    employeeName: "Emily Davis",
    leaveType: "Personal Leave",
    startDate: "Dec 10, 2024",
    endDate: "Dec 11, 2024",
    reason: "Personal matters",
    status: "rejected" as const,
  },
];

export default function Leave() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Leave Management</h1>
        <p className="text-muted-foreground">Submit and manage leave requests</p>
      </div>

      <Tabs defaultValue="submit" className="w-full">
        <TabsList>
          <TabsTrigger value="submit" data-testid="tab-submit">Submit Leave</TabsTrigger>
          <TabsTrigger value="requests" data-testid="tab-requests">Leave Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit Leave Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4 max-w-2xl" onSubmit={(e) => {
                e.preventDefault();
                console.log('Leave request submitted');
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-name">Employee Name</Label>
                    <Input
                      id="employee-name"
                      placeholder="John Doe"
                      data-testid="input-employee-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-id">Employee ID</Label>
                    <Input
                      id="employee-id"
                      placeholder="EMP001"
                      data-testid="input-employee-id"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger id="department" data-testid="select-department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leave-type">Leave Type</Label>
                    <Select>
                      <SelectTrigger id="leave-type" data-testid="select-leave-type">
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual Leave</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="personal">Personal Leave</SelectItem>
                        <SelectItem value="emergency">Emergency Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      data-testid="input-start-date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      data-testid="input-end-date"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a reason for your leave request..."
                    rows={4}
                    data-testid="input-reason"
                  />
                </div>
                <Button type="submit" data-testid="button-submit-leave">Submit Request</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leaveRequests.map((request) => (
              <LeaveRequestCard
                key={request.id}
                employeeName={request.employeeName}
                leaveType={request.leaveType}
                startDate={request.startDate}
                endDate={request.endDate}
                reason={request.reason}
                status={request.status}
                testId={`leave-${request.id}`}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { LeaveRequestCard } from '../leave-request-card';

export default function LeaveRequestCardExample() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      <LeaveRequestCard
        employeeName="Sarah Johnson"
        leaveType="Annual Leave"
        startDate="Dec 20, 2024"
        endDate="Dec 27, 2024"
        reason="Family vacation during holidays"
        status="pending"
        testId="leave-1"
      />
      <LeaveRequestCard
        employeeName="Mike Chen"
        leaveType="Sick Leave"
        startDate="Nov 15, 2024"
        endDate="Nov 16, 2024"
        reason="Medical appointment"
        status="approved"
        testId="leave-2"
      />
    </div>
  );
}

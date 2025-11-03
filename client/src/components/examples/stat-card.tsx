import { StatCard } from '../stat-card';
import { Users } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Employees"
        value={127}
        icon={Users}
        trend="+12% from last month"
        testId="stat-employees"
      />
    </div>
  );
}

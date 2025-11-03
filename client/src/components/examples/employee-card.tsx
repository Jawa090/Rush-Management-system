import { EmployeeCard } from '../employee-card';

export default function EmployeeCardExample() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      <EmployeeCard
        id="1"
        name="John Smith"
        role="Senior Developer"
        department="Engineering"
        email="john.smith@rush.com"
        phone="+1 234 567 8901"
        joiningDate="Jan 15, 2023"
        testId="employee-1"
      />
    </div>
  );
}

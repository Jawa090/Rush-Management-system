import { StatCard } from "@/components/stat-card";
import { PrayerCard } from "@/components/prayer-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

//todo: remove mock functionality
const mockAnnouncements = [
  { id: 1, title: "Company Meeting - Q4 Review", date: "Dec 15, 2024", description: "Quarterly performance review and planning session" },
  { id: 2, title: "New Policy Update", date: "Dec 10, 2024", description: "Updated remote work policy now available" },
  { id: 3, title: "Holiday Schedule", date: "Dec 5, 2024", description: "Office closure dates for the holiday season" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Welcome to Rush Corporation</h1>
        <p className="text-muted-foreground">Your employee portal dashboard</p>
      </div>

      <Card className="bg-accent/20 border-accent">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Next Prayer: Dhuhr</h3>
                <p className="text-sm text-muted-foreground">12:45 PM - In 2 hours 30 minutes</p>
              </div>
            </div>
            <Button variant="outline" data-testid="button-view-prayer-times">View All</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Employees"
          value={127}
          icon={Users}
          trend="+12 new this quarter"
          testId="stat-employees"
        />
        <StatCard
          title="Pending Leaves"
          value={8}
          icon={FileText}
          trend="3 require action"
          testId="stat-leaves"
        />
        <StatCard
          title="Upcoming Events"
          value={5}
          icon={Calendar}
          trend="Next: Team meeting"
          testId="stat-events"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAnnouncements.map((announcement) => (
              <div key={announcement.id} className="border-l-4 border-l-primary pl-4 py-2">
                <h4 className="font-medium text-sm" data-testid={`announcement-${announcement.id}-title`}>{announcement.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{announcement.date}</p>
                <p className="text-sm text-muted-foreground mt-1">{announcement.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Prayer Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
              <span className="font-medium">Fajr</span>
              <span className="text-muted-foreground">5:30 AM</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-md bg-primary/10 border border-primary">
              <span className="font-medium">Dhuhr</span>
              <span className="font-semibold text-primary">12:45 PM</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
              <span className="font-medium">Asr</span>
              <span className="text-muted-foreground">3:15 PM</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
              <span className="font-medium">Maghrib</span>
              <span className="text-muted-foreground">5:42 PM</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
              <span className="font-medium">Isha</span>
              <span className="text-muted-foreground">7:05 PM</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

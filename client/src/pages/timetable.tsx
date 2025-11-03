import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar as CalendarIcon, Clock, Edit, Trash2 } from "lucide-react";

//todo: remove mock functionality
const events = [
  { id: 1, title: "Team Standup", date: "Dec 18, 2024", time: "9:00 AM - 9:30 AM", type: "Meeting" },
  { id: 2, title: "Project Review", date: "Dec 18, 2024", time: "2:00 PM - 3:30 PM", type: "Review" },
  { id: 3, title: "Client Presentation", date: "Dec 19, 2024", time: "11:00 AM - 12:00 PM", type: "Presentation" },
  { id: 4, title: "Training Session", date: "Dec 20, 2024", time: "10:00 AM - 12:00 PM", type: "Training" },
  { id: 5, title: "Department Meeting", date: "Dec 21, 2024", time: "3:00 PM - 4:00 PM", type: "Meeting" },
];

export default function Timetable() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Timetable</h1>
          <p className="text-muted-foreground">Manage your schedule and events</p>
        </div>
        <Button data-testid="button-add-event">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>This Week's Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-4 p-4 rounded-lg border hover-elevate"
              data-testid={`event-${event.id}`}
            >
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium" data-testid={`event-${event.id}-title`}>{event.title}</h4>
                  <Badge variant="secondary">{event.type}</Badge>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => console.log(`Edit event ${event.id}`)}
                  data-testid={`event-${event.id}-edit`}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => console.log(`Delete event ${event.id}`)}
                  data-testid={`event-${event.id}-delete`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

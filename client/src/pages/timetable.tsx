import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Calendar as CalendarIcon, Clock, Edit, Trash2, Bell, Users, MapPin, Filter, Search } from "lucide-react";
import { format } from "date-fns";
import { useNotifications } from "@/hooks/use-notifications";

interface Event {
  id: number;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  location?: string;
  attendees?: string[];
  reminder: boolean;
  reminderMinutes: number;
  priority: 'low' | 'medium' | 'high';
}

export default function Timetable() {
  const [events, setEvents] = useState<Event[]>([
    { 
      id: 1, 
      title: "Team Standup", 
      description: "Daily team sync meeting",
      date: "2024-12-18", 
      startTime: "09:00", 
      endTime: "09:30", 
      type: "Meeting",
      location: "Conference Room A",
      attendees: ["John", "Sarah", "Mike"],
      reminder: true,
      reminderMinutes: 15,
      priority: 'medium'
    },
    { 
      id: 2, 
      title: "Project Review", 
      description: "Quarterly project review with stakeholders",
      date: "2024-12-18", 
      startTime: "14:00", 
      endTime: "15:30", 
      type: "Review",
      location: "Main Conference Room",
      attendees: ["Manager", "Client"],
      reminder: true,
      reminderMinutes: 30,
      priority: 'high'
    },
    { 
      id: 3, 
      title: "Client Presentation", 
      description: "Present new features to client",
      date: "2024-12-19", 
      startTime: "11:00", 
      endTime: "12:00", 
      type: "Presentation",
      location: "Virtual Meeting",
      reminder: true,
      reminderMinutes: 15,
      priority: 'high'
    },
    { 
      id: 4, 
      title: "Training Session", 
      description: "React and TypeScript training",
      date: "2024-12-20", 
      startTime: "10:00", 
      endTime: "12:00", 
      type: "Training",
      location: "Training Room",
      reminder: false,
      reminderMinutes: 10,
      priority: 'low'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  const { showSuccess, showError, showInfo } = useNotifications();

  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "09:00",
    endTime: "10:00",
    type: "Meeting",
    location: "",
    reminder: true,
    reminderMinutes: 15,
    priority: 'medium'
  });

  const eventTypes = ["All", "Meeting", "Review", "Presentation", "Training", "Personal", "Holiday"];
  const priorities = ["low", "medium", "high"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || event.type === filterType;
    const matchesDate = !selectedDate || event.date === format(selectedDate, "yyyy-MM-dd");
    
    return matchesSearch && matchesType && matchesDate;
  });

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.startTime || !newEvent.endTime) {
      showError("Missing Information", "Please fill in all required fields");
      return;
    }

    const event: Event = {
      id: Date.now(),
      title: newEvent.title!,
      description: newEvent.description,
      date: newEvent.date!,
      startTime: newEvent.startTime!,
      endTime: newEvent.endTime!,
      type: newEvent.type!,
      location: newEvent.location,
      attendees: [],
      reminder: newEvent.reminder!,
      reminderMinutes: newEvent.reminderMinutes!,
      priority: newEvent.priority!
    };

    setEvents(prev => [...prev, event]);
    setIsAddDialogOpen(false);
    setNewEvent({
      title: "",
      description: "",
      date: format(new Date(), "yyyy-MM-dd"),
      startTime: "09:00",
      endTime: "10:00",
      type: "Meeting",
      location: "",
      reminder: true,
      reminderMinutes: 15,
      priority: 'medium'
    });
    
    showSuccess("Event Added", `${event.title} has been added to your schedule`);
    
    if (event.reminder) {
      showInfo("Reminder Set", `You'll be notified ${event.reminderMinutes} minutes before the event`);
    }
  };

  const deleteEvent = (eventId: number) => {
    const event = events.find(e => e.id === eventId);
    setEvents(prev => prev.filter(e => e.id !== eventId));
    showSuccess("Event Deleted", `${event?.title} has been removed from your schedule`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      'Meeting': '👥',
      'Review': '📋',
      'Presentation': '📊',
      'Training': '📚',
      'Personal': '👤',
      'Holiday': '🏖️'
    };
    return icons[type] || '📅';
  };

  const todayEvents = events.filter(event => event.date === format(new Date(), "yyyy-MM-dd"));
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Smart Timetable</h1>
          <p className="text-muted-foreground">Intelligent schedule management with notifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-event">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>
                  Create a new event with smart notifications and reminders
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select value={newEvent.type} onValueChange={(value) => setNewEvent(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.slice(1).map(type => (
                          <SelectItem key={type} value={type}>
                            {getTypeIcon(type)} {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Event description (optional)"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Meeting location"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newEvent.priority} onValueChange={(value: any) => setNewEvent(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">🟢 Low</SelectItem>
                        <SelectItem value="medium">🟡 Medium</SelectItem>
                        <SelectItem value="high">🔴 High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="reminder"
                      checked={newEvent.reminder}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, reminder: e.target.checked }))}
                    />
                    <Label htmlFor="reminder">Enable Reminder</Label>
                  </div>
                  {newEvent.reminder && (
                    <Select 
                      value={newEvent.reminderMinutes?.toString()} 
                      onValueChange={(value) => setNewEvent(prev => ({ ...prev, reminderMinutes: parseInt(value) }))}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={addEvent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{todayEvents.length}</div>
            <div className="text-sm text-muted-foreground">Today's Events</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{upcomingEvents.length}</div>
            <div className="text-sm text-muted-foreground">Upcoming Events</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {events.filter(e => e.reminder).length}
            </div>
            <div className="text-sm text-muted-foreground">With Reminders</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="today">Today's Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type !== "All" && getTypeIcon(type)} {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="h-4 w-4 mr-2" />
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

          <Card>
            <CardHeader>
              <CardTitle>
                {selectedDate ? `Events for ${format(selectedDate, "MMMM dd, yyyy")}` : "All Events"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No events found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:shadow-md transition-shadow"
                    data-testid={`event-${event.id}`}
                  >
                    <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xl">{getTypeIcon(event.type)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium" data-testid={`event-${event.id}-title`}>
                          {event.title}
                        </h4>
                        <div className="flex gap-2">
                          <Badge variant="secondary">{event.type}</Badge>
                          <Badge className={getPriorityColor(event.priority)}>
                            {event.priority}
                          </Badge>
                        </div>
                      </div>
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{format(new Date(event.date), "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.reminder && (
                          <div className="flex items-center gap-1">
                            <Bell className="h-3 w-3" />
                            <span>{event.reminderMinutes}min reminder</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setEditingEvent(event)}
                        data-testid={`event-${event.id}-edit`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteEvent(event.id)}
                        data-testid={`event-${event.id}-delete`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Calendar View</h3>
                <p className="text-muted-foreground">Interactive calendar view coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule - {format(new Date(), "MMMM dd, yyyy")}</CardTitle>
            </CardHeader>
            <CardContent>
              {todayEvents.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No events today</h3>
                  <p className="text-muted-foreground">Enjoy your free day!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todayEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl">{getTypeIcon(event.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {event.startTime} - {event.endTime}
                          {event.location && ` • ${event.location}`}
                        </p>
                      </div>
                      <Badge className={getPriorityColor(event.priority)}>
                        {event.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

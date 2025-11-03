import { PrayerCard } from "@/components/prayer-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

//todo: remove mock functionality
const prayerTimes = [
  { name: "Fajr", time: "5:30 AM", countdown: "In 4 hours 15 minutes", isActive: false },
  { name: "Dhuhr", time: "12:45 PM", countdown: "In 2 hours 30 minutes", isActive: true },
  { name: "Asr", time: "3:15 PM", countdown: "In 5 hours", isActive: false },
  { name: "Maghrib", time: "5:42 PM", countdown: "In 7 hours 27 minutes", isActive: false },
  { name: "Isha", time: "7:05 PM", countdown: "In 8 hours 50 minutes", isActive: false },
];

export default function Namaz() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Namaz Alarm</h1>
        <p className="text-muted-foreground">Set reminders for daily prayers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Location Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Your Location</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                placeholder="Enter city name"
                defaultValue="New York"
                data-testid="input-location"
              />
              <Button variant="outline" data-testid="button-update-location">
                <MapPin className="h-4 w-4 mr-2" />
                Update
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Prayer times will adjust based on your location</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prayerTimes.map((prayer, index) => (
          <PrayerCard
            key={prayer.name}
            name={prayer.name}
            time={prayer.time}
            countdown={prayer.countdown}
            isActive={prayer.isActive}
            testId={`prayer-${prayer.name.toLowerCase()}`}
          />
        ))}
      </div>
    </div>
  );
}

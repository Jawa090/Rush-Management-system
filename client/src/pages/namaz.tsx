import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MapPin, Clock, Bell, Volume2, CheckCircle, Timer } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function Namaz() {
  const [location, setLocation] = useState("New York");
  const [prayerTimes, setPrayerTimes] = useState([
    { name: "Fajr", time: "5:30 AM", countdown: "Completed", passed: true, alarmEnabled: true },
    { name: "Dhuhr", time: "12:45 PM", countdown: "In 2h 30m", passed: false, alarmEnabled: true, isNext: true },
    { name: "Asr", time: "3:15 PM", countdown: "In 5h", passed: false, alarmEnabled: false },
    { name: "Maghrib", time: "5:42 PM", countdown: "In 7h 27m", passed: false, alarmEnabled: true },
    { name: "Isha", time: "7:05 PM", countdown: "In 8h 50m", passed: false, alarmEnabled: false },
  ]);
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const { showSuccess, showInfo } = useNotifications();

  const togglePrayerAlarm = (prayerName: string) => {
    setPrayerTimes(prev => prev.map(prayer => 
      prayer.name === prayerName 
        ? { ...prayer, alarmEnabled: !prayer.alarmEnabled }
        : prayer
    ));
    
    const prayer = prayerTimes.find(p => p.name === prayerName);
    if (prayer?.alarmEnabled) {
      showInfo('Alarm Disabled', `${prayerName} alarm turned off`);
    } else {
      showSuccess('Alarm Enabled', `${prayerName} alarm turned on`);
    }
  };

  const enableAllAlarms = () => {
    setPrayerTimes(prev => prev.map(prayer => ({ ...prayer, alarmEnabled: true })));
    showSuccess('All Alarms On', 'Prayer alarms enabled for all prayers');
  };

  const disableAllAlarms = () => {
    setPrayerTimes(prev => prev.map(prayer => ({ ...prayer, alarmEnabled: false })));
    showInfo('All Alarms Off', 'All prayer alarms disabled');
  };

  const nextPrayer = prayerTimes.find(prayer => prayer.isNext);
  const enabledAlarms = prayerTimes.filter(prayer => prayer.alarmEnabled).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Prayer Times</h1>
          <p className="text-muted-foreground">Simple prayer schedule with alarms</p>
        </div>
        <Badge variant={enabledAlarms > 0 ? "default" : "secondary"}>
          <Bell className="h-3 w-3 mr-1" />
          {enabledAlarms}/5 Alarms On
        </Badge>
      </div>

      {/* Next Prayer */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <Timer className="h-6 w-6 text-green-600 dark:text-green-400 animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">
                  Next: {nextPrayer?.name}
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {nextPrayer?.time} • {nextPrayer?.countdown}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {nextPrayer?.countdown}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your city"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => showSuccess('Location Updated', 'Prayer times updated')}>
              Update
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Prayer times will adjust based on your location
          </p>
        </CardContent>
      </Card>

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {prayerTimes.map((prayer) => (
          <Card key={prayer.name} className={`text-center ${
            prayer.isNext 
              ? 'bg-primary/10 dark:bg-primary/20 border-primary' 
              : prayer.passed 
                ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                : ''
          }`}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{prayer.name}</h3>
                  <p className="text-2xl font-bold text-primary">{prayer.time}</p>
                  <p className="text-sm text-muted-foreground">{prayer.countdown}</p>
                </div>
                
                {prayer.passed && (
                  <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 mx-auto" />
                )}
                
                {prayer.isNext && (
                  <Timer className="h-6 w-6 text-primary mx-auto animate-pulse" />
                )}
                
                <div className="flex items-center justify-center gap-2">
                  <Bell className={`h-4 w-4 ${prayer.alarmEnabled ? 'text-green-500' : 'text-muted-foreground'}`} />
                  <Switch
                    checked={prayer.alarmEnabled}
                    onCheckedChange={() => togglePrayerAlarm(prayer.name)}
                    size="sm"
                  />
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {prayer.alarmEnabled ? 'Alarm On' : 'Alarm Off'}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={enableAllAlarms} className="bg-green-600 hover:bg-green-700">
              <Bell className="h-4 w-4 mr-2" />
              Enable All Alarms
            </Button>
            <Button onClick={disableAllAlarms} variant="outline">
              Turn Off All Alarms
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Sound Notifications</Label>
                <p className="text-sm text-muted-foreground">Play Adhan sound</p>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Show alerts</p>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple Qibla Direction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Qibla Direction</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 border-4 border-green-200 dark:border-green-800 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">45°</div>
              <div className="text-sm text-green-600 dark:text-green-400">NE</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Qibla direction from {location}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

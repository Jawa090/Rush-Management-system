import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, MapPin, Bell, Save, Volume2, Calendar, Settings } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function AdminPrayerTimes() {
  const { showSuccess } = useNotifications();
  const [settings, setSettings] = useState({
    location: "New York, NY",
    latitude: "40.7128",
    longitude: "-74.0060",
    calculationMethod: "ISNA",
    asrMethod: "Standard",
    highLatitudeRule: "MiddleOfNight",
    
    // Prayer time adjustments (in minutes)
    fajrAdjustment: 0,
    dhuhrAdjustment: 0,
    asrAdjustment: 0,
    maghribAdjustment: 0,
    ishaAdjustment: 0,
    
    // Notification settings
    notificationsEnabled: true,
    soundEnabled: true,
    reminderMinutes: 15,
    
    // Display settings
    showOnDashboard: true,
    showInSidebar: true,
    use24HourFormat: false
  });

  const prayerTimes = [
    { name: "Fajr", time: "05:30 AM", adjustment: settings.fajrAdjustment },
    { name: "Dhuhr", time: "12:45 PM", adjustment: settings.dhuhrAdjustment },
    { name: "Asr", time: "03:15 PM", adjustment: settings.asrAdjustment },
    { name: "Maghrib", time: "05:42 PM", adjustment: settings.maghribAdjustment },
    { name: "Isha", time: "07:05 PM", adjustment: settings.ishaAdjustment }
  ];

  const calculationMethods = [
    { value: "ISNA", label: "Islamic Society of North America (ISNA)" },
    { value: "MWL", label: "Muslim World League (MWL)" },
    { value: "Egypt", label: "Egyptian General Authority of Survey" },
    { value: "Makkah", label: "Umm Al-Qura University, Makkah" },
    { value: "Karachi", label: "University of Islamic Sciences, Karachi" },
    { value: "Tehran", label: "Institute of Geophysics, University of Tehran" },
    { value: "Jafari", label: "Shia Ithna-Ashari, Leva Institute, Qum" }
  ];

  const handleSave = () => {
    showSuccess("Settings Saved", "Prayer time settings have been updated successfully.");
  };

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleInputChange = (key: string, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Prayer Times Management</h1>
          <p className="text-muted-foreground">Configure Islamic prayer times for your organization</p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>

      {/* Current Prayer Times Preview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Prayer Times
          </CardTitle>
          <CardDescription>Current prayer schedule based on your settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {prayerTimes.map((prayer) => (
              <div key={prayer.name} className="text-center p-4 rounded-lg bg-white dark:bg-gray-900 border border-border/50">
                <div className="text-lg font-bold text-primary">{prayer.time}</div>
                <div className="text-sm text-muted-foreground">{prayer.name}</div>
                {prayer.adjustment !== 0 && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    {prayer.adjustment > 0 ? '+' : ''}{prayer.adjustment} min
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Settings
            </CardTitle>
            <CardDescription>Set your organization's location for accurate prayer times</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location Name</Label>
              <Input 
                id="location" 
                value={settings.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., New York, NY"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input 
                  id="latitude" 
                  value={settings.latitude}
                  onChange={(e) => handleInputChange('latitude', e.target.value)}
                  placeholder="40.7128"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input 
                  id="longitude" 
                  value={settings.longitude}
                  onChange={(e) => handleInputChange('longitude', e.target.value)}
                  placeholder="-74.0060"
                />
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <MapPin className="h-4 w-4 mr-2" />
              Detect Current Location
            </Button>
          </CardContent>
        </Card>

        {/* Calculation Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Calculation Method
            </CardTitle>
            <CardDescription>Choose the calculation method for prayer times</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="calculationMethod">Calculation Method</Label>
              <Select 
                value={settings.calculationMethod}
                onValueChange={(value) => handleInputChange('calculationMethod', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {calculationMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="asrMethod">Asr Calculation</Label>
              <Select 
                value={settings.asrMethod}
                onValueChange={(value) => handleInputChange('asrMethod', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard (Shafi, Maliki, Hanbali)</SelectItem>
                  <SelectItem value="Hanafi">Hanafi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="highLatitude">High Latitude Rule</Label>
              <Select 
                value={settings.highLatitudeRule}
                onValueChange={(value) => handleInputChange('highLatitudeRule', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MiddleOfNight">Middle of Night</SelectItem>
                  <SelectItem value="SeventhOfNight">Seventh of Night</SelectItem>
                  <SelectItem value="TwilightAngle">Twilight Angle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Time Adjustments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Time Adjustments
            </CardTitle>
            <CardDescription>Fine-tune prayer times (in minutes)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {prayerTimes.map((prayer) => (
              <div key={prayer.name} className="flex items-center justify-between">
                <Label htmlFor={`${prayer.name.toLowerCase()}Adj`}>{prayer.name}</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id={`${prayer.name.toLowerCase()}Adj`}
                    type="number"
                    value={settings[`${prayer.name.toLowerCase()}Adjustment` as keyof typeof settings] as number}
                    onChange={(e) => handleInputChange(`${prayer.name.toLowerCase()}Adjustment`, parseInt(e.target.value) || 0)}
                    className="w-20 text-center"
                    placeholder="0"
                  />
                  <span className="text-sm text-muted-foreground">min</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure prayer time notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Enable Notifications</Label>
                <p className="text-xs text-muted-foreground">Send prayer time notifications to all employees</p>
              </div>
              <Switch 
                checked={settings.notificationsEnabled}
                onCheckedChange={() => handleToggle('notificationsEnabled')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Prayer Sound</Label>
                <p className="text-xs text-muted-foreground">Play adhan sound for notifications</p>
              </div>
              <Switch 
                checked={settings.soundEnabled}
                onCheckedChange={() => handleToggle('soundEnabled')}
                disabled={!settings.notificationsEnabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reminderMinutes">Reminder Before Prayer</Label>
              <Select 
                value={settings.reminderMinutes.toString()}
                onValueChange={(value) => handleInputChange('reminderMinutes', parseInt(value))}
                disabled={!settings.notificationsEnabled}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Display Settings
            </CardTitle>
            <CardDescription>Control how prayer times are displayed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Show on Dashboard</Label>
                <p className="text-xs text-muted-foreground">Display prayer times on employee dashboard</p>
              </div>
              <Switch 
                checked={settings.showOnDashboard}
                onCheckedChange={() => handleToggle('showOnDashboard')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Show in Sidebar</Label>
                <p className="text-xs text-muted-foreground">Display next prayer in navigation sidebar</p>
              </div>
              <Switch 
                checked={settings.showInSidebar}
                onCheckedChange={() => handleToggle('showInSidebar')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">24-Hour Format</Label>
                <p className="text-xs text-muted-foreground">Use 24-hour time format instead of AM/PM</p>
              </div>
              <Switch 
                checked={settings.use24HourFormat}
                onCheckedChange={() => handleToggle('use24HourFormat')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Test Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Test & Preview
            </CardTitle>
            <CardDescription>Test your prayer time notification settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              Send Test Notification
            </Button>
            <Button variant="outline" className="w-full">
              <Volume2 className="h-4 w-4 mr-2" />
              Play Adhan Sound
            </Button>
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              View Monthly Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
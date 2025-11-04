import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Clock, 
  Calendar,
  Users,
  FileText,
  Heart,
  Shield,
  Volume2,
  VolumeX,
  Save,
  Settings
} from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function NotificationPreferences() {
  const { showSuccess } = useNotifications();
  const [preferences, setPreferences] = useState({
    // Email Notifications
    emailEnabled: true,
    emailLeaveRequests: true,
    emailMeetingReminders: true,
    emailPrayerTimes: true,
    emailSystemUpdates: false,
    emailMarketing: false,
    
    // Push Notifications
    pushEnabled: true,
    pushLeaveRequests: true,
    pushMeetingReminders: true,
    pushPrayerTimes: true,
    pushSystemUpdates: true,
    pushMarketing: false,
    
    // In-App Notifications
    inAppEnabled: true,
    inAppLeaveRequests: true,
    inAppMeetingReminders: true,
    inAppPrayerTimes: true,
    inAppSystemUpdates: true,
    
    // Sound & Timing
    soundEnabled: true,
    quietHoursEnabled: true,
    quietHoursStart: "22:00",
    quietHoursEnd: "08:00",
    
    // Frequency
    digestFrequency: "daily",
    reminderTiming: "15min"
  });

  const handleToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    showSuccess("Preferences Saved", "Your notification preferences have been updated successfully.");
  };

  const NotificationToggle = ({ 
    id, 
    label, 
    description, 
    icon, 
    checked, 
    disabled = false 
  }: {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    checked: boolean;
    disabled?: boolean;
  }) => (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
      <div className="flex items-start gap-3 flex-1">
        <div className="mt-1">{icon}</div>
        <div className="space-y-1">
          <Label htmlFor={id} className="text-sm font-medium cursor-pointer">
            {label}
          </Label>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={() => handleToggle(id)}
        disabled={disabled}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notification Preferences</h1>
          <p className="text-muted-foreground">Customize how and when you receive notifications</p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Preferences
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Notifications
            </CardTitle>
            <CardDescription>
              Control which notifications you receive via email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <NotificationToggle
              id="emailEnabled"
              label="Enable Email Notifications"
              description="Master switch for all email notifications"
              icon={<Mail className="h-4 w-4 text-blue-500" />}
              checked={preferences.emailEnabled}
            />
            
            <Separator />
            
            <NotificationToggle
              id="emailLeaveRequests"
              label="Leave Request Updates"
              description="Status updates on your leave requests"
              icon={<FileText className="h-4 w-4 text-green-500" />}
              checked={preferences.emailLeaveRequests}
              disabled={!preferences.emailEnabled}
            />
            
            <NotificationToggle
              id="emailMeetingReminders"
              label="Meeting Reminders"
              description="Upcoming meetings and calendar events"
              icon={<Calendar className="h-4 w-4 text-purple-500" />}
              checked={preferences.emailMeetingReminders}
              disabled={!preferences.emailEnabled}
            />
            
            <NotificationToggle
              id="emailPrayerTimes"
              label="Prayer Time Reminders"
              description="Daily prayer time notifications"
              icon={<Heart className="h-4 w-4 text-red-500" />}
              checked={preferences.emailPrayerTimes}
              disabled={!preferences.emailEnabled}
            />
            
            <NotificationToggle
              id="emailSystemUpdates"
              label="System Updates"
              description="Important system announcements"
              icon={<Shield className="h-4 w-4 text-orange-500" />}
              checked={preferences.emailSystemUpdates}
              disabled={!preferences.emailEnabled}
            />
          </CardContent>
        </Card>

        {/* Push Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Push Notifications
            </CardTitle>
            <CardDescription>
              Real-time notifications on your device
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <NotificationToggle
              id="pushEnabled"
              label="Enable Push Notifications"
              description="Master switch for all push notifications"
              icon={<Smartphone className="h-4 w-4 text-blue-500" />}
              checked={preferences.pushEnabled}
            />
            
            <Separator />
            
            <NotificationToggle
              id="pushLeaveRequests"
              label="Leave Request Updates"
              description="Instant updates on leave status"
              icon={<FileText className="h-4 w-4 text-green-500" />}
              checked={preferences.pushLeaveRequests}
              disabled={!preferences.pushEnabled}
            />
            
            <NotificationToggle
              id="pushMeetingReminders"
              label="Meeting Reminders"
              description="Timely meeting notifications"
              icon={<Calendar className="h-4 w-4 text-purple-500" />}
              checked={preferences.pushMeetingReminders}
              disabled={!preferences.pushEnabled}
            />
            
            <NotificationToggle
              id="pushPrayerTimes"
              label="Prayer Time Alerts"
              description="Prayer time notifications with sound"
              icon={<Heart className="h-4 w-4 text-red-500" />}
              checked={preferences.pushPrayerTimes}
              disabled={!preferences.pushEnabled}
            />
            
            <NotificationToggle
              id="pushSystemUpdates"
              label="System Alerts"
              description="Critical system notifications"
              icon={<Shield className="h-4 w-4 text-orange-500" />}
              checked={preferences.pushSystemUpdates}
              disabled={!preferences.pushEnabled}
            />
          </CardContent>
        </Card>

        {/* Sound & Timing Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Sound & Timing
            </CardTitle>
            <CardDescription>
              Configure notification sounds and quiet hours
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <NotificationToggle
              id="soundEnabled"
              label="Notification Sounds"
              description="Play sounds for notifications"
              icon={preferences.soundEnabled ? <Volume2 className="h-4 w-4 text-blue-500" /> : <VolumeX className="h-4 w-4 text-gray-500" />}
              checked={preferences.soundEnabled}
            />
            
            <Separator />
            
            <div className="space-y-4">
              <NotificationToggle
                id="quietHoursEnabled"
                label="Quiet Hours"
                description="Disable notifications during specified hours"
                icon={<Clock className="h-4 w-4 text-indigo-500" />}
                checked={preferences.quietHoursEnabled}
              />
              
              {preferences.quietHoursEnabled && (
                <div className="grid grid-cols-2 gap-4 pl-7">
                  <div className="space-y-2">
                    <Label htmlFor="quietHoursStart" className="text-sm">Start Time</Label>
                    <Select
                      value={preferences.quietHoursStart}
                      onValueChange={(value) => handleSelectChange("quietHoursStart", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quietHoursEnd" className="text-sm">End Time</Label>
                    <Select
                      value={preferences.quietHoursEnd}
                      onValueChange={(value) => handleSelectChange("quietHoursEnd", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, '0');
                          return (
                            <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                              {hour}:00
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Frequency & Digest Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Frequency & Digest
            </CardTitle>
            <CardDescription>
              Control notification frequency and digest settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="digestFrequency">Email Digest Frequency</Label>
              <Select
                value={preferences.digestFrequency}
                onValueChange={(value) => handleSelectChange("digestFrequency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                How often you receive email summaries of notifications
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="reminderTiming">Meeting Reminder Timing</Label>
              <Select
                value={preferences.reminderTiming}
                onValueChange={(value) => handleSelectChange("reminderTiming", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5min">5 minutes before</SelectItem>
                  <SelectItem value="15min">15 minutes before</SelectItem>
                  <SelectItem value="30min">30 minutes before</SelectItem>
                  <SelectItem value="1hour">1 hour before</SelectItem>
                  <SelectItem value="1day">1 day before</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                When to send meeting reminders
              </p>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Current Status</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={preferences.emailEnabled ? "default" : "secondary"}>
                  Email: {preferences.emailEnabled ? "On" : "Off"}
                </Badge>
                <Badge variant={preferences.pushEnabled ? "default" : "secondary"}>
                  Push: {preferences.pushEnabled ? "On" : "Off"}
                </Badge>
                <Badge variant={preferences.soundEnabled ? "default" : "secondary"}>
                  Sound: {preferences.soundEnabled ? "On" : "Off"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
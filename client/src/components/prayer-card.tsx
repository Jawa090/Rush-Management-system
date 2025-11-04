import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Volume2, Clock, Settings } from "lucide-react";
import { useState } from "react";

interface PrayerCardProps {
  name: string;
  time: string;
  countdown?: string;
  isActive?: boolean;
  alarmEnabled?: boolean;
  onAlarmToggle?: (enabled: boolean) => void;
  testId?: string;
}

export function PrayerCard({ 
  name, 
  time, 
  countdown, 
  isActive = false, 
  alarmEnabled = false,
  onAlarmToggle,
  testId 
}: PrayerCardProps) {
  const [showSettings, setShowSettings] = useState(false);

  const handleAlarmToggle = (checked: boolean) => {
    onAlarmToggle?.(checked);
  };

  const getPrayerIcon = (prayerName: string) => {
    const icons: Record<string, string> = {
      'Fajr': '🌅',
      'Dhuhr': '☀️',
      'Asr': '🌤️',
      'Maghrib': '🌅',
      'Isha': '🌙'
    };
    return icons[prayerName] || '🕌';
  };

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-md ${
        isActive 
          ? "border-primary bg-primary/5 shadow-md" 
          : alarmEnabled 
            ? "border-green-200 bg-green-50/50" 
            : ""
      }`} 
      data-testid={testId}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-xl">{getPrayerIcon(name)}</span>
            {name}
          </CardTitle>
          {isActive && (
            <Badge variant="default" className="text-xs animate-pulse">
              Next
            </Badge>
          )}
          {alarmEnabled && !isActive && (
            <Badge variant="secondary" className="text-xs">
              <Bell className="h-3 w-3 mr-1" />
              On
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className={`text-3xl font-bold ${isActive ? 'text-primary' : ''}`}>
            {time}
          </p>
          {countdown && (
            <p className={`text-sm mt-1 ${
              isActive ? 'text-primary/70' : 'text-muted-foreground'
            }`}>
              {countdown}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor={`alarm-${name}`} className="text-sm font-medium">
              Prayer Alarm
            </Label>
            <Switch
              id={`alarm-${name}`}
              checked={alarmEnabled}
              onCheckedChange={handleAlarmToggle}
              data-testid={`${testId}-switch`}
            />
          </div>

          {alarmEnabled && (
            <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1">
                  <Volume2 className="h-3 w-3" />
                  Adhan Sound
                </span>
                <Switch defaultChecked size="sm" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  5 min reminder
                </span>
                <Switch defaultChecked size="sm" />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-3 w-3 mr-1" />
            Settings
          </Button>
          {alarmEnabled && (
            <Button variant="outline" size="sm" className="text-xs">
              <Volume2 className="h-3 w-3 mr-1" />
              Test
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

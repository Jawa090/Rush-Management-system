import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";
import { useState } from "react";

interface PrayerCardProps {
  name: string;
  time: string;
  countdown?: string;
  isActive?: boolean;
  testId?: string;
}

export function PrayerCard({ name, time, countdown, isActive = false, testId }: PrayerCardProps) {
  const [alarmEnabled, setAlarmEnabled] = useState(false);

  return (
    <Card className={isActive ? "border-primary" : ""} data-testid={testId}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="w-4 h-4" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-3xl font-bold">{time}</p>
          {countdown && <p className="text-sm text-muted-foreground mt-1">{countdown}</p>}
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor={`alarm-${name}`} className="text-sm">Enable Alarm</Label>
          <Switch
            id={`alarm-${name}`}
            checked={alarmEnabled}
            onCheckedChange={(checked) => {
              setAlarmEnabled(checked);
              console.log(`${name} alarm ${checked ? 'enabled' : 'disabled'}`);
            }}
            data-testid={`${testId}-switch`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

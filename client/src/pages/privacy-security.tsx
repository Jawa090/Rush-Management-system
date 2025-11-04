import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Key, 
  Smartphone,
  Globe,
  Activity,
  MapPin,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Trash2,
  Download,
  RefreshCw
} from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function PrivacySecurity() {
  const { showSuccess, showInfo } = useNotifications();
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "team",
    showOnlineStatus: true,
    shareLocation: false,
    shareActivity: true,
    allowDirectMessages: true,
    showLastSeen: false,
    dataCollection: true,
    analyticsOptIn: false,
    marketingOptIn: false,
    thirdPartySharing: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    loginAlerts: true,
    suspiciousActivityAlerts: true,
    passwordChangeAlerts: true,
    deviceManagement: true,
    sessionManagement: true,
    ipWhitelist: false,
    apiAccess: false
  });

  const handlePrivacyToggle = (key: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSecurityToggle = (key: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSaveSettings = () => {
    showSuccess("Settings Saved", "Your privacy and security settings have been updated.");
  };

  const handleClearData = (dataType: string) => {
    showInfo("Data Cleared", `Your ${dataType} data has been cleared successfully.`);
  };

  const mockSessions = [
    {
      id: 1,
      device: "MacBook Pro",
      location: "New York, NY",
      lastActive: "Active now",
      current: true,
      browser: "Chrome 120.0"
    },
    {
      id: 2,
      device: "iPhone 15",
      location: "New York, NY", 
      lastActive: "2 hours ago",
      current: false,
      browser: "Safari Mobile"
    },
    {
      id: 3,
      device: "Windows PC",
      location: "Remote Office",
      lastActive: "1 day ago",
      current: false,
      browser: "Edge 120.0"
    }
  ];

  const mockLoginHistory = [
    { date: "2024-01-15 09:30", location: "New York, NY", device: "MacBook Pro", status: "success" },
    { date: "2024-01-14 18:45", location: "New York, NY", device: "iPhone 15", status: "success" },
    { date: "2024-01-14 09:15", location: "New York, NY", device: "MacBook Pro", status: "success" },
    { date: "2024-01-13 14:20", location: "Unknown Location", device: "Unknown Device", status: "failed" },
    { date: "2024-01-13 09:00", location: "New York, NY", device: "MacBook Pro", status: "success" }
  ];

  const securityScore = 85;

  const PrivacyToggle = ({ 
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
        onCheckedChange={() => handlePrivacyToggle(id)}
        disabled={disabled}
      />
    </div>
  );

  const SecurityToggle = ({ 
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
        onCheckedChange={() => handleSecurityToggle(id)}
        disabled={disabled}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Privacy & Security</h1>
          <p className="text-muted-foreground">Control your privacy settings and security preferences</p>
        </div>
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Save Settings
        </Button>
      </div>

      {/* Security Score */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Security Score</h3>
              <p className="text-sm text-muted-foreground">Your account security rating</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{securityScore}%</div>
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">
                Good
              </Badge>
            </div>
          </div>
          <Progress value={securityScore} className="h-2" />
          <div className="flex items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              <span>2FA Enabled</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              <span>Strong Password</span>
            </div>
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
              <AlertTriangle className="h-4 w-4" />
              <span>Review Login History</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Privacy Settings
            </CardTitle>
            <CardDescription>
              Control who can see your information and activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileVisibility">Profile Visibility</Label>
              <select 
                id="profileVisibility"
                value={privacySettings.profileVisibility}
                onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                className="w-full p-2 border border-border rounded-md bg-background"
              >
                <option value="public">Everyone</option>
                <option value="company">Company Only</option>
                <option value="team">Team Members Only</option>
                <option value="private">Private</option>
              </select>
            </div>

            <Separator />

            <PrivacyToggle
              id="showOnlineStatus"
              label="Show Online Status"
              description="Let others see when you're online"
              icon={<Activity className="h-4 w-4 text-green-500" />}
              checked={privacySettings.showOnlineStatus}
            />

            <PrivacyToggle
              id="shareLocation"
              label="Share Location"
              description="Allow location sharing for work purposes"
              icon={<MapPin className="h-4 w-4 text-blue-500" />}
              checked={privacySettings.shareLocation}
            />

            <PrivacyToggle
              id="shareActivity"
              label="Share Activity Status"
              description="Show your current work activity"
              icon={<Clock className="h-4 w-4 text-purple-500" />}
              checked={privacySettings.shareActivity}
            />

            <PrivacyToggle
              id="allowDirectMessages"
              label="Allow Direct Messages"
              description="Let team members send you direct messages"
              icon={<Users className="h-4 w-4 text-orange-500" />}
              checked={privacySettings.allowDirectMessages}
            />

            <PrivacyToggle
              id="showLastSeen"
              label="Show Last Seen"
              description="Display when you were last active"
              icon={<Clock className="h-4 w-4 text-indigo-500" />}
              checked={privacySettings.showLastSeen}
            />
          </CardContent>
        </Card>

        {/* Security Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Alerts
            </CardTitle>
            <CardDescription>
              Configure security notifications and monitoring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SecurityToggle
              id="loginAlerts"
              label="Login Alerts"
              description="Get notified of new login attempts"
              icon={<Key className="h-4 w-4 text-blue-500" />}
              checked={securitySettings.loginAlerts}
            />

            <SecurityToggle
              id="suspiciousActivityAlerts"
              label="Suspicious Activity Alerts"
              description="Alert me of unusual account activity"
              icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
              checked={securitySettings.suspiciousActivityAlerts}
            />

            <SecurityToggle
              id="passwordChangeAlerts"
              label="Password Change Alerts"
              description="Notify when password is changed"
              icon={<Lock className="h-4 w-4 text-green-500" />}
              checked={securitySettings.passwordChangeAlerts}
            />

            <SecurityToggle
              id="deviceManagement"
              label="Device Management"
              description="Monitor and manage connected devices"
              icon={<Smartphone className="h-4 w-4 text-purple-500" />}
              checked={securitySettings.deviceManagement}
            />

            <SecurityToggle
              id="sessionManagement"
              label="Session Management"
              description="Track and control active sessions"
              icon={<Globe className="h-4 w-4 text-orange-500" />}
              checked={securitySettings.sessionManagement}
            />

            <SecurityToggle
              id="ipWhitelist"
              label="IP Whitelist"
              description="Restrict access to approved IP addresses"
              icon={<Shield className="h-4 w-4 text-indigo-500" />}
              checked={securitySettings.ipWhitelist}
            />
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Data Collection
            </CardTitle>
            <CardDescription>
              Control how your data is collected and used
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <PrivacyToggle
              id="dataCollection"
              label="Essential Data Collection"
              description="Allow collection of data necessary for app functionality"
              icon={<FileText className="h-4 w-4 text-blue-500" />}
              checked={privacySettings.dataCollection}
              disabled={true}
            />

            <PrivacyToggle
              id="analyticsOptIn"
              label="Analytics & Performance"
              description="Help improve the app with usage analytics"
              icon={<Activity className="h-4 w-4 text-green-500" />}
              checked={privacySettings.analyticsOptIn}
            />

            <PrivacyToggle
              id="marketingOptIn"
              label="Marketing Communications"
              description="Receive product updates and company news"
              icon={<Users className="h-4 w-4 text-purple-500" />}
              checked={privacySettings.marketingOptIn}
            />

            <PrivacyToggle
              id="thirdPartySharing"
              label="Third-Party Data Sharing"
              description="Allow sharing data with approved partners"
              icon={<Globe className="h-4 w-4 text-orange-500" />}
              checked={privacySettings.thirdPartySharing}
            />

            <Separator />

            <div className="space-y-3">
              <Button 
                variant="outline" 
                onClick={() => handleClearData("browsing")}
                className="w-full justify-start"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Browsing Data
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleClearData("activity")}
                className="w-full justify-start"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear Activity History
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleClearData("cache")}
                className="w-full justify-start"
              >
                <Download className="h-4 w-4 mr-2" />
                Download My Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Active Sessions
            </CardTitle>
            <CardDescription>
              Manage your active login sessions across devices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{session.device}</span>
                      {session.current && (
                        <Badge variant="secondary" className="text-xs">Current</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{session.browser}</p>
                    <p className="text-xs text-muted-foreground">{session.location} • {session.lastActive}</p>
                  </div>
                </div>
                {!session.current && (
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Login History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Login History
          </CardTitle>
          <CardDescription>
            Review your recent login attempts and security events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLoginHistory.map((login, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    login.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{login.date}</span>
                      {login.status === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {login.device} • {login.location}
                    </p>
                  </div>
                </div>
                <Badge variant={login.status === 'success' ? 'secondary' : 'destructive'}>
                  {login.status === 'success' ? 'Success' : 'Failed'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
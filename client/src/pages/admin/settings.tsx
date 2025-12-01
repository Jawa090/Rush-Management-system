import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Mail, Bell, Shield, Database, Globe, Clock, Save } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function AdminSettings() {
  const { showSuccess } = useNotifications();
  const [settings, setSettings] = useState({
    // General Settings
    companyName: "Rush Corporation",
    companyEmail: "info@rushcorp.com",
    companyPhone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    
    // Email Settings
    emailNotifications: true,
    emailHost: "smtp.rushcorp.com",
    emailPort: "587",
    emailUsername: "noreply@rushcorp.com",
    
    // Security Settings
    passwordMinLength: 8,
    passwordRequireSpecialChar: true,
    sessionTimeout: 30,
    twoFactorAuth: true,
    ipWhitelist: false,
    
    // System Settings
    maintenanceMode: false,
    autoBackup: true,
    backupFrequency: "daily",
    maxFileSize: 50,
    
    // Prayer Times
    prayerNotifications: true,
    prayerCalculationMethod: "ISNA",
    prayerSoundEnabled: true
  });

  const handleSave = () => {
    showSuccess("Settings Saved", "System settings have been updated successfully.");
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
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="prayer">Prayer Times</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Company Information
              </CardTitle>
              <CardDescription>Basic company details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName" 
                  value={settings.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Company Email</Label>
                  <Input 
                    id="companyEmail" 
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Company Phone</Label>
                  <Input 
                    id="companyPhone" 
                    type="tel"
                    value={settings.companyPhone}
                    onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                  />
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone"
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Asia/Dubai">Dubai (GST)</option>
                    <option value="Asia/Karachi">Pakistan (PKT)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <select 
                    id="dateFormat"
                    value={settings.dateFormat}
                    onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Configuration
              </CardTitle>
              <CardDescription>Configure SMTP settings for email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Enable system email notifications</p>
                </div>
                <Switch 
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle('emailNotifications')}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="emailHost">SMTP Host</Label>
                <Input 
                  id="emailHost" 
                  value={settings.emailHost}
                  onChange={(e) => handleInputChange('emailHost', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emailPort">SMTP Port</Label>
                  <Input 
                    id="emailPort" 
                    value={settings.emailPort}
                    onChange={(e) => handleInputChange('emailPort', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailUsername">SMTP Username</Label>
                  <Input 
                    id="emailUsername" 
                    value={settings.emailUsername}
                    onChange={(e) => handleInputChange('emailUsername', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailPassword">SMTP Password</Label>
                <Input id="emailPassword" type="password" placeholder="••••••••" />
              </div>
              <Button variant="outline">Test Email Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>Manage security policies and authentication settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                <Input 
                  id="passwordMinLength" 
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => handleInputChange('passwordMinLength', parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Require Special Characters</Label>
                  <p className="text-xs text-muted-foreground">Passwords must include special characters</p>
                </div>
                <Switch 
                  checked={settings.passwordRequireSpecialChar}
                  onCheckedChange={() => handleToggle('passwordRequireSpecialChar')}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input 
                  id="sessionTimeout" 
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                  <p className="text-xs text-muted-foreground">Require 2FA for all users</p>
                </div>
                <Switch 
                  checked={settings.twoFactorAuth}
                  onCheckedChange={() => handleToggle('twoFactorAuth')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">IP Whitelist</Label>
                  <p className="text-xs text-muted-foreground">Restrict access to approved IP addresses</p>
                </div>
                <Switch 
                  checked={settings.ipWhitelist}
                  onCheckedChange={() => handleToggle('ipWhitelist')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>Manage system maintenance and backup settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <div>
                  <Label className="text-sm font-medium">Maintenance Mode</Label>
                  <p className="text-xs text-muted-foreground">Disable access for all users except admins</p>
                </div>
                <Switch 
                  checked={settings.maintenanceMode}
                  onCheckedChange={() => handleToggle('maintenanceMode')}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Automatic Backups</Label>
                  <p className="text-xs text-muted-foreground">Enable scheduled database backups</p>
                </div>
                <Switch 
                  checked={settings.autoBackup}
                  onCheckedChange={() => handleToggle('autoBackup')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <select 
                  id="backupFrequency"
                  value={settings.backupFrequency}
                  onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                  disabled={!settings.autoBackup}
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Maximum File Upload Size (MB)</Label>
                <Input 
                  id="maxFileSize" 
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleInputChange('maxFileSize', parseInt(e.target.value))}
                />
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline">Run Backup Now</Button>
                <Button variant="outline">Clear Cache</Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700">Reset System</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prayer Times Settings */}
        <TabsContent value="prayer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Prayer Times Configuration
              </CardTitle>
              <CardDescription>Configure Islamic prayer time settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Prayer Notifications</Label>
                  <p className="text-xs text-muted-foreground">Enable prayer time notifications for all users</p>
                </div>
                <Switch 
                  checked={settings.prayerNotifications}
                  onCheckedChange={() => handleToggle('prayerNotifications')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calculationMethod">Calculation Method</Label>
                <select 
                  id="calculationMethod"
                  value={settings.prayerCalculationMethod}
                  onChange={(e) => handleInputChange('prayerCalculationMethod', e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="ISNA">Islamic Society of North America (ISNA)</option>
                  <option value="MWL">Muslim World League (MWL)</option>
                  <option value="Egypt">Egyptian General Authority</option>
                  <option value="Makkah">Umm Al-Qura University, Makkah</option>
                  <option value="Karachi">University of Islamic Sciences, Karachi</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Prayer Sound</Label>
                  <p className="text-xs text-muted-foreground">Play adhan sound for prayer notifications</p>
                </div>
                <Switch 
                  checked={settings.prayerSoundEnabled}
                  onCheckedChange={() => handleToggle('prayerSoundEnabled')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
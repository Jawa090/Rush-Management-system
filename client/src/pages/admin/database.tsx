import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Database, Download, Upload, RefreshCw, Trash2, HardDrive, Activity, AlertCircle, CheckCircle } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

export default function AdminDatabase() {
  const { showSuccess, showInfo } = useNotifications();

  const handleBackup = () => {
    showSuccess("Backup Started", "Database backup is in progress...");
  };

  const handleRestore = () => {
    showInfo("Restore", "Please select a backup file to restore.");
  };

  const handleOptimize = () => {
    showSuccess("Optimization Complete", "Database has been optimized successfully.");
  };

  const databaseStats = {
    totalSize: "2.5 GB",
    tables: 45,
    records: 125847,
    lastBackup: "2025-01-15 02:00 AM",
    status: "healthy",
    uptime: "99.9%"
  };

  const tables = [
    { name: "users", records: 127, size: "15 MB", lastModified: "2025-01-15" },
    { name: "employees", records: 127, size: "25 MB", lastModified: "2025-01-15" },
    { name: "departments", records: 8, size: "2 MB", lastModified: "2025-01-10" },
    { name: "leave_requests", records: 245, size: "18 MB", lastModified: "2025-01-15" },
    { name: "documents", records: 234, size: "1.2 GB", lastModified: "2025-01-14" },
    { name: "policies", records: 12, size: "8 MB", lastModified: "2025-01-12" },
    { name: "announcements", records: 45, size: "5 MB", lastModified: "2025-01-15" },
    { name: "duas", records: 156, size: "12 MB", lastModified: "2025-01-08" },
    { name: "attendance", records: 12450, size: "85 MB", lastModified: "2025-01-15" },
    { name: "activity_logs", records: 112345, size: "450 MB", lastModified: "2025-01-15" }
  ];

  const backupHistory = [
    {
      id: 1,
      date: "2025-01-15 02:00 AM",
      size: "2.5 GB",
      type: "Automatic",
      status: "success",
      duration: "3m 45s"
    },
    {
      id: 2,
      date: "2025-01-14 02:00 AM",
      size: "2.4 GB",
      type: "Automatic",
      status: "success",
      duration: "3m 32s"
    },
    {
      id: 3,
      date: "2025-01-13 02:00 AM",
      size: "2.4 GB",
      type: "Automatic",
      status: "success",
      duration: "3m 28s"
    },
    {
      id: 4,
      date: "2025-01-12 14:30 PM",
      size: "2.3 GB",
      type: "Manual",
      status: "success",
      duration: "3m 15s"
    },
    {
      id: 5,
      date: "2025-01-12 02:00 AM",
      size: "2.3 GB",
      type: "Automatic",
      status: "success",
      duration: "3m 20s"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Database Management</h1>
          <p className="text-muted-foreground">Monitor and manage database operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleOptimize}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Optimize
          </Button>
          <Button variant="outline" onClick={handleRestore}>
            <Upload className="h-4 w-4 mr-2" />
            Restore
          </Button>
          <Button onClick={handleBackup}>
            <Download className="h-4 w-4 mr-2" />
            Backup Now
          </Button>
        </div>
      </div>

      {/* Database Status */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Database Status: Healthy</h3>
                <p className="text-sm text-green-600 dark:text-green-400">All systems operational • Uptime: {databaseStats.uptime}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">{databaseStats.totalSize}</div>
              <div className="text-sm text-green-600 dark:text-green-400">Total Size</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tables</p>
                <p className="text-2xl font-bold">{databaseStats.tables}</p>
              </div>
              <Database className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">{databaseStats.records.toLocaleString()}</p>
              </div>
              <HardDrive className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Database Size</p>
                <p className="text-2xl font-bold">{databaseStats.totalSize}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Backup</p>
                <p className="text-sm font-bold">{databaseStats.lastBackup}</p>
              </div>
              <Download className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Database Tables */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Tables
            </CardTitle>
            <CardDescription>Overview of all database tables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tables.map((table, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <div className="flex-1">
                    <div className="font-medium">{table.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {table.records.toLocaleString()} records • Last modified: {table.lastModified}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{table.size}</div>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Backup History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Backup History
            </CardTitle>
            <CardDescription>Recent database backups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {backupHistory.map((backup) => (
                <div key={backup.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{backup.date}</span>
                      <Badge variant={backup.type === 'Automatic' ? 'secondary' : 'default'}>
                        {backup.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {backup.size} • Duration: {backup.duration}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Database Maintenance</CardTitle>
          <CardDescription>Perform maintenance operations on the database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 flex-col gap-2">
              <RefreshCw className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Optimize Database</div>
                <div className="text-xs text-muted-foreground">Improve performance</div>
              </div>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2">
              <Trash2 className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Clean Old Logs</div>
                <div className="text-xs text-muted-foreground">Remove logs older than 90 days</div>
              </div>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 text-red-600 hover:text-red-700">
              <AlertCircle className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium">Reset Database</div>
                <div className="text-xs text-muted-foreground">Danger: Cannot be undone</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
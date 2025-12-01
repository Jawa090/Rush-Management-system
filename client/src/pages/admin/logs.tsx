import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Search, Download, Filter, User, FileText, Settings, Shield, AlertCircle, CheckCircle, Info } from "lucide-react";

export default function AdminLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");

  const mockLogs = [
    {
      id: 1,
      timestamp: "2025-01-15 14:32:15",
      user: "Admin",
      action: "Created new employee",
      type: "user",
      level: "info",
      details: "Added John Doe to IT department",
      ip: "192.168.1.100"
    },
    {
      id: 2,
      timestamp: "2025-01-15 14:28:42",
      user: "Sarah Smith",
      action: "Uploaded document",
      type: "document",
      level: "info",
      details: "Uploaded Employee Handbook 2025.pdf",
      ip: "192.168.1.105"
    },
    {
      id: 3,
      timestamp: "2025-01-15 14:15:33",
      user: "Admin",
      action: "Modified system settings",
      type: "settings",
      level: "warning",
      details: "Changed session timeout to 30 minutes",
      ip: "192.168.1.100"
    },
    {
      id: 4,
      timestamp: "2025-01-15 13:45:21",
      user: "Mike Johnson",
      action: "Failed login attempt",
      type: "security",
      level: "error",
      details: "Invalid password - 3rd attempt",
      ip: "192.168.1.120"
    },
    {
      id: 5,
      timestamp: "2025-01-15 13:30:18",
      user: "Admin",
      action: "Approved leave request",
      type: "leave",
      level: "success",
      details: "Approved 5-day leave for Emily Brown",
      ip: "192.168.1.100"
    },
    {
      id: 6,
      timestamp: "2025-01-15 12:55:09",
      user: "System",
      action: "Automated backup completed",
      type: "system",
      level: "success",
      details: "Database backup successful - 2.5GB",
      ip: "localhost"
    },
    {
      id: 7,
      timestamp: "2025-01-15 12:20:45",
      user: "David Wilson",
      action: "Updated profile",
      type: "user",
      level: "info",
      details: "Changed phone number and address",
      ip: "192.168.1.115"
    },
    {
      id: 8,
      timestamp: "2025-01-15 11:40:33",
      user: "Admin",
      action: "Deleted policy",
      type: "policy",
      level: "warning",
      details: "Removed outdated dress code policy",
      ip: "192.168.1.100"
    }
  ];

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || log.type === filterType;
    const matchesLevel = filterLevel === "all" || log.level === filterLevel;
    return matchesSearch && matchesType && matchesLevel;
  });

  const getTypeIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      user: <User className="h-4 w-4" />,
      document: <FileText className="h-4 w-4" />,
      settings: <Settings className="h-4 w-4" />,
      security: <Shield className="h-4 w-4" />,
      system: <Activity className="h-4 w-4" />,
      leave: <FileText className="h-4 w-4" />,
      policy: <Shield className="h-4 w-4" />
    };
    return icons[type] || <Info className="h-4 w-4" />;
  };

  const getLevelBadge = (level: string) => {
    const config: Record<string, { variant: "default" | "destructive" | "secondary" | "outline"; icon: JSX.Element }> = {
      success: { variant: "default", icon: <CheckCircle className="h-3 w-3" /> },
      info: { variant: "secondary", icon: <Info className="h-3 w-3" /> },
      warning: { variant: "outline", icon: <AlertCircle className="h-3 w-3" /> },
      error: { variant: "destructive", icon: <AlertCircle className="h-3 w-3" /> }
    };
    const { variant, icon } = config[level] || config.info;
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        {icon}
        {level}
      </Badge>
    );
  };

  const stats = {
    total: mockLogs.length,
    info: mockLogs.filter(l => l.level === 'info').length,
    success: mockLogs.filter(l => l.level === 'success').length,
    warning: mockLogs.filter(l => l.level === 'warning').length,
    error: mockLogs.filter(l => l.level === 'error').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activity Logs</h1>
          <p className="text-muted-foreground">Monitor system activities and user actions</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success</p>
                <p className="text-2xl font-bold text-green-600">{stats.success}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Info</p>
                <p className="text-2xl font-bold text-blue-600">{stats.info}</p>
              </div>
              <Info className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warning</p>
                <p className="text-2xl font-bold text-orange-600">{stats.warning}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Error</p>
                <p className="text-2xl font-bold text-red-600">{stats.error}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Activity Logs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2 min-w-[140px]">
                  <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 min-w-[100px]">
                  {getTypeIcon(log.type)}
                  <Badge variant="outline" className="text-xs">{log.type}</Badge>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{log.action}</span>
                    {getLevelBadge(log.level)}
                  </div>
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span>User: {log.user}</span>
                    <span>•</span>
                    <span>IP: {log.ip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
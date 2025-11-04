import React from 'react';
import { useNotifications } from '@/hooks/use-notifications';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, AlertTriangle, Info, Bell, Zap } from 'lucide-react';

export function NotificationDemo() {
  const { 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo, 
    showPushNotification,
    requestPermission 
  } = useNotifications();

  const testSuccess = () => {
    showSuccess('Success!', 'Task completed successfully');
  };

  const testError = () => {
    showError('Error', 'Something went wrong');
  };

  const testWarning = () => {
    showWarning('Warning', 'Please check your settings');
  };

  const testInfo = () => {
    showInfo('Info', 'Here is some helpful information');
  };

  const testPushNotification = async () => {
    const granted = await requestPermission();
    if (granted) {
      showPushNotification('Browser Notification', 'This appears even when the app is closed!');
      showSuccess('Push Sent', 'Check your browser notifications');
    } else {
      showError('Permission Denied', 'Please enable notifications in browser settings');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-500" />
          Notification System
        </CardTitle>
        <CardDescription>
          Professional notification system with multiple alert types
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Quick Test Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={testSuccess}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Success
          </Button>
          
          <Button 
            onClick={testError}
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Error
          </Button>
          
          <Button 
            onClick={testWarning}
            size="sm"
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Warning
          </Button>
          
          <Button 
            onClick={testInfo}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Info className="h-4 w-4 mr-2" />
            Info
          </Button>
        </div>
        
        {/* Push Notification Test */}
        <Button 
          onClick={testPushNotification}
          variant="outline"
          className="w-full"
        >
          <Zap className="h-4 w-4 mr-2" />
          Test Browser Notification
        </Button>
        
        {/* Features Overview */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-sm">System Features:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0">Toast</Badge>
              <span className="text-muted-foreground">In-app alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0">Push</Badge>
              <span className="text-muted-foreground">Browser alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0">History</Badge>
              <span className="text-muted-foreground">Notification log</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0">Smart</Badge>
              <span className="text-muted-foreground">Auto-dismiss</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
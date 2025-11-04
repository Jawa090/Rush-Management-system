import { useEffect, useRef } from 'react';
import { useNotifications } from './use-notifications';

interface RealTimeNotificationConfig {
  enabled: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export function useRealTimeNotifications(config: RealTimeNotificationConfig = { enabled: true }) {
  const { showInfo, showSuccess, showError, showWarning } = useNotifications();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = config.maxReconnectAttempts || 5;
  const reconnectInterval = config.reconnectInterval || 3000;

  const connect = () => {
    if (!config.enabled) return;

    try {
      // Replace with your actual WebSocket URL
      const wsUrl = process.env.NODE_ENV === 'development' 
        ? 'ws://localhost:5000/ws' 
        : `wss://${window.location.host}/ws`;
      
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected for real-time notifications');
        reconnectAttemptsRef.current = 0;
        showSuccess('Connected', 'Real-time notifications are now active');
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleNotificationMessage(data);
        } catch (error) {
          console.error('Failed to parse notification message:', error);
        }
      };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          setTimeout(() => {
            reconnectAttemptsRef.current++;
            connect();
          }, reconnectInterval);
        } else {
          showError('Connection Lost', 'Unable to connect to real-time notifications');
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
    }
  };

  const handleNotificationMessage = (data: any) => {
    const { type, title, message, persistent } = data;

    switch (type) {
      case 'success':
        showSuccess(title, message, persistent);
        break;
      case 'error':
        showError(title, message, persistent);
        break;
      case 'warning':
        showWarning(title, message, persistent);
        break;
      case 'info':
      default:
        showInfo(title, message, persistent);
        break;
    }
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const sendMessage = (message: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [config.enabled]);

  return {
    isConnected: wsRef.current?.readyState === WebSocket.OPEN,
    connect,
    disconnect,
    sendMessage,
  };
}

// Hook for Server-Sent Events (alternative to WebSocket)
export function useServerSentEvents(url?: string) {
  const { showInfo, showSuccess, showError, showWarning } = useNotifications();
  const eventSourceRef = useRef<EventSource | null>(null);

  const connect = () => {
    if (!url) return;

    try {
      eventSourceRef.current = new EventSource(url);

      eventSourceRef.current.onopen = () => {
        console.log('SSE connected');
        showSuccess('Connected', 'Real-time updates are now active');
      };

      eventSourceRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleSSEMessage(data);
        } catch (error) {
          console.error('Failed to parse SSE message:', error);
        }
      };

      eventSourceRef.current.onerror = (error) => {
        console.error('SSE error:', error);
        showError('Connection Error', 'Lost connection to real-time updates');
      };

    } catch (error) {
      console.error('Failed to establish SSE connection:', error);
    }
  };

  const handleSSEMessage = (data: any) => {
    const { type, title, message, persistent } = data;

    switch (type) {
      case 'success':
        showSuccess(title, message, persistent);
        break;
      case 'error':
        showError(title, message, persistent);
        break;
      case 'warning':
        showWarning(title, message, persistent);
        break;
      case 'info':
      default:
        showInfo(title, message, persistent);
        break;
    }
  };

  const disconnect = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  };

  useEffect(() => {
    if (url) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [url]);

  return {
    isConnected: eventSourceRef.current?.readyState === EventSource.OPEN,
    connect,
    disconnect,
  };
}
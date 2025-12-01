import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  department?: string;
  position?: string;
  avatar?: string;
  role: 'admin' | 'employee';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<boolean>;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  department?: string;
  position?: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("rushcorp_user");
      const token = localStorage.getItem("rushcorp_token");
      
      if (savedUser && token) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        } catch (error) {
          console.error("Error parsing saved user data:", error);
          localStorage.removeItem("rushcorp_user");
          localStorage.removeItem("rushcorp_token");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Hardcoded admin credentials
      const ADMIN_EMAIL = "admin@rushcorp.com";
      const ADMIN_PASSWORD = "Admin@123";
      
      let mockUser: User;
      
      // Check if admin login
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        mockUser = {
          id: "admin_001",
          email: ADMIN_EMAIL,
          firstName: "Admin",
          lastName: "User",
          department: "Administration",
          position: "System Administrator",
          role: "admin"
        };
      } else if (email && password) {
        // Regular employee login
        mockUser = {
          id: "emp_" + Date.now(),
          email: email,
          firstName: "John",
          lastName: "Doe",
          department: "Information Technology",
          position: "Software Engineer",
          role: "employee"
        };
      } else {
        setIsLoading(false);
        return false;
      }
      
      // Mark attendance for all logins (admin and employee)
      const today = new Date().toISOString().split('T')[0];
      const attendanceKey = `attendance_${mockUser.id}_${today}`;
      const existingAttendance = localStorage.getItem(attendanceKey);
      
      if (!existingAttendance) {
        const attendanceRecord = {
          userId: mockUser.id,
          userName: `${mockUser.firstName} ${mockUser.lastName}`,
          date: today,
          checkIn: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          status: 'present',
          timestamp: Date.now()
        };
        localStorage.setItem(attendanceKey, JSON.stringify(attendanceRecord));
        localStorage.setItem('last_attendance', JSON.stringify(attendanceRecord));
      } else {
        // Update last_attendance even if already checked in today
        const existingRecord = JSON.parse(existingAttendance);
        localStorage.setItem('last_attendance', JSON.stringify(existingRecord));
      }
      
      const mockToken = "mock_jwt_token_" + Date.now();
      
      // Save to localStorage
      localStorage.setItem("rushcorp_user", JSON.stringify(mockUser));
      localStorage.setItem("rushcorp_token", mockToken);
      
      setUser(mockUser);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful signup
      if (userData.email && userData.password && userData.firstName && userData.lastName) {
        const mockUser: User = {
          id: "emp_" + Date.now(),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          department: userData.department,
          position: userData.position,
          role: "employee"
        };
        
        const mockToken = "mock_jwt_token_" + Date.now();
        
        // Save to localStorage
        localStorage.setItem("rushcorp_user", JSON.stringify(mockUser));
        localStorage.setItem("rushcorp_token", mockToken);
        
        setUser(mockUser);
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("rushcorp_user");
    localStorage.removeItem("rushcorp_token");
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Protected Route Component
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login will be handled by the router
    return null;
  }

  return <>{children}</>;
}
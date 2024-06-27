"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";

type User = {
  userId: number;
  role?: string;
};

type AuthContextProps = {
  user: User | null;
  login: (userData: any) => void;
  logout: () => void;
  isAdmin: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) setUser(JSON.parse(userCookie));
    setIsLoading(false);
  }, []);

  const login = useCallback((userData: any) => {
    Cookies.set("user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("user");
    setUser(null);
  }, []);

  const contextValue = useMemo(() => {
    return { user, login, logout, isAdmin: user?.role === "admin", isLoading };
  }, [user, login, logout, isLoading]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

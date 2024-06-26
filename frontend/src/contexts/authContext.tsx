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

type AuthContextProps = {
  user: any;
  login: (userData: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) setUser(JSON.parse(userCookie));
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
    return { user, login, logout };
  }, [user, login, logout]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

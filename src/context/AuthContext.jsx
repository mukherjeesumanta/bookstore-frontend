import { createContext, useContext, useState, useCallback } from "react";
import { api } from "../api";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback(async (credentials) => {
    try {
      const result = await api.login(credentials);
      localStorage.setItem("bookstore_token", result.token);
      setUser(result.user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("bookstore_token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

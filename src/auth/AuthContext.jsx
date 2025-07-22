import { createContext, useContext, useState } from "react";

import { API } from "../api/ApiContext"; // ✅ FIX: Removed trailing slash

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();

  const register = async (credentials) => {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    // ✅ FIX: Read the response as plain text
    const result = await response.text();

    if (!response.ok) {
      throw new Error(result);
    }

    // ✅ FIX: The result itself is the token
    setToken(result);
  };

  const login = async (credentials) => {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    // ✅ FIX: Read the response as plain text
    const result = await response.text();

    if (!response.ok) {
      throw new Error(result);
    }

    // ✅ FIX: The result itself is the token
    setToken(result);
  };

  const logout = () => setToken(null);

  const value = { token, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within AuthProvider");
  return context;
}

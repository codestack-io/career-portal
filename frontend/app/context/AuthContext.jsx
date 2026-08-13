"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser, getCurrentUser, refreshAccessToken } from "@/lib/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (username, password) => {
    const data = await loginUser(username, password);
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    setAccessToken(data.access);

    const userData = await getCurrentUser(data.access);
    setUser(userData);

    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setAccessToken(null);
    router.push("/login");
  };

  // Load token on initial load with auto-refresh capability
  useEffect(() => {
    async function loadUser() {
      const storedAccess = localStorage.getItem("accessToken");
      const storedRefresh = localStorage.getItem("refreshToken");

      if (!storedAccess) {
        setLoading(false);
        return;
      }

      try {
        // 1. Attempt to fetch current user with existing access token
        const userData = await getCurrentUser(storedAccess);
        setUser(userData);
        setAccessToken(storedAccess);
      } catch (error) {
        console.warn("Access token invalid or expired. Attempting refresh...");

        // 2. Access token failed; try to refresh it
        if (storedRefresh) {
          try {
            const refreshData = await refreshAccessToken(storedRefresh);

            // Save new access token
            const newAccessToken = refreshData.access;
            localStorage.setItem("accessToken", newAccessToken);
            setAccessToken(newAccessToken);

            // Fetch user again with the fresh token
            const userData = await getCurrentUser(newAccessToken);
            setUser(userData);
            setLoading(false);
            return;
          } catch (refreshError) {
            console.error("Refresh token expired or invalid:", refreshError);
          }
        }

        // 3. If refresh failed, clear invalid session and reset state
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/login";   // redirect after logout
  };

  const setUserFromToken = (token) => {

    try {

      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // token expired
      if (decoded.exp < currentTime) {
        logout();
        return;
      }

      setUser({
        userId: decoded.userId || null,
        email: decoded.sub || null,
        role: decoded.role || "USER",
      });

      // auto logout when token expires
      const timeUntilExpiry = (decoded.exp * 1000) - Date.now();

      if (timeUntilExpiry > 0) {
        setTimeout(logout, timeUntilExpiry);
      }

    } catch (err) {
      console.error("Invalid token", err);
      logout();
    }
  };

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setUserFromToken(token);
  };

  useEffect(() => {

    const token = localStorage.getItem("accessToken");

    if (token) {
      setUserFromToken(token);
    }

    setLoading(false);

  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Decode & validate token
  const setUserFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);

      // 🚨 Check expiration
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        logout();
        return;
      }

      setUser({
        userId: decoded.userId,
        email: decoded.sub,
        role: decoded.role,
      });

    } catch {
      logout();
    }
  };

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setUserFromToken(token);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  // 🔄 On app start
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
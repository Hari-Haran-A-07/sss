
import {
  useState,
  useEffect,
  useCallback,
} from "react";
import { AuthContext } from "./AuthContextValue";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        if (
          parsedUser &&
          typeof parsedUser === "object" &&
          typeof parsedUser.token === "string" &&
          parsedUser.token.length > 0
        ) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user");
        }
      }
    } catch (error) {
      console.error("Unable to load saved authentication data.", error);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((data) => {
    if (!data || typeof data.token !== "string" || !data.token) {
      throw new Error("The server did not return a valid authentication token.");
    }

    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);

    window.location.assign("/login");
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

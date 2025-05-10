import { createContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import services from "../utils/services"; // already in your code

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const login = await services.getData("login");
      const storedEmail = await services.getData("user_email");

      if (login === "true" && storedEmail) {
        setIsAuthenticated(true);
        setEmail(storedEmail);
        router.replace("/home");
      } else {
        setIsAuthenticated(false);
        router.replace("/");
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, setIsAuthenticated, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

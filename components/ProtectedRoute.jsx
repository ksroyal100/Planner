import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Redirect } from "expo-router";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === null) return null; 

  if (!isAuthenticated) return <Redirect href="/signin" />;

  return children;
}


import { createContext, useState, useEffect, useContext } from "react";
import { isAuthenticated, getUsername, logoutUser } from "../services/authService";


const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (isAuthenticated()) {
      setUser({
        username: getUsername(),
        isAuthenticated: true,
      });
    }
    setLoading(false);
  }, []);

  
  const login = (userData) => {
    setUser({
      username: userData.username,
      isAuthenticated: true,
    });
  };

  
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: user?.isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

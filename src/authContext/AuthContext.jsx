import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuth: false,
    token: "",
  });

  const login = (token) => {
    setUser({ isAuth: true, token });
  };

  const logout = () => {
    setUser({ isAuth: false, token: "" });
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

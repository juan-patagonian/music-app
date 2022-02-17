import React, { useState } from "react";
import { HomeScreen } from "../Home/HomeScreen";
import { LoginScreen } from "../Login/LoginScreen";
import { UserContext } from "./contexts/UserContext";

export const AuthScreen = () => {
  const [user, setUser] = useState("");

  const logout = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  const login = (loggedInUser: string) => {
    setUser(loggedInUser);
  };

  const getUser = () => user;

  return (
    <UserContext.Provider value={{ getUser, login, logout }}>
      {user ? <HomeScreen /> : <LoginScreen />}
    </UserContext.Provider>
  );
};

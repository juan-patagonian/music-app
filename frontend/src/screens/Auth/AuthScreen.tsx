import React, { useState } from "react";
import { HomeScreen } from "../Home/HomeScreen";
import { LoginScreen } from "../Login/LoginScreen";

export const AuthScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? <HomeScreen /> : <LoginScreen />;
};

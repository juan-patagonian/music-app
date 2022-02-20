export const a = () => <p>a</p>;
/*import React, { useEffect, useState } from "react";
import { getSpotifyAccessToken } from "../../services/spotify.service";
import { HomeScreen } from "../Home/HomeScreen";
import { LoginScreen } from "../Login/LoginScreen";
import { UserContext } from "./contexts/UserContext";

export const AuthScreen = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  const logout = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  const login = async (loggedInUser: string) => {
    setUser(loggedInUser);
    try {
      await getSpotifyAccessToken();
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = () => user;

  return (
    <UserContext.Provider value={{ getUser, login, logout }}>
      {user ? <HomeScreen /> : <LoginScreen />}
    </UserContext.Provider>
  );
};
*/

import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { getSpotifyAccessToken } from "../../../services/spotify.service";
import { login as loginS } from "../../../services/auth.service";

type UserContextValue = {
  user: string;
  isLoggedIn: () => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const UserContext = createContext<UserContextValue | null>(null);

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const isLoggedIn = () => {
    if (!loggedIn) {
      return !!localStorage.getItem("user");
    }
    return loggedIn;
  };

  const logout = () => {
    setUser("");
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  const login = async (email: string, password: string) => {
    setLoggedIn(true);
    try {
      await loginS(email, password);
      const token = localStorage.getItem("user");
      if (token) {
        setUser(token);
      }
      await getSpotifyAccessToken();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    user,
    isLoggedIn,
    login,
    logout,
  };
};

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

export default function AuthConsumer() {
  return useContext(UserContext);
}

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = AuthConsumer();

  return auth?.isLoggedIn() ? children : <Navigate to="/login" replace />;
};

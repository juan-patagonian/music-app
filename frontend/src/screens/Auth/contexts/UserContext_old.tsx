import React from "react";

type UserContextValue = {
  getUser: () => string;
  login: (user: string) => void;
  logout: () => void;
} | null;

const UserContext = React.createContext<UserContextValue>(null);

export { UserContext };

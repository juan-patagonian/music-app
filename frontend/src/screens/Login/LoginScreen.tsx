import { useState } from "react";
import { LoginForm } from "./components/LoginForm";

export const LoginScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <LoginForm onSubmit={() => {}} />
    </div>
  );
};

import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthScreen } from "./screens/Auth/AuthScreen";
import { LoginScreen } from "./screens/Login/LoginScreen";
import { NotFoundScreen } from "./screens/NotFound/NotFoundScreen";
import { RegisterScreen } from "./screens/Register/RegisterScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthScreen />} />
      <Route path="/signup" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default App;

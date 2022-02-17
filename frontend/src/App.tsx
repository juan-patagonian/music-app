import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthScreen } from "./screens/Auth/AuthScreen";
import { LoginScreen } from "./screens/Login/LoginScreen";
import { RegisterScreen } from "./screens/Register/RegisterScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthScreen />} />
      <Route path="/signup" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;

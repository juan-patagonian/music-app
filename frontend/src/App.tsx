import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserAppScaffold } from "./components/UserAppScaffold";
import { AuthProvider, RequireAuth } from "./screens/Auth/contexts/UserContext";
import { FavoriteSongsScreen } from "./screens/FavoriteSongs/FavoriteSongsScreen";
import { HomeScreen } from "./screens/Home/HomeScreen";
import { LoginScreen } from "./screens/Login/LoginScreen";
import { NotFoundScreen } from "./screens/NotFound/NotFoundScreen";
import { RegisterScreen } from "./screens/Register/RegisterScreen";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <UserAppScaffold>
                <HomeScreen />
              </UserAppScaffold>
            </RequireAuth>
          }
        />
        <Route
          path="/favorites"
          element={
            <RequireAuth>
              <UserAppScaffold>
                <FavoriteSongsScreen />
              </UserAppScaffold>
            </RequireAuth>
          }
        />
        <Route path="/signup" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import useAuth from "../screens/Auth/contexts/UserContext";

export const Navbar = () => {
  const auth = useAuth();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Spotify Music - Assessment
        </Typography>
        <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          <Link to="/">Search</Link>
        </Button>
        <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
          <Link to="/favorites">Favorites</Link>
        </Button>
        <Button
          onClick={() => auth?.logout()}
          variant="outlined"
          sx={{ my: 1, mx: 1.5 }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

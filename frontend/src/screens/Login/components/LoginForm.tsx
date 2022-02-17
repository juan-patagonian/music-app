import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

type LoginFormProps = {
  onSubmit: () => void;
};

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  return (
    <Paper
      style={{
        padding: "3em 2em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Welcome!</Typography>
      <Box>
        <TextField label="Email" placeholder="Email" />
      </Box>
      <Box>
        <TextField label="Password" type="password" placeholder="Password" />
      </Box>
      <Box>
        <Button variant="contained">Log In</Button>
      </Box>
    </Paper>
  );
};

import { Box, Container, Grid, Typography } from "@mui/material";
import { FavoritesList } from "./FavoritesList";

export const FavoriteSongsScreen = () => {
  return (
    <Box>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Your favorite songs
        </Typography>
      </Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6}>
          <FavoritesList />
        </Grid>
      </Grid>
    </Box>
  );
};

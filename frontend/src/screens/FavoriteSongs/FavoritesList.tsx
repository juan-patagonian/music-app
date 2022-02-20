import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getFavoriteSongs } from "../../services/song.service";
import { Track } from "../../services/spotify.service";

export const FavoritesList = () => {
  const [favoriteSongs, setFavoriteSongs] = useState<Track[]>([]);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      const songs = await getFavoriteSongs();
      console.log(songs);
      setFavoriteSongs(songs);
    };
    fetchFavoriteSongs();
  }, []);

  return (
    <Grid container direction="column" spacing={2}>
      {favoriteSongs.map((song, index) => (
        <Grid item key={index}>
          <Box>
            <Typography>{song.name}</Typography>
          </Box>
          <Box>
            <Typography>{song.artists[0].name}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

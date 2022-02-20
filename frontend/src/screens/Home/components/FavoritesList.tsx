import { Box, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getFavoriteSongs } from "../../../services/song.service";
import { Track } from "../../../services/spotify.service";

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
    <Box>
      <Typography>Favorite Songs</Typography>
      <List>
        {favoriteSongs.map((song, index) => (
          <ListItem key={index}>{song.name}</ListItem>
        ))}
      </List>
    </Box>
  );
};

import { Box, Grid, Rating } from "@mui/material";
import { addToFavorites } from "../../../services/song.service";
import { Track } from "../../../services/spotify.service";

type Props = {
  song: Track;
};

export const SongListItem = ({ song }: Props) => {
  const setAsFavorite = async (songId: string) => {
    try {
      await addToFavorites(songId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid container paddingY={1}>
      <Grid item container direction="column" xs={10}>
        <Grid item>{song.name}</Grid>
        <Grid item>{song.artists[0].name}</Grid>
      </Grid>
      <Grid item xs={2}>
        <Box>
          <Rating max={1} onClick={() => setAsFavorite(song.id)} />
        </Box>
      </Grid>
    </Grid>
  );
};

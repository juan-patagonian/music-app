import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import {
  getSongsByName,
  SpotifySongResponse,
} from "../../../services/spotify.service";
import { useState } from "react";
import { SongList } from "./SongList";

export const SongSearch = () => {
  const [searchResults, setSearchResults] =
    useState<SpotifySongResponse | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const songName = data.get("song-name") as string;
    if (songName) {
      const soughtSongs = await getSongsByName(songName);
      setSearchResults(soughtSongs);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ "& > :not(style)": { m: 1 } }}
      >
        <TextField
          id="song-name"
          name="song-name"
          placeholder="Search a song"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <Button type="submit" variant="outlined">
          Find!
        </Button>
      </Box>
      {searchResults && (
        <Box>
          <SongList searchResults={searchResults} />
        </Box>
      )}
    </>
  );
};

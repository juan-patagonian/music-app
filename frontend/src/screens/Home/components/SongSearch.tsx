import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Chip, Grid } from "@mui/material";
import {
  getSongsByName,
  SpotifySongResponse,
} from "../../../services/spotify.service";
import { useEffect, useState } from "react";
import { SongList } from "./SongList";
import { addTerms, getRecentTerms } from "../../../services/term.service";

export const SongSearch = () => {
  const [searchResults, setSearchResults] =
    useState<SpotifySongResponse | null>(null);
  const [terms, setTerms] = useState<string[]>([]);
  const [searchInputText, setSearchInputText] = useState("");
  const [shouldFetchTerms, setShouldFetchTerms] = useState(true);

  useEffect(() => {
    if (shouldFetchTerms) {
      const fetchTerms = async () => {
        const userRecentTerms = await getRecentTerms();
        setTerms(userRecentTerms);
        setShouldFetchTerms(false);
      };

      fetchTerms();
    }
  }, [shouldFetchTerms]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const songName = data.get("song-name") as string;
    setSearchResults(null);
    if (songName) {
      const soughtSongs = await getSongsByName(songName);
      await addTerms(songName);
      setSearchResults(soughtSongs);
      setShouldFetchTerms(true);
    }
  };

  const addTermToSearch = (selectedTerm: string) => {
    setSearchInputText(
      searchInputText + (searchInputText ? " " : "") + selectedTerm
    );
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ "& > :not(style)": { m: 1 } }}
      >
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <TextField
              id="song-name"
              name="song-name"
              placeholder="Search a song"
              fullWidth
              value={searchInputText}
              onChange={(e) => setSearchInputText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <Button style={{ height: "100%" }} type="submit" variant="outlined">
              Find!
            </Button>
          </Grid>
        </Grid>
      </Box>
      {terms.length && (
        <Grid container spacing={1}>
          {terms.map((term, index) => (
            <Grid item key={index}>
              <Chip label={term} onClick={() => addTermToSearch(term)} />
            </Grid>
          ))}
        </Grid>
      )}
      {searchResults && (
        <Box>
          <SongList searchResults={searchResults} />
        </Box>
      )}
    </>
  );
};

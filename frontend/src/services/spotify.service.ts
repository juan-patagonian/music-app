import axios from "axios";
import { config } from "../constants/config";

const API_URL = config.API_URL;

type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expiration_date: string;
};

export type SpotifySongResponse = {
  tracks: {
    items: Track[];
    next: string | null;
  };
};

export type Track = {
  id: string;
  name: string;
  artists: {
    name: string;
  }[];
};

const getNextSongs = async (previousSongResponse: SpotifySongResponse) => {
  const token = await getLocalToken();

  if (previousSongResponse.tracks.next) {
    const response = await axios.get<SpotifySongResponse>(
      previousSongResponse.tracks.next,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }

  return null;
};

const getSpotifyAccessToken = async () => {
  const userToken = localStorage.getItem("user");

  if (userToken) {
    const response = await axios.get<SpotifyTokenResponse>(
      API_URL + "/spotify/getToken",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    localStorage.setItem("spotify_token", JSON.stringify(response.data));

    return response.data.access_token;
  }

  return null;
};

const getLocalToken = async () => {
  let token = localStorage.getItem("spotify_token");

  if (token) {
    const tokenData = JSON.parse(token) as SpotifyTokenResponse;

    if (new Date(tokenData.expiration_date) < new Date()) {
      token = await getSpotifyAccessToken();
    } else {
      token = tokenData.access_token;
    }
  } else {
    token = await getSpotifyAccessToken();
  }

  return token;
};

const getSongsByName = async (name: string) => {
  const token = await getLocalToken();

  const response = await axios.get<SpotifySongResponse>(
    "https://api.spotify.com/v1/search?type=track&limit=15",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: name,
      },
    }
  );

  return response.data;
};

const getSongsByIds = async (songIds: string[]) => {
  const token = await getLocalToken();

  return axios.get<{ tracks: Track[] }>("https://api.spotify.com/v1/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ids: songIds.toString(),
    },
  });
};

export { getSpotifyAccessToken, getSongsByName, getNextSongs, getSongsByIds };

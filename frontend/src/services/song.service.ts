import axios from "axios";
import { config } from "../constants/config";
import { getSongsByIds } from "./spotify.service";

const API_URL = config.API_URL;

const addToFavorites = async (id: string) => {
  const userToken = localStorage.getItem("user");
  return axios.patch(
    API_URL + "/user/addFavoriteSong",
    {
      spotifyId: id,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
};

const getFavoriteSongs = async () => {
  const userToken = localStorage.getItem("user");

  const { data } = await axios.get<string[]>(
    API_URL + "/user/getFavoriteSongs",
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  if (data.length) {
    const spotifySongsResponse = await getSongsByIds(data);

    return spotifySongsResponse.data.tracks;
  }

  return [];
};

export { addToFavorites, getFavoriteSongs };

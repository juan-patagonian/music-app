import axios from "axios";
import { config } from "../constants/config";

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

export { addToFavorites };

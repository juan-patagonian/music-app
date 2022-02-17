import axios from "axios";
import { config } from "../constants/config";

const API_URL = config.API_URL;

const getSpotifyAccessToken = async () => {
  return axios.get(API_URL + "/spotify/getToken");
};

/*
const getSongsByName = async (name: string) => {
  const response = await axios.post(
    API_URL + "/auth/login",
    {
      email,
      password,
    }
  );

  localStorage.setItem("user", loginResponse.data.token);
};

*/

export { getSpotifyAccessToken };

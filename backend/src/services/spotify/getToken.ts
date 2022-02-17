import { Response } from "express";
import { JWTRequest } from "../../types/JWTRequest";
import axios from "axios";
import Boom from "@hapi/boom";
import { spotifyConfig } from "../../config/spotify";

type Request = JWTRequest<never>;

type SpotifyResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export const getToken = async (req: Request, res: Response) => {
  const userId = req.user._id;

  if (!userId) {
    return Boom.forbidden("No authorized user provided");
  }

  const token = await requestTokenFromSpotify();

  res.send(token);
};

const requestTokenFromSpotify = async () => {
  const client_id = spotifyConfig.CLIENT_ID;
  const client_secret = spotifyConfig.API_KEY;
  const authOptions = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
    },
  };

  try {
    const spotifyApiResponse = await axios.post<SpotifyResponse>(
      spotifyConfig.REQUEST_TOKEN_URL,
      "grant_type=client_credentials",
      authOptions
    );

    return spotifyApiResponse.data.access_token;
  } catch (err) {
    console.log(err);
    return null;
  }
};

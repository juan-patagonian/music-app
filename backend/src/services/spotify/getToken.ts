import { Response } from "express";
import { JWTRequest } from "../../types/JWTRequest";
import axios from "axios";
import { spotifyConfig } from "../../config/spotify";

type Request = JWTRequest<never>;

type SpotifyResponse = {
  access_token: string;
  token_type: string;
  expires_in: string;
};

type TokenResponse = {
  access_token: string;
  expiration_date: Date;
};

export const getToken = async (req: Request, res: Response) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(403).send("No authorized user provided");
  }

  try {
    const tokenData = await requestTokenFromSpotify();
    const tokenExpireDate = new Date();
    tokenExpireDate.setSeconds(
      tokenExpireDate.getSeconds() + Number(tokenData.expires_in)
    );

    const responseTokenData = {
      access_token: tokenData.access_token,
      expiration_date: tokenExpireDate,
    } as TokenResponse;

    return res.json(responseTokenData);
  } catch (err) {
    return res.status(500).send("An unexpected error ocurred");
  }
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

    return spotifyApiResponse.data;
  } catch (err) {
    throw new Error(err);
  }
};

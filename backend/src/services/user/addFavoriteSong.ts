import { Response } from "express";
import { JWTRequest } from "../../types/JWTRequest";
import {
  AddFavoriteSongRequest,
  validate as validateRequestParams,
} from "../../dtos/song/AddFavoriteSongRequest.dto";
import { User } from "../../models/user";
import Boom from "@hapi/boom";

type Request = JWTRequest<AddFavoriteSongRequest>;

export const addFavoriteSong = async (req: Request, res: Response) => {
  const userId = req.user._id;

  if (!userId) {
    return Boom.forbidden("No authorized user provided");
  }

  const { error } = validateRequestParams(req.body);

  if (error) {
    console.log(error);
    return res.send(Boom.badData(error.details[0].message));
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    return res.send(Boom.badData(`User#${userId} is not a valid user`));
  }

  const songSpotifyId = req.body.spotifyId;

  if (!user.favoriteSongs.includes(songSpotifyId)) {
    user.favoriteSongs.push(songSpotifyId);
    await User.findByIdAndUpdate(userId, {
      favoriteSongs: user.favoriteSongs,
    }).exec();
  }

  return res.status(200).send();
};

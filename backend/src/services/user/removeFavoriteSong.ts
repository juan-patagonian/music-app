import { Response } from "express";
import { JWTRequest } from "../../types/JWTRequest";
import {
  AddFavoriteSongRequest,
  validate as validateRequestParams,
} from "../../dtos/song/AddFavoriteSongRequest.dto";
import { User } from "../../models/user";

type Request = JWTRequest<AddFavoriteSongRequest>;

export const removeFavoriteSong = async (req: Request, res: Response) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(403).send("No authorized user provided");
  }

  const { error } = validateRequestParams(req.body);

  if (error) {
    console.log(error);
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    return res.status(400).send(`User#${userId} is not a valid user`);
  }

  const songSpotifyId = req.body.spotifyId;
  const removeSongIndex = user.favoriteSongs.findIndex(
    (song) => song === songSpotifyId
  );

  if (removeSongIndex !== -1) {
    user.favoriteSongs.splice(removeSongIndex, 1);
    await User.findByIdAndUpdate(userId, {
      favoriteSongs: user.favoriteSongs,
    }).exec();
  }

  res.status(200).send();
};

import { Response } from "express";
import { JWTRequest } from "../../types/JWTRequest";
import { User } from "../../models/user";
import Boom from "@hapi/boom";

type Request = JWTRequest<never>;

export const getFavoriteSongs = async (req: Request, res: Response) => {
  const userId = req.user._id;

  if (!userId) {
    return Boom.forbidden("No authorized user provided");
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    return res.send(Boom.badData(`User#${userId} is not a valid user`));
  }

  res.json(user.favoriteSongs ?? []);
};

import { Response } from "express";
import { JWTRequest } from "../../types/JWTRequest";
import { User } from "../../models/user";

type Request = JWTRequest<never>;

export const getFavoriteSongs = async (req: Request, res: Response) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(403).send("No authorized user provided");
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    return res.status(400).send(`User#${userId} is not a valid user`);
  }

  return res.json(user.favoriteSongs ?? []);
};

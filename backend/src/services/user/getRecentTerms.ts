import { Response } from "express";
import { JWTRequest } from "../../types/JWTRequest";
import { User } from "../../models/user";
import Boom from "@hapi/boom";

type Request = JWTRequest<never>;

const LIMIT_TERM_DAYS = 5;

export const getRecentTerms = async (req: Request, res: Response) => {
  const userId = req.user._id;

  if (!userId) {
    return Boom.forbidden("No authorized user provided");
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    return res.send(Boom.badData(`User#${userId} is not a valid user`));
  }

  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() - LIMIT_TERM_DAYS);

  const recentTerms = user.recentSearchTerms.filter(
    (term) => new Date(term.createdAt) > limitDate
  );

  res.json(recentTerms.map((term) => term.text));
};

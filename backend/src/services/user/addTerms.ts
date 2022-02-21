import { Response } from "express";
import { JWTRequest } from "../../types/JWTRequest";
import { AddFavoriteSongRequest } from "../../dtos/song/AddFavoriteSongRequest.dto";
import { User } from "../../models/user";
import { SearchTerm } from "../../types/user";

type Request = JWTRequest<AddFavoriteSongRequest>;

export const addTerms = async (req: Request, res: Response) => {
  const userId = req.user._id;

  if (!userId) {
    return res.status(403).send("No authorized user provided");
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    return res.status(400).send(`User#${userId} is not a valid user`);
  }

  const terms = req.body.terms;
  const formattedTerms = terms.map((term) => {
    return {
      text: term,
      createdAt: new Date(),
      a: "b",
    };
  }) as SearchTerm[];

  const userRecentSearchTerms = user.recentSearchTerms.concat(formattedTerms);
  await User.findByIdAndUpdate(userId, {
    recentSearchTerms: userRecentSearchTerms,
  }).exec();
  return res.status(200).send();
};

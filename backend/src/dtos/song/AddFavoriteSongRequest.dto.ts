import Joi from "joi";

export type AddFavoriteSongRequest = {
  spotifyId: string;
};

const validationSchema = Joi.object<AddFavoriteSongRequest>({
  spotifyId: Joi.string().required(),
});

export const validate = (addFavoriteSongRequest: AddFavoriteSongRequest) =>
  validationSchema.validate(addFavoriteSongRequest);

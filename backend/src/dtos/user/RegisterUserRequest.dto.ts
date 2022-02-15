import { User } from "../../types/user";
import Joi from "joi";

export type RegisterUserRequest = Omit<User, "_id"> & {
  repeatPassword: string;
};

const validationSchema = Joi.object<RegisterUserRequest>({
  nickname: Joi.string().alphanum().min(5).max(20).required(),
  password: Joi.string().min(8).max(30).required(),
  repeatPassword: Joi.ref("password"),
  email: Joi.string().email().required(),
});

export const validate = (user: RegisterUserRequest) =>
  validationSchema.validate(user);

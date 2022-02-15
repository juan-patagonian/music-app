import { Schema, model } from "mongoose";
import { User as UserT } from "../types/user";
import Joi from "joi";
import bcrypt from "bcrypt";

const UserSchema = new Schema<UserT>({
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const validationSchema = Joi.object({
  nickname: Joi.string().alphanum().min(5).max(20).required(),
  password: Joi.string().min(8).max(30).required(),
  email: Joi.string().email().required(),
});

const validate = (user: UserT) => validationSchema.validate(user);

export const User = model<UserT>("User", UserSchema);

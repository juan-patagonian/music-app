import { Schema, model } from "mongoose";
import { User as UserT } from "../types/user";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const UserSchema = new Schema<UserT>({
  nickname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  salt: { type: String, required: true },
  favoriteSongs: {
    type: [
      {
        type: String,
      },
    ],
    required: true,
  },
});

UserSchema.pre("validate", async function (next) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  this.salt = salt;
  next();
});

UserSchema.pre("validate", async function (next) {
  this.favoriteSongs = [];
  next();
});

UserSchema.methods.isValidPassword = async function (inputPassword: string) {
  return bcrypt.compare(inputPassword, this.password);
};

export const User = model<UserT>("User", UserSchema);

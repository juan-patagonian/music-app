import { Schema, model } from "mongoose";
import { User as UserT } from "../types/user";
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

export const User = model<UserT>("User", UserSchema);

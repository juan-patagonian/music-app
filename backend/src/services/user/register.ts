import { Request, Response } from "express";
import { validate as validateRequestBodyParams } from "../../dtos/user/RegisterUserRequest.dto";
import Boom from "@hapi/boom";
import { User } from "../../models/user";

export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  const { error } = validateRequestBodyParams(req.body);

  if (error) {
    console.log(error);
    return res.send(Boom.badData(error.details[0].message));
  }

  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    return res.send(savedUser);
  } catch (err) {
    return res.send(Boom.internal("[RG25] Unexpected error saving user"));
  }
};

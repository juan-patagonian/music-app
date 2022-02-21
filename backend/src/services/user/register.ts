import { Request, Response } from "express";
import { validate as validateRequestBodyParams } from "../../dtos/user/RegisterUserRequest.dto";
import { User } from "../../models/user";

export const register = async (req: Request, res: Response) => {
  const { error } = validateRequestBodyParams(req.body);

  if (error) {
    console.log(error);
    return res.status(400).send(error.details[0].message);
  }

  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    return res.send(savedUser);
  } catch (err) {
    return res.status(500).send("[RG25] Unexpected error saving user");
  }
};

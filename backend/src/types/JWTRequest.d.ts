import { Request } from "express";
export type JWTRequest<T> = Request<T> & {
  user: {
    _id: string;
  };
};

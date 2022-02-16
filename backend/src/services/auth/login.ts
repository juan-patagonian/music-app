import passport from "./passport";
import jwt from "jsonwebtoken";
import { jwtKey } from "../../config/jwt";

export const login = async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, jwtKey);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

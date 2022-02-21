import passport from "./passport";
import jwt from "jsonwebtoken";
import { jwtKey } from "../../config/jwt";

export const login = async (req, res, next) => {
  passport.authenticate("local", async (err, user, options) => {
    try {
      if (!user) {
        res.status(400).send(options.message);
      }

      if (err) {
        res.status(400).send(err);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, jwtKey);

        return res.json({ token });
      });
    } catch (error) {
      res.status(500).send();
    }
  })(req, res, next);
};

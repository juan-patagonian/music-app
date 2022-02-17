import express from "express";
import passport from "passport";
import userRouter from "./user";
import authRouter from "./auth";
import spotifyRouter from "./spotify";

const router = express.Router();
const authenticateJWT = passport.authenticate("jwt", { session: false });

// No JWT required routes
router.use("/auth", authRouter);

router.use(authenticateJWT);

// From here onwards all routes require JWT authentication
router.use("/user", userRouter);
router.use("/spotify", spotifyRouter);

export default router;

import express from "express";
import { connectToMongoDB } from "./dbconnection";
import mainRouter from "./src/routes/main";
import passport from "./src/services/auth/passport";
import cors from "cors";

const app = express();
const port = 3000;

var corsOptions = {
  origin: "http://localhost:5000",
};
app.use(cors(corsOptions));

const passportMiddleware = passport.initialize();

app.use(passportMiddleware);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api", mainRouter);

app.listen(port, async () => {
  console.log(`App running on port ${port}.`);

  try {
    await connectToMongoDB();
    console.log("Successfully connected to db");
  } catch (err) {
    console.log(err);
  }
});

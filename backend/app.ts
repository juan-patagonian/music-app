import express from "express";
import { connectToMongoDB } from "./dbconnection";
import mainRouter from "./src/routes/main";

const app = express();
const port = 3000;

app.listen(port, async () => {
  console.log(`App running on port ${port}.`);
  app.use("/", mainRouter);

  try {
    await connectToMongoDB();
    console.log("Successfully connected to db");
  } catch (err) {
    console.log(err);
  }
});

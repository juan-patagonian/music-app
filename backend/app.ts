import express from "express";
import mainRouter from "./src/routes/main";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api", mainRouter);

export default app;

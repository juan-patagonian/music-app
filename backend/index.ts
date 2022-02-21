import app from "./app";
import { connectToMongoDB } from "./dbconnection";
const port = 3000;

app.listen(port, async () => {
  console.log(`App running on port ${port}.`);

  try {
    await connectToMongoDB();
    console.log("Successfully connected to db");
  } catch (err) {
    console.log(err);
  }
});

import { connect } from "mongoose";
import { databaseCredentials } from "./src/config/database";

export async function connectToMongoDB(): Promise<void> {
  await connect(databaseCredentials.url);
}

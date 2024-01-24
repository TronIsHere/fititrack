import { MongoClient } from "mongodb";

export async function ConnectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb://localhost:27017/FitItTrackDB"
  );

  return client;
}

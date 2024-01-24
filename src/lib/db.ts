import { MongoClient } from "mongodb";

export async function ConnectToDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);

  return client;
}

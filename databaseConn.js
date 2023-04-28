import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const database = "huntingcoder";

export async function dbConnection(collection) {
  let connection = await client.connect();
  let getDB = connection.db(database);
  return getDB.collection("blogs");
}

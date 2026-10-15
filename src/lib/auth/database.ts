import "server-only";
import { MongoClient } from "mongodb";
import type { AuthConfig } from "./config";

let connection: Promise<MongoClient> | undefined;

export function getAuthDatabase(config: AuthConfig) {
  connection ??= connect(config).catch((error: unknown) => {
    connection = undefined;
    throw error;
  });
  return connection.then((client) => ({ client, db: client.db(config.databaseName) }));
}

async function connect(config: AuthConfig): Promise<MongoClient> {
  const client = new MongoClient(config.mongoUri, {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });
  try {
    await client.connect();
    const db = client.db(config.databaseName);
    await Promise.all([
      db.collection("user").createIndex({ email: 1 }, { unique: true }),
      db.collection("account").createIndex({ providerId: 1, accountId: 1 }, { unique: true }),
      db.collection("account").createIndex({ userId: 1 }),
      db.collection("session").createIndex({ token: 1 }, { unique: true }),
      db.collection("session").createIndex({ userId: 1 }),
      db.collection("session").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      db.collection("verification").createIndex({ identifier: 1 }),
      db.collection("verification").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    ]);
    return client;
  } catch (error) {
    await client.close();
    throw error;
  }
}

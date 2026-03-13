import { MongoMemoryServer } from "mongodb-memory-server";

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: "6.0.4",
    },
  });

  const uri = instance.getUri();
  globalThis.__MONGOINSTANCE = instance;
  process.env.DATABASE_URL = uri;
}

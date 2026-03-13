import mongoose from "mongoose";
import { initBaseDeDatos } from "../bd/init.js";

beforeAll(async () => {
  await initBaseDeDatos();
});

afterAll(async () => {
  await mongoose.disconnect();
});

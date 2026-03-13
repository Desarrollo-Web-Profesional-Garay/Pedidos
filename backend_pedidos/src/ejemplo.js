import dotenv from "dotenv";
dotenv.config();

import { initBaseDeDatos } from "./bd/init.js";

initBaseDeDatos().then(() => {
  console.log("Base de datos inicializada correctamente");
  process.exit(0);
}).catch((error) => {
  console.error("Error al inicializar la base de datos:", error);
  process.exit(1);
});

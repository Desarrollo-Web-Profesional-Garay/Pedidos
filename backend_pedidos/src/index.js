import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { initBaseDeDatos } from "./bd/init.js";

const PORT = process.env.PORT || 3001;

initBaseDeDatos().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});

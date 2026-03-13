import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pedidosRoutes } from "./rutas/pedidos.js";
import { usuarioRoutes } from "./rutas/usuarios.js";

const app = express();

// Middlewares
app.use(cors()); // Permite todos los orígenes por defecto, es lo más seguro para depurar
app.use(bodyParser.json());

// Log de peticiones
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rutas
pedidosRoutes(app);
usuarioRoutes(app);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Hola from Express!");
});

export default app;

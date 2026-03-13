import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pedidosRoutes } from "./rutas/pedidos.js";
import { usuarioRoutes } from "./rutas/usuarios.js";

const app = express();

// Middlewares
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.options("*", cors()); // Enable pre-flight for all routes

app.use(bodyParser.json());

// Rutas
pedidosRoutes(app);
usuarioRoutes(app);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Hola from Express!");
});

export default app;

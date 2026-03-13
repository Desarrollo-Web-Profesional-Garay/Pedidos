import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pedidosRoutes } from "./rutas/pedidos.js";
import { usuarioRoutes } from "./rutas/usuarios.js";

const app = express();

// 1. Logger simple
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

// 2. CORS estándar (Más confiable en Railway)
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Rutas
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

pedidosRoutes(app);
usuarioRoutes(app);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API Pedidos funcionando correctamente en produccion!");
});

export default app;

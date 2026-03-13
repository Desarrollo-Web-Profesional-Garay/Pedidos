import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pedidosRoutes } from "./rutas/pedidos.js";
import { usuarioRoutes } from "./rutas/usuarios.js";

const app = express();

// 1. Logger de red forzado (stdout)
app.use((req, res, next) => {
  process.stdout.write(`\n[NETWORK] ${req.method} ${req.path}\n`);
  next();
});

// 2. CORS Manual Robusto
app.use((req, res, next) => {
  const origin = req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Origin, X-Requested-With");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    process.stdout.write(`[CORS] Preflight handled for ${req.path}\n`);
    return res.status(200).end();
  }
  next();
});

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

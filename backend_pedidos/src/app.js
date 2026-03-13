import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pedidosRoutes } from "./rutas/pedidos.js";
import { usuarioRoutes } from "./rutas/usuarios.js";

const app = express();

// 1. Interceptor de CORS y Logging (TODO EN UNO)
app.use((req, res, next) => {
  console.log(`[NETWORK] ${req.method} ${req.url}`);
  
  // Headers de CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Origin, X-Requested-With");
  
  // Si es OPTIONS, respondemos de inmediato con 200
  if (req.method === "OPTIONS") {
    console.log(`[CORS] Respondido preflight para ${req.url}`);
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

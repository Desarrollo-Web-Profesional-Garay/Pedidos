import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pedidosRoutes } from "./rutas/pedidos.js";
import { usuarioRoutes } from "./rutas/usuarios.js";

const app = express();

// 1. Log de peticiones (Primero que nada)
app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} ${req.url}`);
  next();
});

// 2. CORS Manual (Para asegurar que los headers siempre estén)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, Origin, X-Requested-With");
  
  // Responder inmediatamente a las peticiones de pre-vuelo (OPTIONS)
  if (req.method === "OPTIONS") {
    console.log(`[DEBUG] Respondiendo a OPTIONS ${req.url}`);
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());

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

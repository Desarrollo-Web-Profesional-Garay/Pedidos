import {
  createUsuario,
  loginUsuario,
  getUsuarioInfoById,
} from "../servicios/usuarios.js";

export function usuarioRoutes(app) {
  // POST /api/v1/usuario/signup
  app.post("/api/v1/usuario/signup", async (req, res) => {
    try {
      const usuario = await createUsuario(req.body);
      res.status(201).json({
        id: usuario._id,
        username: usuario.username,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/v1/usuario/login
  app.post("/api/v1/usuario/login", async (req, res) => {
    try {
      const resultado = await loginUsuario(req.body);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });

  // GET /api/v1/usuarios/:id
  app.get("/api/v1/usuarios/:id", async (req, res) => {
    try {
      const usuario = await getUsuarioInfoById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

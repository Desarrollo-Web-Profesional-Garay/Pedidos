import {
  creaPedido,
  listaPedidos,
  listaAllPedidos,
  listaPedidosByNombre,
  listPedidosByPagado,
  getPedidoById,
  modificaPedido,
  eliminaPedido,
} from "../servicios/pedidos.js";

export function pedidosRoutes(app) {
  // GET /api/v1/pedidos
  app.get("/api/v1/pedidos", async (req, res) => {
    try {
      const { nombre, pagado, sortBy, sortOrder } = req.query;

      // No permitir ambos filtros al mismo tiempo
      if (nombre && pagado) {
        return res.status(400).json({
          error: "No se pueden enviar ambos filtros (nombre y pagado) al mismo tiempo",
        });
      }

      let pedidos;

      if (nombre) {
        pedidos = await listaPedidosByNombre(nombre);
      } else if (pagado) {
        pedidos = await listPedidosByPagado(pagado);
      } else {
        pedidos = await listaAllPedidos();
      }

      // Si se proporcionan opciones de ordenamiento
      if (sortBy && !nombre && !pagado) {
        pedidos = await listaPedidos({}, { sortBy, sortOrder });
      }

      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // GET /api/v1/pedidos/:id
  app.get("/api/v1/pedidos/:id", async (req, res) => {
    try {
      const pedido = await getPedidoById(req.params.id);
      if (!pedido) {
        return res.status(404).json({ error: "Pedido no encontrado" });
      }
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/v1/pedidos
  app.post("/api/v1/pedidos", async (req, res) => {
    try {
      const pedido = await creaPedido(req.body);
      res.status(201).json(pedido);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // PATCH /api/v1/pedidos/:id
  app.patch("/api/v1/pedidos/:id", async (req, res) => {
    try {
      const pedido = await modificaPedido(req.params.id, req.body);
      if (!pedido) {
        return res.status(404).json({ error: "Pedido no encontrado" });
      }
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // DELETE /api/v1/pedidos/:id
  app.delete("/api/v1/pedidos/:id", async (req, res) => {
    try {
      const resultado = await eliminaPedido(req.params.id);
      if (resultado.deletedCount === 0) {
        return res.status(404).json({ error: "Pedido no encontrado" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

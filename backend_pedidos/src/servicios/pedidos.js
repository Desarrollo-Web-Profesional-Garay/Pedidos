import Pedido from "../bd/modelos/pedido.js";

export async function creaPedido(pedido) {
  const nuevoPedido = new Pedido(pedido);
  return await nuevoPedido.save();
}

export async function listaPedidos(query = {}, { sortBy = "fecha_solicitud", sortOrder = "desc" } = {}) {
  return await Pedido.find(query).sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });
}

export async function listaAllPedidos() {
  return await listaPedidos();
}

export async function listaPedidosByNombre(nombre) {
  return await listaPedidos({ nombre: new RegExp(nombre, "i") });
}

export async function listPedidosByPagado(pagado) {
  return await listaPedidos({ pagado });
}

export async function getPedidoById(id) {
  return await Pedido.findById(id);
}

export async function modificaPedido(id, datos) {
  return await Pedido.findOneAndUpdate(
    { _id: id },
    { $set: datos },
    { new: true }
  );
}

export async function eliminaPedido(id) {
  return await Pedido.deleteOne({ _id: id });
}

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../bd/modelos/usuario.js";

export async function createUsuario(datos) {
  const { username, password } = datos;
  const hashedPassword = await bcrypt.hash(password, 10);
  const usuario = new Usuario({ username, password: hashedPassword });
  return await usuario.save();
}

export async function loginUsuario(datos) {
  const { username, password } = datos;

  const usuario = await Usuario.findOne({ username });
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const passwordValido = await bcrypt.compare(password, usuario.password);
  if (!passwordValido) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign(
    { id: usuario._id, username: usuario.username },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return { token };
}

export async function getUsuarioInfoById(id) {
  return await Usuario.findById(id).select("-password");
}

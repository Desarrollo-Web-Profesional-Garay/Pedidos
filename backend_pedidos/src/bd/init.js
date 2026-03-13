import mongoose from "mongoose";

mongoose.connection.on("error", (error) => {
  console.error("Error de conexión a MongoDB:", error);
});

mongoose.connection.on("open", () => {
  console.log("Conectado a MongoDB exitosamente");
});

export async function initBaseDeDatos() {
  const { DATABASE_URL } = process.env;
  await mongoose.connect(DATABASE_URL);
  return mongoose.connection;
}


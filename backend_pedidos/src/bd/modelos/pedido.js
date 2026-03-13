import mongoose from "mongoose";

const { Schema } = mongoose;

const pedidoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    direccion: {
      type: String,
      required: true,
    },
    fecha_solicitud: {
      type: Date,
      required: true,
    },
    fecha_envio: {
      type: Date,
      required: true,
    },
    total: {
      type: Number,
      default: 0.0,
    },
    pagado: {
      type: [String],
    },
    comentario: {
      type: String,
    },
    cliente: {
      type: Schema.Types.ObjectId,
      ref: "usuario",
    },
  },
  {
    timestamps: true,
  }
);

const Pedido = mongoose.model("pedido", pedidoSchema);

export default Pedido;

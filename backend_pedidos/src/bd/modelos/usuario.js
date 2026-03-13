import mongoose from "mongoose";

const { Schema } = mongoose;

const usuarioSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;

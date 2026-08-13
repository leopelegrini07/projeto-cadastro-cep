const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: true }, // NOVO
  cep: { type: String, required: true },
  rua: { type: String, required: true },
  numero: { type: String, required: true }, // NOVO
  complemento: { type: String }, // NOVO (Sem "required" pois é opcional)
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
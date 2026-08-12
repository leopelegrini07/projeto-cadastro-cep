const mongoose = require('mongoose');

// 1. Criando o Molde (Schema)
const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  cep: { type: String, required: true },
  rua: { type: String, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true }
});

// 2. Transformando o molde em um "Model" usável e exportando
module.exports = mongoose.model('Usuario', usuarioSchema);
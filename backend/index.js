require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Usuario = require('./models/Usuario'); 

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Banco de dados conectado com sucesso!');
  })
  .catch((erro) => {
    console.error('❌ Erro ao conectar no banco:', erro);
  });

app.post('/usuarios', async (req, res) => {
  try {
    const dadosRecebidos = req.body;
    const novoUsuario = new Usuario(dadosRecebidos);
    await novoUsuario.save();
    res.status(201).json({ 
      mensagem: 'Usuário cadastrado com sucesso!', 
      usuario: novoUsuario 
    });
  } catch (erro) {
    console.error('Erro ao salvar usuário:', erro);
    res.status(400).json({ 
      mensagem: 'Erro ao cadastrar usuário. Verifique os dados.', 
      erro: erro.message 
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
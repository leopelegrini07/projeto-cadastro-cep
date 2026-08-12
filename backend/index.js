require('dotenv').config(); // Puxa a senha do arquivo .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Usuario = require('./models/Usuario');

// 2. Criando o servidor
const app = express();
app.use(cors()); // Permite que o Frontend converse com o Backend
app.use(express.json()); // Prepara o servidor para entender dados em formato JSON

// 3. Conectando ao Banco de Dados
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Banco de dados conectado com sucesso!');
  })
  .catch((erro) => {
    console.error('❌ Erro ao conectar no banco:', erro);
  });

// 4. Ligando o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// ==============================================

app.post('/usuarios', async (req, res) => {
  try {
    // A. Pegamos a ficha preenchida que chegou da internet
    const dadosRecebidos = req.body;

    // B. Encaixamos esses dados no nosso molde do Mongoose
    const novoUsuario = new Usuario(dadosRecebidos);

    // C. Mandamos salvar definitivamente no MongoDB (Isso demora alguns milissegundos)
    await novoUsuario.save();

    // D. Carimbamos com sucesso (Status 201) e devolvemos um recibo
    res.status(201).json({ 
      mensagem: 'Usuário cadastrado com sucesso!', 
      usuario: novoUsuario 
    });

  } catch (erro) {
    // E. Se faltou algum campo obrigatório, o molde recusa e cai aqui (Status 400)
    console.error('Erro ao salvar usuário:', erro);
    res.status(400).json({ 
      mensagem: 'Erro ao cadastrar usuário. Verifique os dados.', 
      erro: erro.message 
    });
  }
});
// ==========================================


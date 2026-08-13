import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  // 1. O detetive que busca o CEP na internet
  const buscarCEP = async () => {
    const cepNumeros = cep.replace(/\D/g, '');
    
    if (cepNumeros.length === 8) {
      try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cepNumeros}/json/`);
        const dados = await resposta.json();

        if (!dados.erro) {
          setRua(dados.logradouro);
          setBairro(dados.bairro);
          setCidade(dados.localidade);
          setEstado(dados.uf);
        } else {
          alert("Ops! Esse CEP não existe.");
        }
      } catch (erro) {
        console.error("Erro na comunicação com o ViaCEP", erro);
      }
    }
  }

  // 2. A função que envia os dados para o seu Backend (que estava faltando!)
  const salvarUsuario = async (evento) => {
    evento.preventDefault(); 

    const novoUsuario = {
      nome, email, cep, rua, bairro, cidade, estado
    };

    try {
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario) 
      });

      if (resposta.ok) {
        alert("✅ Usuário cadastrado com sucesso no banco de dados!");
        
        // Limpa as gavetas para o próximo cadastro
        setNome(''); setEmail(''); setCep(''); setRua(''); setBairro(''); setCidade(''); setEstado('');
      } else {
        alert("❌ Erro ao cadastrar. Verifique se preencheu todos os campos.");
      }
    } catch (erro) {
      console.error("Erro ao conectar com o servidor:", erro);
      alert("❌ O servidor Backend parece estar desligado!");
    }
  }

  return (
    <div className="container">
      <h1>Cadastro de Usuário</h1>
      
      {/* 3. O formulário com a trava de segurança "required" nos inputs */}
      <form onSubmit={salvarUsuario}>
        <div className="grupo-campos">
          <input type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="grupo-campos">
          <input 
            type="text" 
            placeholder="Digite o CEP (Ex: 01001000)" 
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={buscarCEP}
            required
          />
        </div>

        <div className="grupo-campos">
          <input type="text" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} required />
          <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
        </div>

        <div className="grupo-campos">
          <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
          <input type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} required />
        </div>

        <button type="submit">Cadastrar Usuário</button>
      </form>
    </div>
  )
}

export default App
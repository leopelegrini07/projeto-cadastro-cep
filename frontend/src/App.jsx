import { useState } from 'react'
import './App.css'

function App() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  // 1. A inteligência atualizada e internacional
  const formatarTelefone = (textoDigitado) => {
    let apenasNumeros = textoDigitado.replace(/\D/g, '');
    if (apenasNumeros.length === 0) return '';

    // SE for Brasil (+55)
    if (apenasNumeros.startsWith('55')) {
      apenasNumeros = apenasNumeros.substring(0, 13);
      if (apenasNumeros.length <= 2) return `+${apenasNumeros}`;
      if (apenasNumeros.length <= 4) return `+${apenasNumeros.slice(0, 2)} (${apenasNumeros.slice(2)}`;
      if (apenasNumeros.length <= 9) return `+${apenasNumeros.slice(0, 2)} (${apenasNumeros.slice(2, 4)}) ${apenasNumeros.slice(4)}`;
      return `+${apenasNumeros.slice(0, 2)} (${apenasNumeros.slice(2, 4)}) ${apenasNumeros.slice(4, 9)}-${apenasNumeros.slice(9)}`;
    }

    // SE for EUA ou Canadá (+1)
    if (apenasNumeros.startsWith('1')) {
      apenasNumeros = apenasNumeros.substring(0, 11);
      if (apenasNumeros.length <= 1) return `+${apenasNumeros}`;
      if (apenasNumeros.length <= 4) return `+${apenasNumeros.slice(0, 1)} (${apenasNumeros.slice(1)}`;
      if (apenasNumeros.length <= 7) return `+${apenasNumeros.slice(0, 1)} (${apenasNumeros.slice(1, 4)}) ${apenasNumeros.slice(4)}`;
      return `+${apenasNumeros.slice(0, 1)} (${apenasNumeros.slice(1, 4)}) ${apenasNumeros.slice(4, 7)}-${apenasNumeros.slice(7)}`;
    }

    // SE for qualquer outro país no mundo
    apenasNumeros = apenasNumeros.substring(0, 15);
    return `+${apenasNumeros}`;
  }

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

  const salvarUsuario = async (evento) => {
    evento.preventDefault(); 

    const novoUsuario = {
      nome, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado
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
        setNome(''); setEmail(''); setTelefone(''); setCep(''); setRua(''); setNumero(''); setComplemento(''); setBairro(''); setCidade(''); setEstado('');
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
      
      <form onSubmit={salvarUsuario}>
        <div className="grupo-campos">
          <input type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="grupo-campos">
          {/* 2. O Pattern (Validação HTML) foi relaxado para aceitar os vários formatos do mundo todo */}
          <input 
            type="tel" 
            placeholder="Telefone (Ex: +55 (11) 99999-9999)" 
            value={telefone} 
            onChange={(e) => setTelefone(formatarTelefone(e.target.value))} 
            pattern="^\+[0-9\s\(\)\-]{8,20}$"
            title="O telefone deve conter o código do país (+). Ex: +55 (11) 99999-9999"
            required 
          />
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
          <input type="text" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} required />
        </div>

        <div className="grupo-campos">
          <input type="text" placeholder="Complemento (Opcional)" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
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
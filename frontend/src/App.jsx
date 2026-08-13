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

  // 1. A NOVA FUNÇÃO: O detetive que busca o CEP na internet
  const buscarCEP = async () => {
    // Limpa o texto para garantir que só tem números
    const cepNumeros = cep.replace(/\D/g, '');
    
    // Só vai na internet se o CEP tiver exatamente 8 números
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

  return (
    <div className="container">
      <h1>Cadastro Inteligente</h1>
      
      <form>
        <div className="grupo-campos">
          <input type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="grupo-campos">
          <input 
            type="text" 
            placeholder="Digite o CEP (Ex: 01001000)" 
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={buscarCEP} // 2. O GATILHO: Dispara a busca quando você clica fora do campo!
          />
        </div>

        <div className="grupo-campos">
          <input type="text" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} />
          <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
        </div>

        <div className="grupo-campos">
          <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
          <input type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
        </div>

        <button type="submit">Cadastrar Usuário</button>
      </form>
    </div>
  )
}

export default App
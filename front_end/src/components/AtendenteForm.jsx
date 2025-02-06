import React, { useState } from 'react';
import { cadastrarAtendente } from '../services/api';

const AtendenteForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState(''); // Alterando de 'usuario' para 'email'
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState(''); // Adicionando estado para mensagem de erro

  const handleSubmit = async (e) => {
    e.preventDefault();
    const atendente = { nome, email, senha }; // Alterando de 'usuario' para 'email'
    try {
      await cadastrarAtendente(atendente);
      alert('Atendente cadastrado com sucesso!');
      setNome('');
      setEmail(''); // Alterando de 'usuario' para 'email'
      setSenha('');
      setMensagemErro(''); // Limpa a mensagem de erro
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMensagemErro(error.response.data.erro); // Define a mensagem de erro vinda do backend
      } else {
        setMensagemErro('Erro ao cadastrar atendente.'); // Mensagem genérica para outros erros
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Atendente</h2>
      {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>} {/* Exibe a mensagem de erro */}
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> {/* Alterando de 'usuario' para 'email' */}
      </label>
      <label>
        Senha:
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
      </label>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default AtendenteForm;

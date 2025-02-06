import React, { useState } from 'react';
import { cadastrarCliente } from '../services/api';

const CadastroCliente = () => {
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [endereco, setEndereco] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = { nome, numero, endereco };
    try {
      await cadastrarCliente(dados);
      alert('Cliente cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      alert('Erro ao cadastrar cliente!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Cliente</h2>
      <label>
        Nome:
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </label>
      <label>
        Número:
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />
      </label>
      <label>
        Endereço:
        <input
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />
      </label>
      <button type="submit">Cadastrar Cliente</button>
    </form>
  );
};

export default CadastroCliente;

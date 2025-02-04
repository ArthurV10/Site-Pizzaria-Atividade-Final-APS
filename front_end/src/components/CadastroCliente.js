// src/components/CadastroCliente.js
import React, { useState } from 'react';
import api from '../api'; // Verifique o caminho correto para a API

const CadastroCliente = () => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/cadastrar_cliente', { nome, endereco, telefone });
      setMensagem(response.data.message);
    } catch (error) {
      setMensagem('Erro ao cadastrar cliente');
    }
  };

  return (
    <div>
      <h1>Cadastro de Cliente</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="text" placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
        <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CadastroCliente;

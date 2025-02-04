import React, { useState } from 'react';
import api from '../api';

const CadastroCliente = () => {
  const [cliente, setCliente] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    bairro: ''
  });

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clientes', cliente);
      alert("Cliente cadastrado com sucesso!");
      setCliente({ nome: '', telefone: '', endereco: '', bairro: '' });
    } catch (error) {
      alert("Erro ao cadastrar cliente.");
    }
  };

  return (
    <div>
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" value={cliente.nome} onChange={handleChange} required />
        <input type="text" name="telefone" placeholder="Telefone" value={cliente.telefone} onChange={handleChange} required />
        <input type="text" name="endereco" placeholder="Endereço" value={cliente.endereco} onChange={handleChange} required />
        <input type="text" name="bairro" placeholder="Bairro" value={cliente.bairro} onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroCliente;

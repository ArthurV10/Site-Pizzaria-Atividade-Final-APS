// frontend/src/components/TamanhoForm.jsx
import React, { useState } from 'react';
import { cadastrarTamanho } from '../services/api';

const TamanhoForm = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tamanho = { nome, preco };
    try {
      await cadastrarTamanho(tamanho);
      alert('Tamanho cadastrado com sucesso!');
      setNome('');
      setPreco('');
    } catch (error) {
      alert('Erro ao cadastrar tamanho!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Tamanho</h2>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </label>
      <label>
        Preço:
        <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} required />
      </label>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default TamanhoForm;

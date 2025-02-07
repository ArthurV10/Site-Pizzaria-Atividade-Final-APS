// frontend/src/components/PizzaForm.jsx
import React, { useState } from 'react';
import { cadastrarPizza } from '../services/api';
import { useNavigate } from 'react-router-dom';

const PizzaForm = () => {
  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [preco, setPreco] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pizza = { nome, ingredientes, preco };
    try {
      await cadastrarPizza(pizza);
      alert('Pizza cadastrada com sucesso!');
      setNome('');
      setIngredientes('');
      setPreco('');
      setMensagemErro('');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMensagemErro(error.response.data.erro);
      } else {
        setMensagemErro('Erro ao cadastrar pizza.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Pizza</h2>
      {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </label>
      <label>
        Ingredientes:
        <input type="text" value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} required />
      </label>
      <label>
        Preço:
        <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} required />
      </label>
      <button type="submit">Cadastrar</button>
      <button onClick={() => navigate('/dashboard')}>Retornar ao Dashboard</button>
    </form>
  );
};

export default PizzaForm;

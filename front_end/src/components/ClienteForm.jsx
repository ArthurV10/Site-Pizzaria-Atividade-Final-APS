import React, { useState } from 'react';
import { cadastrarCliente } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Certifique-se de importar o CSS

const CadastroCliente = () => {
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [endereco, setEndereco] =useState('');
  const navigate = useNavigate();

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
    <div className="form-wrapper">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="client-form">
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
          <div className="button-container">
            <button type="submit">Cadastrar Cliente</button>
            <button type="button" className="secondary" onClick={() => navigate('/dashboard')}>Retornar ao Dashboard</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastroCliente;

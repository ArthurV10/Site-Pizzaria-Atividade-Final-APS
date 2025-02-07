// src/components/ListaAtendentes.jsx
import React, { useState, useEffect } from 'react';
import { listarAtendentes } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ListaAtendentes = () => {
  const [atendentes, setAtendentes] = useState([]);
  const [mensagemErro, setMensagemErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listarAtendentes();
        if (Array.isArray(response.data) && response.data.length === 0) {
          setMensagemErro('Nenhum atendente cadastrado.');
        } else if (Array.isArray(response.data)) {
          setAtendentes(response.data);
          setMensagemErro('');
        } else {
          setMensagemErro('Erro inesperado ao carregar a lista de atendentes.');
        }
      } catch (error) {
        setMensagemErro('Erro ao carregar a lista de atendentes.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Lista de Atendentes</h2>
      {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
      <ul>
        {Array.isArray(atendentes) && atendentes.map((atendente) => (
          <li key={atendente.email}>{atendente.nome}</li>
        ))}
      </ul>
      <button onClick={() => navigate('/dashboard')}>Retornar ao Dashboard</button>
    </div>
  );
};

export default ListaAtendentes;

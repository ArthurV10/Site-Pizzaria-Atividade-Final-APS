import React, { useState, useEffect } from 'react';
import { listarAtendentes } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Certifique-se de importar o CSS

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
    <div className="container">
      <h2>Lista de Atendentes</h2>
      {mensagemErro ? (
        <p style={{ color: 'red' }}>{mensagemErro}</p>
      ) : (
        <div className="atendentes-grid">
          {Array.isArray(atendentes) && atendentes.map((atendente) => (
            <div key={atendente.email} className="atendente-block">
              <h3>{atendente.nome}</h3>
              <p><strong>Email:</strong> {atendente.email}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => navigate('/dashboard')}>Retornar ao Dashboard</button>
    </div>
  );
};

export default ListaAtendentes;

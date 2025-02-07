import React, { useEffect, useState } from 'react';
import { listarClientes } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Certifique-se de importar o CSS

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await listarClientes();
        setClientes(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Erro ao listar clientes:', error);
        if (error.response && error.response.status === 401) {
          alert('Não autorizado. Por favor, faça login.');
          navigate('/login-atendente');
        } else {
          alert('Erro ao listar clientes!');
        }
      }
    };

    fetchClientes();
  }, [navigate]);

  return (
    <div className="container">
      <h2>Lista de Clientes</h2>
      {clientes.length > 0 ? (
        <div className="clientes-grid">
          {clientes.map((cliente, index) => (
            <div key={index} className="cliente-block">
              <h3>{cliente.nome}</h3>
              <p><strong>Número:</strong> {cliente.numero}</p>
              <p><strong>Endereço:</strong> {cliente.endereco}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
      <button type="button" className="secondary" onClick={() => navigate('/dashboard')}>Retornar ao Dashboard</button>
    </div>
  );
};

export default ListaClientes;

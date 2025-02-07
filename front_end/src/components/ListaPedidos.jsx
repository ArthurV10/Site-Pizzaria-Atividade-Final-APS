import React, { useState, useEffect } from 'react';
import { listarPedidos } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Importar o CSS para estilizar os blocos

const ListaPedidos = () => {
  const [pedido, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pedidosResponse = await listarPedidos();
        setPedidos(Array.isArray(pedidosResponse.data) ? pedidosResponse.data : []);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Lista de Pedidos</h2>
      {pedido.length > 0 ? (
        <div className="orders-grid">
          {pedido.map((pedido, index) => (
            <div key={index} className="order-block">
              <h3>Pedido {index + 1}</h3>
              <p><strong>Cliente:</strong> {pedido.cliente}</p>
              <p><strong>Pizza:</strong> {pedido.pizza}</p>
              <p><strong>Tamanho:</strong> {pedido.tamanho}</p>
              <p><strong>Preço:</strong> R$ {pedido.preco.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum pedido encontrado.</p>
      )}
      <button type="button" className="secondary" onClick={() => navigate('/dashboard')}>Retornar ao Dashboard</button>
    </div>
  );
};

export default ListaPedidos;

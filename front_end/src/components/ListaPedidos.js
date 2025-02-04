import React, { useEffect, useState } from 'react';
import api from '../api';

const ListaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get('/pedidos', { headers: { Authorization: `Bearer ${token}` } });
        setPedidos(response.data);
      } catch (error) {
        alert("Erro ao carregar pedidos.");
      }
    };
    fetchPedidos();
  }, []);

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Sabor</th>
            <th>Tamanho</th>
            <th>Preço</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido._id}>
              <td>{pedido.sabor}</td>
              <td>{pedido.tamanho}</td>
              <td>R$ {pedido.preco ? pedido.preco.toFixed(2) : "N/A"}</td>
              <td>{pedido.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPedidos;

import React, { useState } from 'react';
import api from '../api';

const CadastroPedido = () => {
  const [pedido, setPedido] = useState({
    cliente_id: '',
    sabor: '',
    tamanho: ''
  });

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Usuário não autenticado!");
        return;
      }      
      const response = await api.post('/pedidos', pedido, { headers: { Authorization: `Bearer ${token}` } });
      alert(`Pedido cadastrado! Preço: R$ ${response.data.preco.toFixed(2)}`);
      setPedido({ cliente_id: '', sabor: '', tamanho: '' });
    } catch (error) {
      alert("Erro ao cadastrar pedido.");
    }
  };

  return (
    <div>
      <h2>Cadastro de Pedido</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="cliente_id" placeholder="ID do Cliente" value={pedido.cliente_id} onChange={handleChange} required />
        <select name="sabor" value={pedido.sabor} onChange={handleChange} required>
          <option value="">Escolha o sabor</option>
          <option value="calabresa">Calabresa</option>
          <option value="mussarela">Mussarela</option>
        </select>
        <select name="tamanho" value={pedido.tamanho} onChange={handleChange} required>
          <option value="">Escolha o tamanho</option>
          <option value="media">Média</option>
          <option value="grande">Grande</option>
        </select>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroPedido;

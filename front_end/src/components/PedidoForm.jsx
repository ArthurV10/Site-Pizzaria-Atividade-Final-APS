import React, { useState, useEffect } from 'react';
import { listarPizzas, listarClientes, registrarPedido } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Certifique-se de importar o CSS

const PedidoForm = () => {
  const [pizzas, setPizzas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tamanho, setTamanho] = useState('');
  const [pizzaSelecionada, setPizzaSelecionada] = useState('');
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [preco, setPreco] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pizzasResponse = await listarPizzas();
        setPizzas(Array.isArray(pizzasResponse.data) ? pizzasResponse.data : []);
        const clientesResponse = await listarClientes();
        setClientes(Array.isArray(clientesResponse.data) ? clientesResponse.data : []);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calcularPreco = () => {
      let precoBase = 0;
      const pizza = pizzas.find(p => p.nome === pizzaSelecionada);
      if (pizza) {
        precoBase += pizza.preco;
      }

      switch (tamanho) {
        case 'Pequena':
          precoBase *= 1;
          break;
        case 'Média':
          precoBase *= 1.5;
          break;
        case 'Grande':
          precoBase *= 2;
          break;
        default:
          precoBase = 0;
          break;
      }

      setPreco(precoBase);
    };

    calcularPreco();
  }, [pizzaSelecionada, tamanho, pizzas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cliente = clientes.find(c => c.nome === clienteSelecionado);
    const pedido = { pizza: pizzaSelecionada, tamanho, preco, cliente: cliente ? cliente.nome : '' };
    try {
      await registrarPedido(pedido);
      alert('Pedido registrado com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar pedido:', error);
      alert('Erro ao registrar pedido!');
    }
  };

  const handleClienteChange = (e) => {
    setClienteSelecionado(e.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Registro de Pedido</h2>
        <label>
          Pizza:
          <select value={pizzaSelecionada} onChange={(e) => setPizzaSelecionada(e.target.value)} required>
            <option value="">Selecione uma pizza</option>
            {pizzas.map((pizza) => (
              <option key={pizza.nome} value={pizza.nome}>{pizza.nome}</option>
            ))}
          </select>
        </label>
        <label>
          Cliente:
          <select value={clienteSelecionado} onChange={handleClienteChange} required>
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.nome} value={cliente.nome}>{cliente.nome}</option>
            ))}
          </select>
        </label>
        <label>
          Tamanho:
          <select value={tamanho} onChange={(e) => setTamanho(e.target.value)} required>
            <option value="">Selecione o tamanho</option>
            <option key="pequena" value="Pequena">Pequena</option>
            <option key="media" value="Média">Média</option>
            <option key="grande" value="Grande">Grande</option>
          </select>
        </label>
        <p>Preço: R$ {preco.toFixed(2)}</p>
        <div className="button-container">
          <button type="submit">Registrar Pedido</button>
          <button type="button" className="secondary" onClick={() => navigate('/dashboard')}>Retornar ao Dashboard</button>
        </div>
      </form>
    </div>
  );
};

export default PedidoForm;

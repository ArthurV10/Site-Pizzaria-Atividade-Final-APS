import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export const listarPizzas = () => api.get('/pizzas');
export const listarClientes = () => api.get('/clientes');

export const cadastrarCliente = (dados) => api.post('/clientes/cadastro', dados);

export const cadastrarAtendente = (dados) => api.post('/atendentes', dados);
export const listarAtendentes = () => api.get('/atendentes');

export const registrarPedido = (dados) => api.post('/pedidos', dados);
export const listarPedidos = () => api.get('/pedidos');

export const cadastrarPizza = (dados) => api.post('/pizzas', dados);
export const cadastrarTamanho = (dados) => api.post('/tamanhos', dados);
export const listarTamanhos = () => api.get('/tamanhos');

export const loginAtendente = (dados) => api.post('/atendentes/login', dados);

export default api;

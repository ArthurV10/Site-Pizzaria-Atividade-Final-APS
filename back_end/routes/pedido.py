from flask import Blueprint, request, jsonify
from models.pedido import criar_pedido, listar_pedidos

pedido_bp = Blueprint('pedidos', __name__)

@pedido_bp.route('/', methods=['POST'])
def registrar():
    data = request.json
    if not data or not all(key in data for key in ('pizza', 'tamanho', 'preco', 'cliente')):
        return jsonify({"erro": "Todos os campos são obrigatórios."}), 400

    sucesso = criar_pedido(data['pizza'], data['tamanho'], data['preco'], data['cliente'])
    if not sucesso:
        return jsonify({"erro": "Erro ao registrar pedido."}), 400

    return jsonify({"mensagem": "Pedido registrado com sucesso!"})

@pedido_bp.route('/', methods=['GET'])
def listar():
    pedidos = listar_pedidos()
    return jsonify(pedidos)

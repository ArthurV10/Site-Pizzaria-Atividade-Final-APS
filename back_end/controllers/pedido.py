from flask import Blueprint, request, jsonify
from models.pedido import criar_pedido, buscar_pedido_por_id, listar_pedidos

pedido_bp = Blueprint('pedidos', __name__)

# Registro de pedido
@pedido_bp.route('/', methods=['POST'])
def registrar_pedido():
    dados = request.json
    pizza = dados.get("pizza")
    tamanho = dados.get("tamanho")
    preco = dados.get("preco")

    if not pizza or not tamanho or preco is None:
        return jsonify({"erro": "Todos os campos são obrigatórios"}), 400

    criar_pedido(pizza, tamanho, preco)
    return jsonify({"mensagem": "Pedido registrado com sucesso!"}), 201

# Buscar pedido por ID
@pedido_bp.route('/<pedido_id>', methods=['GET'])
def obter_pedido(pedido_id):
    pedido = buscar_pedido_por_id(pedido_id)
    
    if not pedido:
        return jsonify({"erro": "Pedido não encontrado"}), 404

    return jsonify(pedido), 200

# Listar todos os pedidos
@pedido_bp.route('/', methods=['GET'])
def listar_todos_pedidos():
    pedidos = listar_pedidos()
    return jsonify(pedidos), 200

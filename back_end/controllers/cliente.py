from flask import Blueprint, request, jsonify
from models.cliente import criar_cliente, buscar_cliente_por_nome
from database import get_db

clientes_bp = Blueprint('clientes', __name__)

# Cadastro de cliente
@clientes_bp.route('/clientes', methods=['POST'])
def cadastrar_cliente():
    dados = request.json
    nome = dados.get("nome")
    telefone = dados.get("telefone")
    endereco = dados.get("endereco")
    
    if not nome or not telefone or not endereco:
        return jsonify({"erro": "Todos os campos são obrigatórios"}), 400

    criar_cliente(nome, telefone, endereco)
    return jsonify({"mensagem": "Cliente cadastrado com sucesso!"}), 201

# Buscar cliente por nome
@clientes_bp.route('/clientes/<nome>', methods=['GET'])
def obter_cliente(nome):
    cliente = buscar_cliente_por_nome(nome)
    
    if not cliente:
        return jsonify({"erro": "Cliente não encontrado"}), 404

    return jsonify(cliente), 200

# Listar todos os clientes
@clientes_bp.route('/clientes', methods=['GET'])
def listar_clientes():
    db = get_db()
    clientes = list(db.cliente.find({}, {"_id": 0}))
    return jsonify(clientes), 200

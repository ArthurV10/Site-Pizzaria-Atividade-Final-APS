from flask import Blueprint, request, jsonify
from models.cliente import criar_cliente, buscar_cliente_por_id, listar_clientes
from database import get_db

cliente_bp = Blueprint('clientes', __name__)

@cliente_bp.route('/cadastro', methods=['POST'])
def cadastrar():
    data = request.json
    if not data or not all(key in data for key in ('nome', 'numero', 'endereco')):
        return jsonify({"erro": "Todos os campos são obrigatórios."}), 400

    sucesso = criar_cliente(data['nome'], data['numero'], data['endereco'])
    if not sucesso:
        return jsonify({"erro": "Cliente já existe."}), 400

    return jsonify({"mensagem": "Cliente cadastrado com sucesso!"})

@cliente_bp.route('/<id>', methods=['GET'])
def obter_cliente(id):
    cliente = buscar_cliente_por_id(id)
    if cliente:
        return jsonify(cliente)
    return jsonify({"erro": "Cliente não encontrado."}), 404

@cliente_bp.route('/', methods=['GET'])
def listar_clientes():
    try:
        db = get_db()
        clientes = list(db.cliente.find({}, {'_id': 0, 'nome': 1, 'numero': 1, 'endereco': 1}))
        return jsonify(clientes)
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

from flask import Blueprint, request, jsonify

atendente_bp = Blueprint('atendentes', __name__)

@atendente_bp.route('/', methods=['POST'])
def cadastrar():
    from models.atendente import criar_atendente  # Importação dentro da função
    data = request.json
    if not data or not all(key in data for key in ('nome', 'email', 'senha')):
        return jsonify({"erro": "Todos os campos são obrigatórios."}), 400

    if not criar_atendente(data['nome'], data['email'], data['senha']):
        return jsonify({"erro": "Atendente já existe."}), 400

    return jsonify({"mensagem": "Atendente cadastrado com sucesso!"})

@atendente_bp.route('/login', methods=['POST'])
def login():
    from models.atendente import buscar_atendente_por_email_e_senha  # Certifique-se de que o nome da função está correto
    data = request.json
    if not data or not all(key in data for key in ('email', 'senha')):  # Usando 'email' em vez de 'nome'
        return jsonify({"erro": "Todos os campos são obrigatórios."}), 400

    atendente = buscar_atendente_por_email_e_senha(data['email'], data['senha'])  # Usando 'email' em vez de 'nome'
    if atendente:
        return jsonify({"mensagem": "Login realizado com sucesso!"})
    return jsonify({"erro": "Email ou senha incorretos."}), 401

@atendente_bp.route('/', methods=['GET'])
def listar():
    from models.atendente import listar_atendentes  # Importação dentro da função
    atendentes = listar_atendentes()
    if not atendentes:
        return jsonify({"mensagem": "Nenhum atendente cadastrado."})
    return jsonify(atendentes)

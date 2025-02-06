import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.atendente import atendente_bp
from routes.cliente import cliente_bp
from routes.pedido import pedido_bp
from routes.pizza import pizza_bp
from database import init_db
from init_tamanhos import adicionar_tamanhos_iniciais

app = Flask(__name__)

# Configuração de CORS para permitir requisições do frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

init_db()

# Adicionar tamanhos iniciais ao banco de dados
adicionar_tamanhos_iniciais()

# Registrar Blueprints
app.register_blueprint(atendente_bp, url_prefix='/atendentes')
app.register_blueprint(cliente_bp, url_prefix='/clientes')
app.register_blueprint(pedido_bp, url_prefix='/pedidos')
app.register_blueprint(pizza_bp, url_prefix='/pizzas')

@app.after_request
def after_request(response):
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
    return response

# Adicione um endpoint para lidar com requisições OPTIONS
@app.route('/atendentes', methods=['OPTIONS'])
def atendentes_options():
    return after_request(Flask.response_class())

@app.route('/clientes', methods=['OPTIONS'])
def clientes_options():
    return after_request(Flask.response_class())

@app.route('/pedidos', methods=['OPTIONS'])
def pedidos_options():
    return after_request(Flask.response_class())

@app.route('/pizzas', methods=['OPTIONS'])
def pizzas_options():
    return after_request(Flask.response_class())

@app.route('/login-atendente', methods=['OPTIONS'])
def login_atendente_options():
    return after_request(Flask.response_class())

@app.route ('/registro-pedido', methods=['OPTIONS'])
def registro_pedido_options():
    return after_request(Flask.response_class())

if __name__ == '__main__':
    app.run(debug=True)

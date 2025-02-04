from pymongo import MongoClient

# Conectar ao MongoDB (ajuste a URI se necessário)
client = MongoClient("mongodb://localhost:27017/")

# Selecionar o banco de dados
db = client["pizzaria"]

# Selecionar a coleção
collection = db["users"]

# Criar um novo usuário
novo_usuario = {
    "nome": "Arthur Vieira",
    "email": "arthur@email.com",
    "idade": 25
}

# Inserir no banco de dados e verificar se foi bem-sucedido
try:
    resultado = collection.insert_one(novo_usuario)
    print(f"Usuário inserido com ID: {resultado.inserted_id}")
except Exception as e:
    print(f"Erro ao inserir usuário: {e}")

# Recuperar e exibir todos os usuários cadastrados
print("\nLista de usuários cadastrados:")
for user in collection.find():
    print(user)

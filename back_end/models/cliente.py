from database import get_db
from bson.objectid import ObjectId

def criar_cliente(nome, numero, endereco):
    db = get_db()
    if db.cliente.find_one({"nome": nome, "numero": numero}):
        return False  # Cliente já existe
    db.cliente.insert_one({"nome": nome, "numero": numero, "endereco": endereco})
    return True

def buscar_cliente_por_id(id):
    db = get_db()
    return db.cliente.find_one({"_id": ObjectId(id)})

def listar_clientes():
    db = get_db()
    return list(db.cliente.find({}, {"_id": 1, "nome": 1}))  # Listando apenas _id e nome dos clientes

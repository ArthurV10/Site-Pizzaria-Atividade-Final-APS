from database import get_db

def criar_pedido(pizza, tamanho, preco):
    db = get_db()
    db.pedido.insert_one({"pizza": pizza, "tamanho": tamanho, "preco": preco})
    return True

def listar_pedidos():
    db = get_db()
    return list(db.pedido.find({}, {"_id": 0, "cliente": 1, "pizza": 1, "tamanho": 1, "preco": 1}))

def buscar_pedido_por_id(pedido_id):
    db = get_db()
    return db.pedido.find_one({"_id": pedido_id})
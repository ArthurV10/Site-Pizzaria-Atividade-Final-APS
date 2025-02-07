from database import get_db

def criar_pedido(pizza, tamanho, preco, cliente):
    try:
        db = get_db()
        db.pedido.insert_one({
            "pizza": pizza,
            "tamanho": tamanho,
            "preco": preco,
            "cliente": cliente
        })
        return True
    except Exception as e:
        print(f"Erro ao criar pedido: {e}")
        return False

def listar_pedidos():
    try:
        db = get_db()
        pedidos = list(db.pedido.find({}, {'_id': 0, 'pizza': 1, 'tamanho': 1, 'preco': 1, 'cliente': 1}))
        return pedidos
    except Exception as e:
        print(f"Erro ao listar pedidos: {e}")
        return []

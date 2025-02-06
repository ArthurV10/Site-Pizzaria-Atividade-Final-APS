from database import get_db

def criar_pizza(nome, ingredientes, preco):
    db = get_db()
    # Verifica se já existe uma pizza com o mesmo nome
    if db.pizza.find_one({"nome": nome}):
        return False  # Pizza já existe
    db.pizza.insert_one({"nome": nome, "ingredientes": ingredientes, "preco": preco})
    return True

def buscar_pizza_por_nome(nome):
    db = get_db()
    return db.pizza.find_one({"nome": nome})

def listar_pizzas():
    db = get_db()
    pizzas = list(db.pizza.find({}, {"_id": 0}))  # Excluindo "_id"
    return pizzas


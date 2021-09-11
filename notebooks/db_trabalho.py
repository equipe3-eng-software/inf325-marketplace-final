from pymongo import MongoClient
from pathlib import Path
import os
import json
import warnings
warnings.filterwarnings('ignore')

# Conectar a instância do MongoDB implantado na AWS
client = MongoClient('3.86.205.77', 27017)

# Criando uma nova referência para o banco de dados desejado
db = client.trabalho


def reset_db():
    data_path = Path("./data").absolute()
    filenames = next(os.walk(data_path), (None, None, []))[2]  # [] if no file
    data_dict = {}

    for filename in filenames:
        f = open(os.path.join(data_path, filename), "r")
        data = json.loads(f.read())
        data_dict[filename.replace('.json', '')] = data
        f.close()

    for key in data_dict.keys():
        coll = key
        docs = data_dict[coll]
        db[coll].insert_many(docs)
    return


if __name__ == "__main__":
    reset_db()

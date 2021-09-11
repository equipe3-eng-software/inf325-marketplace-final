from pymongo import MongoClient
from pathlib import Path
import os
import json

# Conectar a instância do MongoDB implantado na AWS
client = MongoClient('34.201.43.56', 27017)

# Criando uma nova referência para o banco de dados desejado
db = client.trabalho


def reset_db():
    collections = db.list_collection_names()
    print(f"Collections= {collections}")

    data_path = Path("./data").absolute()
    filenames = next(os.walk(data_path), (None, None, []))[2]  # [] if no file
    data_dict = {}

    for filename in filenames:
        print(f"Reading {filename}")
        f = open(os.path.join(data_path, filename), "r")
        data = json.loads(f.read())
        data_dict[filename.replace('.json', '')] = data
        f.close()

    for collection in data_dict.keys():
        print(
            f"before {collection} = {db[collection].count_documents({})}")
        try:
            docs = data_dict[collection]
            db[collection].drop()  # DROP
            db[collection].insert_many(docs)  # INSERT
            print(
                f"after {collection} = {db[collection].count_documents({})}")
        except:
            print("ops")

    return


if __name__ == "__main__":
    reset_db()

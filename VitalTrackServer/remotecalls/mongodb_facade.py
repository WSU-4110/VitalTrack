from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import certifi
import os


class MongoDbFacade:
    def __init__(self):
        self.uri = os.environ["MONGO_API_KEY"]
        self.client = MongoClient(
            self.uri, server_api=ServerApi("1"), tlsCAFile=certifi.where()
        )

    def ping(self):
        try:
            self.client.admin.command("ping")
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)

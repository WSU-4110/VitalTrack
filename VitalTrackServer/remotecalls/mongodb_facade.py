import mongoengine
import certifi
import os
from model.user_model import User


class MongoDbFacade:
    _self = None

    def __new__(cls):
        if cls._self is None:
            cls._self = super().__new__(cls)
        return cls._self

    def __init__(self):
        if not hasattr(self, "client"):
            self.uri = os.environ["MONGO_API_KEY"]
            self.client = mongoengine.connect(host=self.uri, tlsCAFile=certifi.where())
            self.ping()

    def ping(self):
        try:
            self.client.admin.command("ping")
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            print(e)

    def save(self, document):
        document.save()

    def get_user_by_id(self, id):
        return User.objects(id=id).first()


mongo_db_facade = MongoDbFacade()

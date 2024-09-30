import mongoengine
import certifi
import os
from model.user_model import User
import logging


class MongoDbFacade:
    def __init__(self) -> None:
        self.uri = os.environ["MONGO_API_KEY"]
        self.client = mongoengine.connect(host=self.uri, tlsCAFile=certifi.where())
        self.logger = logging.getLogger(__name__)
        self.ping()

    def ping(self) -> None:
        try:
            self.client.admin.command("ping")
            print("Pinged your deployment. You successfully connected to MongoDB!")
        except Exception as e:
            self.logger.info("Failed to make connection to mongodb: ", e)

    def save(self, document) -> None:
        document.save()

    def get_user_by_id(self, id: str) -> str:
        return User.objects(user_id=id).first()


mongo_db_facade = MongoDbFacade()

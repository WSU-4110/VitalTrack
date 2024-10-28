import mongoengine as me
from model.entries_model import Entry


class Medication(me.EmbeddedDocument):
    name = me.StringField(required=True)
    dosage = me.StringField(required=True)
    frequency = me.StringField(required=True)


class User(me.Document):
    user_id = me.StringField(required=True)
    name = me.StringField(required=True)
    email = me.EmailField(required=True)
    age = me.IntField(required=True)
    entries = me.EmbeddedDocumentListField(Entry)
    medications = me.EmbeddedDocumentListField(Medication)

    meta = {
        "collection": "users",
        "indexes": [
            {"fields": ["email"], "unique": True},
        ],
    }

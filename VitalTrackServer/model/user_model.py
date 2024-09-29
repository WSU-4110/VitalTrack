import mongoengine as me
from model.entries_model import Entry


class Medication(me.EmbeddedDocument):
    name = me.StringField(required=True)
    dosage = me.StringField(required=True)
    time_logged = me.DateTimeField(required=True)


class User(me.Document):
<<<<<<< HEAD
    user_id = me.StringField(required=True)
=======
    uid = me.StringField(required=True)
>>>>>>> a203388 (query user by firebase uid)
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

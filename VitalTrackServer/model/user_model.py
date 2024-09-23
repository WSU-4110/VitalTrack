import mongoengine as me


class Medication(me.EmbeddedDocument):
    name = me.StringField(required=True)
    dosage = me.StringField(required=True)
    time_logged = me.DateTimeField(required=True)


class User(me.Document):
    name = me.StringField(required=True)
    email = me.EmailField(required=True)
    age = me.IntField(required=True)
    medications = me.EmbeddedDocumentListField(Medication)

    meta = {
        "collection": "users",
        "indexes": [
            {"fields": ["email"], "unique": True},
        ],
    }

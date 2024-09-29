import mongoengine as me
import datetime

class Entry(me.EmbeddedDocument):
    date = me.DateField(default=datetime.date.today)
    well_being = me.StringField(required=True)
    sleep_quality = me.StringField(required=True)
    mood = me.StringField(required=True)
    activity = me.StringField(required=False)
    symptoms = me.ListField(me.StringField(), required=False)
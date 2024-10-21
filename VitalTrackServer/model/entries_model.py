import mongoengine as me
import datetime

class Entry(me.EmbeddedDocument):
    date = me.DateField(default=datetime.date.today)
    well_being = me.StringField(required=True)
    sleep_quality = me.StringField(required=False)  
    mood = me.StringField(required=True)
    stress= me.StringField(required=True)
    activity = me.ListField(me.StringField(), required=False)  
    symptoms = me.ListField(me.StringField(), required=False)
    def to_dict(self):
        return {
            "date": str(self.date),
            "well_being": self.well_being,
            "sleep_quality": self.sleep_quality,
            "mood": self.mood,
            "stress": self.stress,
            "activity": self.activity,
            "symptoms": self.symptoms
        }


import mongoengine as me
import datetime

class Entry(me.EmbeddedDocument):
    date = me.DateField(default=datetime.date.today)
    well_being = me.StringField(required=True)
    sleep_quality = me.StringField(required=True)  
    mood = me.StringField(required=True)
    stress= me.StringField(required=True)
    activity = me.ListField(me.StringField(), required=False)  
    symptoms = me.ListField(me.StringField(), required=False)
    classification = me.StringField(required=True)  

    def to_dict(self):
        return {
            "date": str(self.date),
            "well_being": self.well_being,
            "sleep_quality": self.sleep_quality,
            "mood": self.mood,
            "stress": self.stress,
            "activity": self.activity,
            "symptoms": self.symptoms,
            "classification": self.classification
        }
    
    def classify_day(self): #lets classifcy a persons day based on the data they give us
        score_map = {
            'well_being': {
                'Very Poor': -2,
                'Poor': -1,
                'Okay': 0,
                'Good': 1,
                'Great': 2
            },
            'sleep_quality': {
                'Bad': -2,
                'Moderate': 0,
                'Good': 2
            },
            'mood': {
                'Very Bad': -2,
                'Bad': -1,
                'Okay': 0,
                'Good': 1,
                'Great': 2
            },
            'stress': {
                'High': -2,
                'Moderate': -1,
                'Low': 1
            },
            'activity': {
                'Yoga': 1,
                'Weights': 1,
                'Walk': 1,
                'Sport': 2,
                'HIT': 2  
            },
            'symptoms': {
                'Sneeze': 0,  
                'Nausea': -1,
                'Headache': -2,
                'Fever': -3,
                'Fatigue': -1  
            },
            'energy': {
                'Very Low': -2,
                'Low': -1,
                'Moderate': 0,
                'High': 1,
                'Very High': 2
            }
        }

        total_score = (
            score_map['well_being'].get(self.well_being, 0) +
            score_map['sleep_quality'].get(self.sleep_quality, 0) +
            score_map['mood'].get(self.mood, 0) +
            score_map['stress'].get(self.stress, 0) +
            sum([score_map['activity'].get(a, 0) for a in self.activity]) +
            sum([score_map['symptoms'].get(s, 0) for s in self.symptoms])
        )

        if total_score <= -6:
            self.classification = "Very Bad Day"
        elif total_score <= -3:
            self.classification = "Bad Day"
        elif total_score <= 0:
            self.classification = "Okay Day"
        elif total_score <= 4:
            self.classification = "Good Day"
        else:
            self.classification = "Great Day"

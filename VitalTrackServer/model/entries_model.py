from abc import ABC, abstractmethod
import mongoengine as me
import datetime

# Strategy Interface
class ClassificationStrategy(ABC):
    @abstractmethod
    def classify_day(self, entry):
        pass

# Basic Classification Strategy
class BasicClassificationStrategy(ClassificationStrategy):
    def classify_day(self, entry):
        score_map = {
            'well_being': {'Very Poor': -2, 'Poor': -1, 'Okay': 0, 'Good': 1, 'Great': 2},
            'sleep_quality': {'Bad': -2, 'Moderate': 0, 'Good': 2},
            'mood': {'Very Bad': -2, 'Bad': -1, 'Okay': 0, 'Good': 1, 'Great': 2},
            'stress': {'High': -2, 'Moderate': -1, 'Low': 1},
            'activity': {'Yoga': 1, 'Weights': 1, 'Walk': 1, 'Sport': 2, 'HIT': 2},
            'symptoms': {'Sneeze': 0, 'Nausea': -1, 'Headache': -2, 'Fever': -3, 'Fatigue': -1}
        }

        total_score = (
            score_map['well_being'].get(entry.well_being, 0) +
            score_map['sleep_quality'].get(entry.sleep_quality, 0) +
            score_map['mood'].get(entry.mood, 0) +
            score_map['stress'].get(entry.stress, 0) +
            sum([score_map['activity'].get(a, 0) for a in entry.activity]) +
            sum([score_map['symptoms'].get(s, 0) for s in entry.symptoms])
        )

        if total_score <= -6:
            entry.classification = "Very Bad Day"
        elif total_score <= -3:
            entry.classification = "Bad Day"
        elif total_score <= 0:
            entry.classification = "Okay Day"
        elif total_score <= 4:
            entry.classification = "Good Day"
        else:
            entry.classification = "Great Day"

# Advanced Classification Strategy
class AdvancedClassificationStrategy(ClassificationStrategy):
    def classify_day(self, entry):
        score_map = {
            'well_being': {'Very Poor': -3, 'Poor': -2, 'Okay': 0, 'Good': 2, 'Great': 3},
            'sleep_quality': {'Bad': -3, 'Moderate': 0, 'Good': 3},
            'mood': {'Very Bad': -3, 'Bad': -2, 'Okay': 0, 'Good': 2, 'Great': 3},
            'stress': {'High': -3, 'Moderate': -1, 'Low': 2},
            'activity': {'Yoga': 2, 'Weights': 2, 'Walk': 1, 'Sport': 3, 'HIT': 3},
            'symptoms': {'Sneeze': -1, 'Nausea': -2, 'Headache': -3, 'Fever': -4, 'Fatigue': -2}
        }

        total_score = (
            score_map['well_being'].get(entry.well_being, 0) +
            score_map['sleep_quality'].get(entry.sleep_quality, 0) +
            score_map['mood'].get(entry.mood, 0) +
            score_map['stress'].get(entry.stress, 0) +
            sum([score_map['activity'].get(a, 0) for a in entry.activity]) +
            sum([score_map['symptoms'].get(s, 0) for s in entry.symptoms])
        )

        if total_score <= -8:
            entry.classification = "Very Bad Day"
        elif total_score <= -4:
            entry.classification = "Bad Day"
        elif total_score <= 1:
            entry.classification = "Okay Day"
        elif total_score <= 6:
            entry.classification = "Good Day"
        else:
            entry.classification = "Great Day"

# Entry Class Using Strategy
class Entry(me.EmbeddedDocument):
    date = me.DateField(default=datetime.date.today)
    well_being = me.StringField(required=True)
    sleep_quality = me.StringField(required=False)  
    mood = me.StringField(required=True)
    stress= me.StringField(required=True)
    activity = me.ListField(me.StringField(), required=False)  
    symptoms = me.ListField(me.StringField(), required=False)
    classification = me.StringField(required=True)
    
    # Initialize with a classification strategy
    def __init__(self, *args, strategy=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.strategy = strategy or BasicClassificationStrategy()  # Default to Basic Strategy if none provided

    def classify_day(self):
        self.strategy.classify_day(self)


#go through example usage
entry = Entry(
    well_being='Good',
    sleep_quality='Moderate',
    mood='Okay',
    stress='Low',
    activity=['Yoga', 'Walk'],
    symptoms=['Headache'],
    strategy=BasicClassificationStrategy()  # Or pass AdvancedClassificationStrategy() 
)

entry.classify_day()
print(entry.classification)  # Outputs the classification based on chosen strategy


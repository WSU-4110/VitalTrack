import unittest
from unittest.mock import patch
from flask import Flask
from dotenv import load_dotenv
from types import SimpleNamespace
import os
import sys

load_dotenv()

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from activity.api_log_medication import log_medication_blueprint
os.environ["MONGO_API_KEY"] = "test_api_key"


class TestLogMedicationAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        
        cls.app = Flask(__name__)
        cls.app.config['TESTING'] = True  
        cls.app.register_blueprint(log_medication_blueprint)
        cls.client = cls.app.test_client()

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_get_medications(self, mock_get_user_by_id):
        
        mock_med1 = SimpleNamespace(name="Med1", dosage="10mg", frequency="Daily")
        mock_med2 = SimpleNamespace(name="Med2", dosage="20mg", frequency="Weekly")

        mock_user = SimpleNamespace(medications=[mock_med1, mock_med2])
        mock_get_user_by_id.return_value = mock_user

        response = self.client.get("/getMedications/user123")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.get_json(),
            [
                {"name": "Med1", "dosage": "10mg", "frequency": "Daily"},
                {"name": "Med2", "dosage": "20mg", "frequency": "Weekly"},
            ],
        )

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_get_medications_user_not_found(self, mock_get_user_by_id):
        mock_get_user_by_id.return_value = None

        response = self.client.get("/getMedications/user123")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.get_json(), {"error": "User not found"})

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    @patch("remotecalls.mongodb_facade.mongo_db_facade.save")
    def test_log_medication(self, mock_save, mock_get_user_by_id):
        mock_user = SimpleNamespace(medications=[])
        mock_get_user_by_id.return_value = mock_user

        data = {"name": "Med1", "dosage": "10mg", "frequency": "Daily"}
        response = self.client.post("/logMedication/user123", json=data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response.get_json(), {"message": "Medication logged successfully!"}
        )
        self.assertEqual(len(mock_user.medications), 1)
        mock_save.assert_called_once()

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_log_medication_user_not_found(self, mock_get_user_by_id):
        mock_get_user_by_id.return_value = None

        data = {"name": "Med1", "dosage": "10mg", "frequency": "Daily"}
        response = self.client.post("/logMedication/user123", json=data)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.get_json(), {"error": "User not found"})

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    @patch("remotecalls.mongodb_facade.mongo_db_facade.save")
    def test_log_medication_invalid_data(self, mock_save, mock_get_user_by_id):
        mock_user = SimpleNamespace(medications=[])
        mock_get_user_by_id.return_value = mock_user

        data = {}  
        response = self.client.post("/logMedication/user123", json=data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response.get_json(), {"message": "Medication logged successfully!"}
        )
        self.assertEqual(len(mock_user.medications), 1)
        mock_save.assert_called_once()

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    @patch("remotecalls.mongodb_facade.mongo_db_facade.save")
    def test_update_medication(self, mock_save, mock_get_user_by_id):
        mock_medication = SimpleNamespace(name="Med1", dosage="10mg", frequency="Daily")
        mock_user = SimpleNamespace(medications=[mock_medication])
        mock_get_user_by_id.return_value = mock_user

        data = {"name": "UpdatedMed1", "dosage": "15mg", "frequency": "Weekly"}
        response = self.client.put("/updateMedication/user123/0", json=data)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.get_json(), {"message": "Medication updated successfully!"}
        )
        mock_save.assert_called_once()
        
        self.assertEqual(mock_user.medications[0].name, "UpdatedMed1")
        self.assertEqual(mock_user.medications[0].dosage, "15mg")
        self.assertEqual(mock_user.medications[0].frequency, "Weekly")

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_update_medication_user_not_found(self, mock_get_user_by_id):
        mock_get_user_by_id.return_value = None

        data = {"name": "UpdatedMed1", "dosage": "15mg", "frequency": "Weekly"}
        response = self.client.put("/updateMedication/user123/0", json=data)

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.get_json(), {"error": "User not found"})

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_update_medication_index_out_of_range(self, mock_get_user_by_id):
        mock_user = SimpleNamespace(medications=[])  
        mock_get_user_by_id.return_value = mock_user

        data = {"name": "UpdatedMed1", "dosage": "15mg", "frequency": "Weekly"}
        response = self.client.put("/updateMedication/user123/0", json=data)

        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.get_json(), {"error": "Medication not found"})

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    @patch("remotecalls.mongodb_facade.mongo_db_facade.save")
    def test_delete_medication(self, mock_save, mock_get_user_by_id):
        mock_medication = SimpleNamespace(name="Med1", dosage="10mg", frequency="Daily")
        mock_user = SimpleNamespace(medications=[mock_medication])
        mock_get_user_by_id.return_value = mock_user

        response = self.client.delete("/deleteMedication/user123/0")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.get_json(), {"message": "Medication deleted successfully!"}
        )
        self.assertEqual(len(mock_user.medications), 0)
        mock_save.assert_called_once()

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_delete_medication_user_not_found(self, mock_get_user_by_id):
        mock_get_user_by_id.return_value = None

        response = self.client.delete("/deleteMedication/user123/0")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.get_json(), {"error": "User not found"})

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_delete_medication_index_out_of_range(self, mock_get_user_by_id):
        mock_user = SimpleNamespace(medications=[])  
        mock_get_user_by_id.return_value = mock_user

        response = self.client.delete("/deleteMedication/user123/0")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.get_json(), {"error": "Medication not found"})

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_get_medication_by_index(self, mock_get_user_by_id):
        mock_medication = SimpleNamespace(name="Med1", dosage="10mg", frequency="Daily")
        mock_user = SimpleNamespace(medications=[mock_medication])
        mock_get_user_by_id.return_value = mock_user

        response = self.client.get("/getMedication/user123/0")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.get_json(),
            {"name": "Med1", "dosage": "10mg", "frequency": "Daily"},
        )

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_get_medication_by_index_not_found(self, mock_get_user_by_id):
        mock_user = SimpleNamespace(medications=[])
        mock_get_user_by_id.return_value = mock_user

        response = self.client.get("/getMedication/user123/0")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.get_json(), {"error": "Medication not found"})

    @patch("remotecalls.mongodb_facade.mongo_db_facade.get_user_by_id")
    def test_get_medication_by_index_user_not_found(self, mock_get_user_by_id):
        mock_get_user_by_id.return_value = None

        response = self.client.get("/getMedication/user123/0")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.get_json(), {"error": "User not found"})


if __name__ == "__main__":
    unittest.main()

import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, jsonify, make_response
from remotecalls.openai_facade import OpenAIFacade


class TestOpenAIFacade(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app = Flask(__name__)

    @patch("remotecalls.openai_facade.OpenAI")
    @patch.dict(
        "os.environ",
        {
            "OPENAI_API_KEY": "fake_api_key",
            "FINED_TUNED_MODEL": "fake_fine_tuned_model",
            "OPENAI_SYSTEM_MESSAGE": "System message",
        },
    )
    def test_get_gpt4_response_success(self, mock_openai):
        with self.app.app_context():
            mock_response = MagicMock()
            mock_response.choices[0].message.content = (
                "1. Tip one\n2. Tip two\n3. Tip three"
            )
            mock_openai.return_value.chat.completions.create.return_value = (
                mock_response
            )

            facade = OpenAIFacade()
            response = facade.get_gpt4_response("Hello")

            expected_response = make_response(
                jsonify(
                    {"message": ["Tip one", "Tip two", "Tip three"], "code": "SUCCESS"}
                ),
                200,
            )

            self.assertEqual(response.get_json(), expected_response.get_json())
            mock_openai.assert_called_once_with(api_key="fake_api_key")
            mock_openai.return_value.chat.completions.create.assert_called_once()

    @patch("remotecalls.openai_facade.OpenAI")
    @patch.dict(
        "os.environ",
        {
            "OPENAI_API_KEY": "fake_api_key",
            "FINED_TUNED_MODEL": "fake_fine_tuned_model",
            "OPENAI_SYSTEM_MESSAGE": "System message",
        },
    )
    def test_get_gpt4_response_error(self, mock_openai):
        with self.app.app_context():
            mock_openai.return_value.chat.completions.create.side_effect = RuntimeError(
                "Boom!"
            )

            facade = OpenAIFacade()
            response = facade.get_gpt4_response("Hello")

            expected_response = make_response(
                jsonify(
                    {"message": "Failed to return LLM Response, Boom!", "code": "ERROR"}
                ),
                404,
            )

            self.assertEqual(response.get_json(), expected_response.get_json())


if __name__ == "__main__":
    unittest.main()

from openai import OpenAI
import openai
import os
import logging
from flask import jsonify, make_response


class OpenAIFacade:
    def __init__(self):
        self.client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
        self.logger = logging.getLogger(__name__)
        self.system_message = os.environ["OPENAI_SYSTEM_MESSAGE"]

    def parse_response(self, response):
        try:
            tips = list(map(lambda text: text[3:], response.split("\n")))
            data = {"message": tips, "code": "SUCCESS"}
            return make_response(jsonify(data), 200)

        except Exception as e:
            return e

    def get_gpt4_response(self, prompt):
        fine_tuned_model = os.environ["FINED_TUNED_MODEL"]
        try:
            response = self.client.chat.completions.create(
                model=fine_tuned_model,
                messages=[
                    {"role": "system", "content": self.system_message},
                    {"role": "user", "content": prompt},
                ],
            )
            content = response.choices[0].message.content.strip()
            return self.parse_response(content)

        except Exception as e:
            print("Failed to get gpt4 response from OpenAI, ", e)
            data = {"message": f"Failed to return LLM Response, {e}", "code": "ERROR"}
            return make_response(jsonify(data), 404)

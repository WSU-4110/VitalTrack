import random
from typing import List


class Utils:
    @staticmethod
    def add_numbers(a: int, b: int) -> int:
        return a + b

    @staticmethod
    def is_palindrome(word: str) -> bool:
        cleaned_word = ''.join(filter(str.isalnum, word)).lower()
        return cleaned_word == cleaned_word[::-1]

    @staticmethod
    def get_random_element(elements: List) -> any:
        if not elements:
            raise ValueError("The list is empty")
        return random.choice(elements)

    @staticmethod
    def count_vowels(s: str) -> int:
        return sum(1 for char in s.lower() if char in "aeiou")

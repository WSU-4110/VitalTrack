import unittest
from unittest.mock import patch
from utils.utils import Utils


class TestUtils(unittest.TestCase):

    def test_add_numbers(self):
        result = Utils.add_numbers(5, 3)
        self.assertEqual(result, 8)

    def test_is_palindrome(self):
        self.assertTrue(Utils.is_palindrome("Madam"))
        self.assertFalse(Utils.is_palindrome("Hello"))

    @patch("random.choice")
    def test_get_random_element(self, mock_choice):
        mock_choice.return_value = "apple"
        result = Utils.get_random_element(["apple", "banana", "cherry"])
        self.assertEqual(result, "apple")
        mock_choice.assert_called_once_with(["apple", "banana", "cherry"])

    def test_get_random_element_empty_list(self):
        with self.assertRaises(ValueError) as context:
            Utils.get_random_element([])
        self.assertEqual(str(context.exception), "The list is empty")

    def test_count_vowels(self):
        self.assertEqual(Utils.count_vowels("hello"), 2)
        self.assertEqual(Utils.count_vowels("rhythm"), 0)
        self.assertEqual(Utils.count_vowels("AEIOU"), 5)


if __name__ == "__main__":
    unittest.main()

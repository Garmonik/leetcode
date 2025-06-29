import unittest

#=======================================================================================================================

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        result = 0
        left_pointer = 0
        char_set = set()

        for right_pointer in range(len(s)):
            while s[right_pointer] in char_set:
                char_set.remove(s[left_pointer])
                left_pointer += 1
            char_set.add(s[right_pointer])
            result = max(result, right_pointer - left_pointer + 1)

        return result

#=======================================================================================================================

class TestSolution(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("abcabcbb"), 3)

    def test_example2(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("bbbbb"), 1)

    def test_example3(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("pwwkew"), 3)

    def test_empty_string(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring(""), 0)

    def test_single_character(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("a"), 1)

    def test_all_unique_characters(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("abcdef"), 6)

    def test_repeating_pattern(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("abcabcabc"), 3)

    def test_mixed_characters(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("aababcdebcbb"), 5)

    def test_long_string(self):
        self.assertEqual(self.solution.lengthOfLongestSubstring("a" * 1000 + "b" * 1000), 2)

if __name__ == '__main__':
    unittest.main()
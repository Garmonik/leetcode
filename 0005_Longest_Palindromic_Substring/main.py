import unittest

#=======================================================================================================================

class Solution:
    def longestPalindrome(self, s: str) -> str:
        tmp_s = '#'.join(f'^{s}$')
        len_tmp_s = len(tmp_s)
        palindrome_radian_list = [0] * len_tmp_s
        left = right = 0

        for i in range(1, len_tmp_s - 1):
            palindrome_radian_list[i] = (right > i) and min(right - i, palindrome_radian_list[2 * left - i])
            tmp = palindrome_radian_list[i]
            while tmp_s[i + 1 + palindrome_radian_list[i]] == tmp_s[i - 1 - palindrome_radian_list[i]]:
                palindrome_radian_list[i] += 1

            if i + palindrome_radian_list[i] > right:
                left, right = i, i + palindrome_radian_list[i]
        max_len, center_index = max((n, i) for i, n in enumerate(palindrome_radian_list))
        return s[(center_index - max_len) // 2: (center_index + max_len) // 2]

#=======================================================================================================================

def is_palindrome(s: str) -> bool:
    return s == s[::-1]


class TestLongestPalindrome(unittest.TestCase):
    def setUp(self):
        self.sol = Solution()

    def test_basic_cases(self):
        test_cases = [
            ("babad", ["bab", "aba"]),
            ("cbbd", ["bb"]),
            ("a", ["a"]),
            ("ac", ["a", "c"]),
        ]

        for s, expected in test_cases:
            with self.subTest(s=s):
                result = self.sol.longestPalindrome(s)
                self.assertTrue(is_palindrome(result))
                self.assertIn(result, expected)
                self.assertEqual(len(result), max(len(x) for x in expected))

    def test_normal_cases(self):
        test_cases = [
            ("racecar", ["racecar"]),
            ("abacdfgdcaba", ["aba"]),
            ("abba", ["abba"]),
            ("abcba", ["abcba"]),
        ]

        for s, expected in test_cases:
            with self.subTest(s=s):
                result = self.sol.longestPalindrome(s)
                self.assertTrue(is_palindrome(result))
                self.assertIn(result, expected)

    def test_edge_cases(self):
        test_cases = [
            ("aaaaaaaaaa", ["aaaaaaaaaa"]),
            ("abcdefghij", ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]),
        ]

        for s, expected in test_cases:
            with self.subTest(s=s):
                result = self.sol.longestPalindrome(s)
                self.assertTrue(is_palindrome(result))
                self.assertIn(result, expected)

    def test_long_strings(self):
        test_cases = [
            ("a" * 1000, ["a" * 1000]),
            ("a" + "b" * 998 + "a", ["a" + "b" * 998 + "a"]),
            ("abcba" * 200, ["abcba" * 200]),
            ("x" + "y" * 998 + "x", ["x" + "y" * 998 + "x"]),
            ("abcdcba" * 100, ["abcdcba" * 100]),
            ("a" * 999 + "b", ["a" * 999]),
            ("z" + "a" * 999, ["a" * 999]),
        ]

        for s, expected in test_cases:
            with self.subTest(s=s):
                result = self.sol.longestPalindrome(s)
                self.assertTrue(is_palindrome(result))
                self.assertIn(result, expected)

        for s, expected_len in test_cases:
            with self.subTest(s=s):
                result = self.sol.longestPalindrome(s)
                self.assertTrue(is_palindrome(result))


if __name__ == '__main__':
    unittest.main(verbosity=2)
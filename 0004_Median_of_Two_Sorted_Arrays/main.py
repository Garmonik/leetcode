import math
import unittest
from typing import List


class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        len1, len2 = len(nums1), len(nums2)
        left, right = 0, len1

        if len1 > len2:
            return self.findMedianSortedArrays(nums2, nums1)

        while left <= right:
            part1 = (left + right) // 2
            part2 = (len1 + len2 + 1) // 2 - part1

            max_left1 = float('-inf') if part1 == 0 else nums1[part1 - 1]
            min_right1 = float('inf') if part1 == len1 else nums1[part1]
            max_left2 = float('-inf') if part2 == 0 else nums2[part2 - 1]
            min_right2 = float('inf') if part2 == len2 else nums2[part2]

            if max_left1 <= min_right2 and max_left2 <= min_right1:
                if (len1 + len2) % 2 == 0:
                    return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2
                else:
                    return max(max_left1, max_left2)
            elif max_left1 > min_right2:
                right = part1 - 1
            else:
                left = part1 + 1
        return 0.0

class TestSolution(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        nums1 = [1, 3]
        nums2 = [2]
        expected = 2.0
        self.assertEqual(self.solution.findMedianSortedArrays(nums1, nums2), expected)

    def test_example2(self):
        nums1 = [1, 2]
        nums2 = [3, 4]
        expected = 2.5
        self.assertEqual(self.solution.findMedianSortedArrays(nums1, nums2), expected)

    def test_empty_first_array(self):
        nums1 = []
        nums2 = [1, 2, 3]
        expected = 2.0
        self.assertEqual(self.solution.findMedianSortedArrays(nums1, nums2), expected)

    def test_empty_second_array(self):
        nums1 = [1, 2, 3]
        nums2 = []
        expected = 2.0
        self.assertEqual(self.solution.findMedianSortedArrays(nums1, nums2), expected)

    def test_both_arrays_empty(self):
        nums1 = []
        nums2 = []
        result = self.solution.findMedianSortedArrays(nums1, nums2)
        self.assertTrue(math.isnan(result))

    def test_single_element_each(self):
        nums1 = [1]
        nums2 = [2]
        expected = 1.5
        self.assertEqual(self.solution.findMedianSortedArrays(nums1, nums2), expected)

    def test_duplicate_elements(self):
        nums1 = [1, 1, 1]
        nums2 = [1, 1, 1]
        expected = 1.0
        self.assertEqual(self.solution.findMedianSortedArrays(nums1, nums2), expected)

    def test_negative_numbers(self):
        nums1 = [-5, -3, -1]
        nums2 = [-4, -2, 0]
        expected = -2.5
        self.assertEqual(self.solution.findMedianSortedArrays(nums1, nums2), expected)

    def test_mixed_positive_negative(self):
        nums1 = [-2, 0, 1]
        nums2 = [-1, 2, 3]
        expected = 0.5
        self.assertEqual(self.solution.findMedianSortedArrays(nums1, nums2), expected)

    def test_large_numbers(self):
        nums1 = [1000000, 2000000]
        nums2 = [3000000, 4000000]
        expected = 2500000.0
        self.assertEqual(self.solution.findMedianSortedArrays(nums1, nums2), expected)

    def test_unsorted_but_merged_sorted(self):
        nums1 = [5, 10]
        nums2 = [1, 20]
        expected = 7.5
        self.assertEqual(self.solution.findMedianSortedArrays(nums1, nums2), expected)

    def test_one_array_larger_than_other(self):
        nums1 = [1, 3, 5, 7, 9]
        nums2 = [2, 4]
        expected = 4.0
        self.assertEqual(self.solution.findMedianSortedArrays(nums1, nums2), expected)

if __name__ == '__main__':
    unittest.main()

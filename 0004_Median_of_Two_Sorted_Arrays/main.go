package main

import (
	"fmt"
	"math"
)

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
	len1, len2 := len(nums1), len(nums2)

	if len1 > len2 {
		return findMedianSortedArrays(nums2, nums1)
	}

	left, right := 0, len1

	for left <= right {
		part1 := (left + right) / 2
		part2 := (len1 + len2 + 1)/2 - part1

		var maxLeft1, minRight1, maxLeft2, minRight2 int

		if part1 == 0 {
			maxLeft1 = math.MinInt32
		} else {
			maxLeft1 = nums1[part1-1]
		}

		if part1 == len1 {
			minRight1 = math.MaxInt32
		} else {
			minRight1 = nums1[part1]
		}

		if part2 == 0 {
			maxLeft2 = math.MinInt32
		} else {
			maxLeft2 = nums2[part2-1]
		}

		if part2 == len2 {
			minRight2 = math.MaxInt32
		} else {
			minRight2 = nums2[part2]
		}

		if maxLeft1 <= minRight2 && maxLeft2 <= minRight1 {
			if (len1+len2)%2 == 0 {
				return float64(max(maxLeft1, maxLeft2)+min(minRight1, minRight2)) / 2.0
			}
			return float64(max(maxLeft1, maxLeft2))
		} else if maxLeft1 > minRight2 {
			right = part1 - 1
		} else {
			left = part1 + 1
		}
	}

	return 0.0
}

func main() {
	testCases := []struct {
		nums1    []int
		nums2    []int
		expected float64
	}{
		{[]int{1, 3}, []int{2}, 2.0},
		{[]int{1, 2}, []int{3, 4}, 2.5},
		{[]int{}, []int{1, 2, 3}, 2.0},
		{[]int{1, 2, 3}, []int{}, 2.0},
		{[]int{}, []int{}, 0.0},
		{[]int{1}, []int{2}, 1.5},
		{[]int{1, 1, 1}, []int{1, 1, 1}, 1.0},
		{[]int{-5, -3, -1}, []int{-4, -2, 0}, -2.5},
		{[]int{-2, 0, 1}, []int{-1, 2, 3}, 0.5},
		{[]int{1000000, 2000000}, []int{3000000, 4000000}, 2500000.0},
		{[]int{1, 3, 5, 7, 9}, []int{2, 4}, 4.0},
	}

	for _, tc := range testCases {
		result := findMedianSortedArrays(tc.nums1, tc.nums2)
		if !almostEqual(result, tc.expected) {
			fmt.Printf("FAIL: nums1=%v, nums2=%v, expected=%v, got=%v\n",
				tc.nums1, tc.nums2, tc.expected, result)
		} else {
			fmt.Printf("PASS: nums1=%v, nums2=%v -> %v\n",
				tc.nums1, tc.nums2, result)
		}
	}
}

func almostEqual(a, b float64) bool {
	const epsilon = 1e-10
	if math.IsNaN(a) && math.IsNaN(b) {
		return true
	}
	return math.Abs(a-b) < epsilon
}
package main

import (
	"fmt"
	"reflect"
)

//=======================================================================================================================

func twoSum(nums []int, target int) []int {
	hashMap := make(map[int]int)
	for i, num := range nums {
		rimmed := target - num
		index, exists := hashMap[rimmed]
		if exists {
			return []int{index, i}
		}
		hashMap[num] = i
	}
	return nil
}

//=======================================================================================================================

func colorize(text string, colorCode string) string {
	return fmt.Sprintf("\033[%sm%s\033[0m", colorCode, text)
}

func printTestHeader() {
	header := "🚀 Testing twoSum Implementation"
	line := "="
	for i := 0; i < len(header); i++ {
		line += "="
	}

	fmt.Printf("\n%s\n", line)
	fmt.Println(header)
	fmt.Printf("%s\n\n", line)
}

func printTestCase(nums []int, target int, expected, result []int, status string) {
	cyan := "36"  // ANSI cyan
	green := "32" // ANSI green
	red := "31"   // ANSI red

	fmt.Printf("%s nums = %v, target = %d\n",
		colorize("➡ Test Case:", cyan), nums, target)
	fmt.Printf("   Expected: %v\n", expected)
	fmt.Printf("   Received: %v\n", result)

	color := green
	if status == "FAILED" {
		color = red
	}
	fmt.Printf("   Status: %s\n", colorize(status, color))
	fmt.Println("------------------------------------------------------------")
}

func testTwoSum() {
	type testCase struct {
		nums     []int
		target   int
		expected []int
	}

	testCases := []testCase{
		// Basic cases
		{[]int{2, 7, 11, 15}, 9, []int{0, 1}},
		{[]int{3, 2, 4}, 6, []int{1, 2}},
		{[]int{3, 3}, 6, []int{0, 1}},

		// Normal cases
		{[]int{1, 2, 3, 4}, 7, []int{2, 3}},
		{[]int{-1, -2, -3, -4}, -6, []int{1, 3}},
		{[]int{0, 4, 3, 0}, 0, []int{0, 3}},
		{[]int{1, 2, 3}, 5, []int{1, 2}},

		// Edge cases
		{[]int{}, 5, nil},
		{[]int{1}, 1, nil},

		// Additional cases
		{[]int{10, 20, 30, 40, 50}, 90, []int{3, 4}},
		{[]int{1, 1, 1, 1, 1}, 2, []int{0, 1}},
	}

	printTestHeader()

	passed := 0
	failed := 0

	for _, tc := range testCases {
		result := twoSum(tc.nums, tc.target)

		var status string
		if reflect.DeepEqual(result, tc.expected) {
			status = "PASSED"
			passed++
		} else {
			status = "FAILED"
			failed++
		}

		printTestCase(tc.nums, tc.target, tc.expected, result, status)
	}

	total := passed + failed
	fmt.Printf("\n📊 Test Results Summary:\n")
	fmt.Printf("%s PASSED: %d/%d\n", colorize("✅", "32"), passed, total)
	fmt.Printf("%s FAILED: %d/%d\n", colorize("❌", "31"), failed, total)

	if failed == 0 {
		fmt.Printf("\n%s\n", colorize("🎉 All test cases passed successfully!", "32;1"))
	} else {
		fmt.Printf("\n%s\n", colorize("⚠ Some tests failed. Please review the output.", "33;1"))
	}
}

func main() {
	testTwoSum()
}

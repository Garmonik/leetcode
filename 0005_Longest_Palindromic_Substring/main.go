package main

import (
	"fmt"
	"strings"
)

//=======================================================================================================================

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func longestPalindrome(s string) string {
	tmpS := "^#" + strings.Join(strings.Split(s, ""), "#") + "#$"
	lenTmpS := len(tmpS)
	palindromeRadianList := make([]int, lenTmpS)
	left, right := 0, 0
	maxLen := 0
	centerIndex := 0

	for i := 1; i < lenTmpS-1; i++ {
		if right > i {
			palindromeRadianList[i] = min(right-i, palindromeRadianList[2*left-i])
		}

		for tmpS[i+1+palindromeRadianList[i]] == tmpS[i-1-palindromeRadianList[i]] {
			palindromeRadianList[i]++
		}

		if i+palindromeRadianList[i] > right {
			left, right = i, i+palindromeRadianList[i]
		}
	}
	for i, v := range palindromeRadianList {
		if v > maxLen {
			maxLen = v
			centerIndex = i
		}
	}
	return s[(centerIndex-maxLen)/2 : (centerIndex+maxLen)/2]
}

//=======================================================================================================================

func colorize(text string, colorCode string) string {
	return fmt.Sprintf("\033[%sm%s\033[0m", colorCode, text)
}

func printTestHeader() {
	header := "🚀 Testing longestPalindrome Implementation"
	line := "="
	for i := 0; i < len(header); i++ {
		line += "="
	}

	fmt.Printf("\n%s\n", line)
	fmt.Println(header)
	fmt.Printf("%s\n\n", line)
}

func printTestCase(s string, expected, result string, status string) {
	cyan := "36"  // ANSI cyan
	green := "32" // ANSI green
	red := "31"   // ANSI red

	fmt.Printf("%s s = %s\n",
		colorize("➡ Test Case:", cyan), s)
	fmt.Printf("   Expected: %s\n", expected)
	fmt.Printf("   Received: %s\n", result)

	color := green
	if status == "FAILED" {
		color = red
	}
	fmt.Printf("   Status: %s\n", colorize(status, color))
	fmt.Println("------------------------------------------------------------")
}

func testLongestPalindrome() {
	type testCase struct {
		s        string
		expected string
	}

	testCases := []testCase{
		// Basic cases
		{"babad", "bab"}, // "aba" is also valid
		{"cbbd", "bb"},
		{"a", "a"},
		{"ac", "a"},

		// Normal cases
		{"racecar", "racecar"},
		{"abacdfgdcaba", "aba"},
		{"abba", "abba"},
		{"abcba", "abcba"},

		// Edge cases
		{"", ""},
		{"aaaaaaaaaa", "aaaaaaaaaa"},
		{"abcdefghij", "a"},

		// Long strings
		{strings.Repeat("a", 1000), strings.Repeat("a", 1000)},
		{strings.Repeat("ab", 500), strings.Repeat("a", 1)},
		{"a" + strings.Repeat("b", 998) + "a", "a" + strings.Repeat("b", 998) + "a"},
		{strings.Repeat("abcba", 200), strings.Repeat("abcba", 200)},
		{strings.Repeat("abac", 250), "aba"},
		{"x" + strings.Repeat("y", 998) + "x", "x" + strings.Repeat("y", 998) + "x"},
		{strings.Repeat("abcdcba", 100), strings.Repeat("abcdcba", 100)},
		{strings.Repeat("a", 999) + "b", strings.Repeat("a", 999)},
		{strings.Repeat("abababab", 125), "abababa"}, // "bababab" is also valid
		{"z" + strings.Repeat("a", 999), strings.Repeat("a", 999)},
	}

	printTestHeader()

	passed := 0
	failed := 0

	for _, tc := range testCases {
		result := longestPalindrome(tc.s)

		var status string
		if isPalindrome(result) && (len(result) == len(tc.expected) ||
			(len(tc.expected) > 0 && len(result) >= len(tc.expected))) {
			status = "PASSED"
			passed++
		} else {
			status = "FAILED"
			failed++
		}

		printTestCase(tc.s, tc.expected, result, status)
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

func isPalindrome(s string) bool {
	for i := 0; i < len(s)/2; i++ {
		if s[i] != s[len(s)-1-i] {
			return false
		}
	}
	return true
}

func main() {
	testLongestPalindrome()
}

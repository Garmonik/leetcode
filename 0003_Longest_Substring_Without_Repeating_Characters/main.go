package main

import (
	"fmt"
)

//=======================================================================================================================

func lengthOfLongestSubstring(s string) int {
	result := 0
	leftPointer := 0
	charSet := make(map[byte]bool)

	for rightPointer := 0; rightPointer < len(s); rightPointer++ {
		currentChar := s[rightPointer]
		for charSet[currentChar] {
			delete(charSet, s[leftPointer])
			leftPointer++
		}
		charSet[currentChar] = true
		windowSize := rightPointer - leftPointer + 1
		if windowSize > result {
			result = windowSize
		}
	}
	return result
}

//=======================================================================================================================

func runTests() {
	tests := []struct {
		name     string
		input    string
		expected int
	}{
		{"example1", "abcabcbb", 3},
		{"example2", "bbbbb", 1},
		{"example3", "pwwkew", 3},
		{"empty string", "", 0},
		{"single character", "a", 1},
		{"all unique characters", "abcdef", 6},
		{"repeating pattern", "abcabcabc", 3},
		{"mixed characters", "aababcdebcbb", 5},
		{"long string", string(make([]byte, 1000)) + "b", 2},
	}

	for _, tt := range tests {
		result := lengthOfLongestSubstring(tt.input)
		if result != tt.expected {
			fmt.Printf("FAIL: %s(%q) = %d, expected %d\n", tt.name, tt.input, result, tt.expected)
		} else {
			fmt.Printf("PASS: %s\n", tt.name)
		}
	}
}

func main() {
	runTests()
}

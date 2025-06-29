package main

import (
	"fmt"
	"os"
)

//=======================================================================================================================

type ListNode struct {
	Val  int
	Next *ListNode
}

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	dummy := &ListNode{}
	teil := dummy
	carry := 0
	for l1 != nil || l2 != nil || carry != 0 {
		val1 := 0
		val2 := 0

		if l1 != nil {
			val1 = l1.Val
			l1 = l1.Next
		}
		if l2 != nil {
			val2 = l2.Val
			l2 = l2.Next
		}

		sum := val1 + val2 + carry
		carry = sum / 10
		teil.Next = &ListNode{sum % 10, nil}
		teil = teil.Next
	}
	return dummy.Next
}

//=======================================================================================================================

func createLinkedList(nums []int) *ListNode {
	dummy := &ListNode{}
	current := dummy
	for _, num := range nums {
		current.Next = &ListNode{Val: num}
		current = current.Next
	}
	return dummy.Next
}

func linkedListToSlice(head *ListNode) []int {
	var result []int
	for head != nil {
		result = append(result, head.Val)
		head = head.Next
	}
	return result
}

func slicesEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func runTests() {
	tests := []struct {
		name     string
		l1       *ListNode
		l2       *ListNode
		expected []int
	}{
		{
			name:     "Example 1",
			l1:       createLinkedList([]int{2, 4, 3}),
			l2:       createLinkedList([]int{5, 6, 4}),
			expected: []int{7, 0, 8},
		},
		{
			name:     "Example 2",
			l1:       createLinkedList([]int{0}),
			l2:       createLinkedList([]int{0}),
			expected: []int{0},
		},
		{
			name:     "Example 3",
			l1:       createLinkedList([]int{9, 9, 9, 9, 9, 9, 9}),
			l2:       createLinkedList([]int{9, 9, 9, 9}),
			expected: []int{8, 9, 9, 9, 0, 0, 0, 1},
		},
		{
			name:     "Different lengths",
			l1:       createLinkedList([]int{1, 8}),
			l2:       createLinkedList([]int{0}),
			expected: []int{1, 8},
		},
		{
			name:     "With carry",
			l1:       createLinkedList([]int{9, 9}),
			l2:       createLinkedList([]int{1}),
			expected: []int{0, 0, 1},
		},
		{
			name:     "Large numbers",
			l1:       createLinkedList([]int{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1}),
			l2:       createLinkedList([]int{5, 6, 4}),
			expected: []int{6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 1},
		},
	}

	failed := false
	for _, tt := range tests {
		result := addTwoNumbers(tt.l1, tt.l2)
		actual := linkedListToSlice(result)
		if !slicesEqual(actual, tt.expected) {
			fmt.Printf("❌ Тест '%s' не пройден: получено %v, ожидалось %v\n", tt.name, actual, tt.expected)
			failed = true
		} else {
			fmt.Printf("✅ Тест '%s' пройден\n", tt.name)
		}
	}

	if failed {
		fmt.Println("\n❌ Некоторые тесты не прошли")
		os.Exit(1)
	} else {
		fmt.Println("\n✅ Все тесты прошли успешно")
	}
}

func main() {
	runTests()
}

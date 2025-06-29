import unittest
from typing import Optional

#=======================================================================================================================

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        tail = dummy
        carry = 0
        while l1 is not None or l2 is not None or carry != 0:
            val1 = l1.val if l1 is not None else 0
            val2 = l2.val if l2 is not None else 0
            newNode = ListNode((val1 + val2 + carry) % 10)
            tail.next = newNode
            tail = tail.next
            carry = (val1 + val2 + carry) // 10
            l1 = l1.next if l1 is not None else None
            l2 = l2.next if l2 is not None else None
        result = dummy.next
        dummy.next = None
        return result

#=======================================================================================================================

def create_linked_list(lst):
    dummy = ListNode()
    current = dummy
    for num in lst:
        current.next = ListNode(num)
        current = current.next
    return dummy.next

def linked_list_to_list(node):
    result = []
    while node is not None:
        result.append(node.val)
        node = node.next
    return result

class TestAddTwoNumbers(unittest.TestCase):
    def setUp(self):
        self.solution = Solution()

    def test_example1(self):
        l1 = create_linked_list([2, 4, 3])
        l2 = create_linked_list([5, 6, 4])
        result = self.solution.addTwoNumbers(l1, l2)
        self.assertEqual(linked_list_to_list(result), [7, 0, 8])

    def test_example2(self):
        l1 = create_linked_list([0])
        l2 = create_linked_list([0])
        result = self.solution.addTwoNumbers(l1, l2)
        self.assertEqual(linked_list_to_list(result), [0])

    def test_example3(self):
        l1 = create_linked_list([9, 9, 9, 9, 9, 9, 9])
        l2 = create_linked_list([9, 9, 9, 9])
        result = self.solution.addTwoNumbers(l1, l2)
        self.assertEqual(linked_list_to_list(result), [8, 9, 9, 9, 0, 0, 0, 1])

    def test_different_lengths(self):
        l1 = create_linked_list([1, 8])
        l2 = create_linked_list([0])
        result = self.solution.addTwoNumbers(l1, l2)
        self.assertEqual(linked_list_to_list(result), [1, 8])

    def test_with_carry(self):
        l1 = create_linked_list([9, 9])
        l2 = create_linked_list([1])
        result = self.solution.addTwoNumbers(l1, l2)
        self.assertEqual(linked_list_to_list(result), [0, 0, 1])

    def test_large_numbers(self):
        l1 = create_linked_list([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
        l2 = create_linked_list([5, 6, 4])
        result = self.solution.addTwoNumbers(l1, l2)
        self.assertEqual(linked_list_to_list(result), [6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 1])

if __name__ == '__main__':
    unittest.main()

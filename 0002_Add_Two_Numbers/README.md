# [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/ "Problem")

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in 
**reverse order**, and each of their nodes contains a single digit. Add the two numbers and 
return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example 1:**

![Описание изображения](img.png) 
> **Input**: l1 = [2,4,3], l2 = [5,6,4]
> 
> **Output**: [7,0,8]
> 
> **Explanation**: 342 + 465 = 807.

**Example 2:**
> **Input**: l1 = [0], l2 = [0]
> 
> **Output**: [0]

**Example 3:**
> **Input**: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
> 
> **Output**: [8,9,9,9,0,0,0,1]

**Constraints:**
+ The number of nodes in each linked list is in the range ```[1, 100]```.
+ ```0 <= Node.val <= 9```
+ It is guaranteed that the list represents a number that does not have leading zeros.

## Solutions
- [x] Python3
- [x] Go
- [x] JavaScript

## Algorithm

The most obvious solution to this problem is to iterate through all pairs of numbers to find the desired pair, which is time-consuming since the algorithm's time complexity is ```O(n²)```. For small array lengths, this is not critical, but in the worst case, the array length could be ```10⁴```, resulting in a loop with ```10⁸``` iterations, which is very slow.

To solve this problem, we can devise an algorithm with a time complexity of ```O(n²)```, significantly improving performance. We'll use a hash table for this solution. Here’s the step-by-step approach:
1) Calculate `rimmed = target - num`.
2) Check if `rimmed` was previously a key in our hash table. If not, store a new entry in the table with `num` as the key and its array index as the value. If `rimmed` already exists as a key, return the current number's index and the index stored under the `rimmed` key.

This approach achieves a time complexity of ```O(n)```, with a space complexity of ```O(n)```.  
If we had used the brute-force method, the space complexity would have been ```O(1)```.
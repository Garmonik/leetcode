# [1. Two Sum](https://leetcode.com/problems/two-sum/ "Problem")

Given an array of integers ```nums``` and an integer ```target```, return *indices of the two numbers 
such that they add up* to ```target```.

You may assume that each input would have **exactly one solution**, and you may not use the *same element twice*.

You can return the answer in any order.

**Example 1:**
> **Input**: nums = [2,7,11,15], target = 9
> 
> **Output**: [0,1]
> 
> **Explanation**: Because nums[0] + nums[1] == 9, we return [0, 1].

**Example 2:**
> **Input**: nums = [3,2,4], target = 6
> 
> **Output**: [1,2]

**Example 3:**
> **Input**: nums = [3,3], target = 6
> 
> **Output**: [0,1]

**Constraints:**
+ ```2 <= nums.length <= 10⁴```
+ ```-10⁹ <= nums[i] <= 10⁹```
+ ```-10⁹ <= target <= 10⁹```
+ **Only one valid answer exists.**

**Follow-up**: Can you come up with an algorithm that is less than ```O(n²)``` time complexity?

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
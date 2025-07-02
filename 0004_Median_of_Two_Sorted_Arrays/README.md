# [4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/ "Problem")

Given two sorted arrays ```nums1``` and ```nums2``` of size ```m``` and ```n``` respectively, return **the median** of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

**Example 1:** 

> **Input**: nums1 = [1,3], nums2 = [2]
> 
> **Output**: 2.00000
> 
> **Explanation**: merged array = [1,2,3] and median is 2.

**Example 2:**
> **Input**: nums1 = [1,2], nums2 = [3,4]
>
> **Output**: 2.50000
>
> **Explanation**: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

**Constraints:**
+ ```nums1.length == m```
+ ```nums2.length == n```
+ ```0 ≤ m ≤ 1000```
+ ```0 ≤ n ≤ 1000```
+ ```1 ≤ m + n ≤ 2000```
+ ```-10⁶ ≤ nums1[i], nums2[i] ≤ 10⁶```

## Solutions
- [x] Python3
- [x] Go
- [x] JavaScript

## Algorithm
### An obvious case
The most obvious solution to the problem is to merge the two arrays, sort them, and then determine the median 
of the combined array. However, this approach has a time complexity of **O((n + m) * log(n + m))**, 
making it unsuitable for our requirements.

```pycon
class Solution:
    def findMedianSortedArrays(self, nums1, nums2):
        merged = nums1 + nums2
        merged.sort()
        total = len(merged)
        
        if total % 2 == 1:
            return float(merged[total // 2])
        else:
            middle1 = merged[total // 2 - 1]
            middle2 = merged[total // 2]
            return (float(middle1) + float(middle2)) / 2.0
```

### Optimized Approach: Binary Search

To achieve the desired time complexity of **O(log(n + m))**, we use a **binary search** algorithm.

#### Key Idea

1) **Partitioning:**

    Split both arrays into two parts such that:
    * The **left parts** can form the left half of the merged array (values ≤ median).
    * The **right parts** can form the right half (values ≥ median).

        The partition point is found via binary search.
2) **Median Calculation:**

    * If the total length is **odd**, the median is the maximum value in the left partition.
    * If **even**, it’s the average of the max-left and min-right values.

#### Algorithm Steps
1) **Select the Smaller Array:**
    
    Perform binary search on the smaller array for efficiency.
2) **Define Partitions:**

    * For ```nums1``` (length ```len1```), partition at ```part1 = (left + right) // 2```.
    * For ```nums2``` (length ```len2```), partition at:
    ```python
    part2 = (len1 + len2 + 1) // 2 - part1
    ```
   The ```+1``` ensures correct handling for both odd/even lengths.
3) **Check Validity:**
    * Calculate ```max_left1```, ```min_right1``` (from ```nums1```).
    * Calculate ```max_left2```, ```min_right2``` (from ```nums2```).
    * The partition is valid if:
    ```python
    max_left1 <= min_right2 and max_left2 <= min_right1
    ```
4) **Adjust Search Boundaries:**
    * If ```max_left1 > min_right2```, move ```right = part1 - 1```.
    * Else, move ```left = part1 + 1```.
5) **Compute Median:**
    * **Odd length**: ```max(max_left1, max_left2)```.
    * **Even length**: ```(max(max_left1, max_left2) + min(min_right1, min_right2)) / 2```.

### Example Walkthrough
**Input:**
```nums1 = [1, 3, 8]```, ```nums2 = [7, 9, 10, 11]```

1) **Initial Setup:**
    * ```len1 = 3```, ```len2 = 4``` → Total length = 7 (odd).
    * Binary search bounds: ```left = 0```, ```right = 3```.
2) **First Partition:**
    * ```part1 = 1``` → ```nums1 = [1 | 3, 8]```.
    * ```part2 = 3``` → ```nums2 = [7, 9, 10 | 11]```.
    * Check: ```1 ≤ 11``` (True), but ```10 ≤ 3``` (False) → Adjust ```left = 2```.
3) **Second Partition:**
    * ```part1 = 2``` → ```nums1 = [1, 3 | 8]```.
    * ```part2 = 2``` → ```nums2 = [7, 9 | 10, 11]```.
    * Check: ```3 ≤ 10``` (True), but ```9 ≤ 8``` (False) → Adjust ```left = 3```.
4) **Final Partition:**
    * ```part1 = 3``` → ```nums1 = [1, 3, 8 | ]```.
    * ```part2 = 1``` → ```nums2 = [7 | 9, 10, 11]```.
    * Check: ```8 ≤ 9``` (True) and ```7 ≤ ∞``` (True).
    * Median: ```max(8, 7) = 8```.

### Edge Case: Even Length

**Input**: ```nums1 = [1, 2]```, ```nums2 = [3, 4]```
* **Partition:**

    ```nums1 = [1, 2 | ]```, ```nums2 = [ | 3, 4]```.
* **Median**: ```(max(2, -∞) + min(∞, 3)) / 2 = (2 + 3) / 2 = 2.5```.

This approach efficiently narrows down the search space, ensuring optimal performance.


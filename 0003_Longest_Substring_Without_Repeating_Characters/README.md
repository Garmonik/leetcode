# [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/ "Problem")

Given a string s, find the length of the longest ```substring``` without duplicate characters.

(Substring — A substring is a contiguous non-empty sequence of characters within a string.)

**Example 1:** 

> **Input**: s = "abcabcbb"
> 
> **Output**: 3
> 
> **Explanation**: The answer is "abc", with the length of 3.

**Example 2:**
> **Input**: s = "bbbbb"
>
> **Output**: 1
>
> **Explanation**: The answer is "b", with the length of 1.

**Example 3:**
> **Input**: s = "pwwkew"
>
> **Output**: 3
>
> **Explanation**: The answer is "wke", with the length of 3.
> 
> Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.


**Constraints:**
+ ```0 <= s.length <= 5 * 10⁴```
+ ```s``` consists of English letters, digits, symbols and spaces.

## Solutions
- [x] Python3
- [x] Go
- [x] JavaScript

## Algorithm

To solve this algorithm, we'll use the **two-pointer method**:

1) **Initialize pointers:**
   * Set both the ```left``` and ```right``` pointers to the **start of the string**.
2) **Outer loop:**
   * Iterate until the ```right``` pointer reaches the end of the string.
3) **Inner loop:**

    * For each position of ```right```, check if the current character exists in ```char_set```:
      * **If present:**
      
        Remove the character at the ```left``` pointer from ```char_set``` and **increment** ```left```.

      * **If absent:**
      
        Add the character to ```char_set```.

   * This ensures the window ```[left, right]``` always contains **unique characters**.

4) **Track the maximum length:**
   * Update ```result``` by comparing its current value with the size of ```char_set```: 
   ```python
   result = max(result, len(char_set))
   ```

# [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/ "Problem")

Given a string s, return the *longest* palindromic substring in ```s```.
 

palindromic substring — a string is **palindromic** if it reads the same forward and backward.

**Example 1:** 

> **Input**: s = "babad"
> 
> **Output**: "bab"
> 
> **Explanation**: "aba" is also a valid answer.

**Example 2:**
> **Input**: s = "cbbd"
>
> **Output**: "bb"

**Constraints:**
+ ```1 <= s.length <= 1000```
+ ```s``` consist of only digits and English letters.

## Solutions
- [x] Python3
- [x] Go
- [ ] JavaScript

## Algorithm

### brute-force
The simplest approach that comes to mind is to iterate through all possible string combinations and check if any of 
them is a palindrome, while storing the longest palindrome found. However, this approach leads to very high time 
complexity. Let's calculate the time complexity of this algorithm:

1) Selecting all possible starting positions - ```O(n)```  
2) Selecting all possible ending positions - ```O(n)``` (already ```O(n) * O(n) = O(n²)```)  
3) Checking each substring - ```O(n)``` 

As a result, we see that the time complexity is ```O(n³)```. Therefore, we discard this solution because it's too 
slow, even though its space complexity is ```O(1)```.

### "palindrome center" method
Let's try to avoid mindless string selection. Instead, we'll iterate through the string and form palindromes not from 
the ends but from the center (the "palindrome center" method). The main challenge with this approach is handling 
the cases of even-length (e.g., **"abba"**) and odd-length (**"abcba"**) palindromes separately. This method allows 
selecting an arbitrary palindrome center and checking characters to the left and right of this center until 
the characters no longer match.

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        ans, n = s[0], len(s)
        for i in range(n):
            j = 0
            while i-j >= 0 and i+1+j < n and s[i-j] == s[i+j+1]:
                ans = s[i-j:i+j+2] if j * 2 + 2 > len(ans) else ans
                j += 1
            j = 0
            while i-j >= 0 and i+j < n and s[i-j] == s[i+j]:
                ans = s[i-j: i+j+1] if j * 2 + 1 > len(ans) else ans
                j += 1
        return ans
```
Here's an example of this approach in Python. We separately handle even and odd palindromes. This method works 
faster because we only need to traverse the string once to check all possible palindrome centers (```O(n)```), and for 
each center, we may traverse the entire string in the worst case to verify if the substring is a palindrome 
(another ```O(n)```).

Thus, the time complexity is ```O(n²)```, and the space complexity is ```O(1)```. This is significantly better than 
brute-force enumeration.

### Manacher's Algorithm

Let's try to optimize this algorithm further.
Consider the following scenario: the algorithm has found the shortest green palindrome, the longest blue palindrome, 
and stopped at the letter "i":

![1.png](assets/1.png) 

Looking carefully at the image, we can see that there's no need to process the right side of the blue palindrome. 
By definition, it's a mirror reflection of the left side, so we can simply reflect the left part 
to the right **"for free"**.

![2.png](assets/2.png) 

However, this isn't the only case of overlap. In the next image, the green palindrome crosses the blue palindrome's 
boundary, so its length must be reduced.

![3.png](assets/3.png)

Again, there's no need to double-check the length of the reflected palindrome: the letters ```"b"``` and ```"x"``` 
differ; otherwise, the blue palindrome would have been longer.

Finally, one palindrome may "touch" another from the inside. In this case, there's no 
guarantee that the reflected palindrome isn't longer, as we only get a lower bound for its length:

![4.png](assets/4.png)

Ideally, we should skip both zero and strictly non-zero values (i.e., all cases except the last one) 
in further processing (code 1 below). But in practice (if we can even speak of practice in such an abstract problem), 
the difference between ```≥``` and ```=``` is quite small (just one extra comparison), so it makes sense to consider 
all non-zero values with ```≥``` for brevity and code readability.

This algorithm is called **Manacher's Algorithm**. As a result of its execution, we reduce redundant computations 
and achieve the most optimal result. The algorithm works as follows:

1) Transform the string by inserting ```#``` between every character 
(to handle even and odd palindromes simultaneously).

2) Initialize an array to store the radii of palindromes for each center.

3) Iterate through each character of the transformed string and check if the current 
center is part of a longer palindrome calculated earlier. If so, find its radius from the 
previously found mirrored center (relative to the larger palindrome's center).

4) Handle the case where the palindrome's center might be at the end of a larger palindrome and try to expand the radius 
if step 3 couldn't determine the full palindrome. Additionally, this loop searches for palindromes if the maximum 
palindrome hasn't been found yet or if we've exceeded its boundaries.

5) Finally, select the palindrome with the maximum radius.

Although the code contains two nested loops, it's intuitively clear why the complexity is ```O(n)```. 
Since we initialize an array, the space complexity is ```O(n)```.

Thus, we sacrifice space for time efficiency.

### To explain Manaker's algorithm, I used materials from [Алгоритм поиска самой длинной подстроки-палиндрома](https://habr.com/ru/articles/653617/) (Many thanks to the author for helping me understand this algorithm)
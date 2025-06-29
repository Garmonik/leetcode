//=======================================================================================================================

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let left_pointer = 0;
    let charSet = new Set();
    let result = 0;

    for (let right_pointer = 0; right_pointer < s.length; right_pointer++) {
        while (charSet.has(s[right_pointer])) {
            charSet.delete(s[left_pointer]);
            left_pointer++;
        }

        charSet.add(s[right_pointer])
        result = Math.max(result, right_pointer - left_pointer + 1);
    }
    return result;
}

//=======================================================================================================================

function test() {
  const testCases = [
    { input: "abcabcbb", expected: 3, name: "example1 - 'abcabcbb'" },
    { input: "bbbbb", expected: 1, name: "example2 - 'bbbbb'" },
    { input: "pwwkew", expected: 3, name: "example3 - 'pwwkew'" },
    { input: "", expected: 0, name: "empty string" },
    { input: "a", expected: 1, name: "single character - 'a'" },
    { input: "abcdef", expected: 6, name: "all unique characters - 'abcdef'" },
    { input: "abcabcabc", expected: 3, name: "repeating pattern - 'abcabcabc'" },
    { input: "aababcdebcbb", expected: 5, name: "mixed characters - 'aababcdebcbb'" },
    {
      input: 'a'.repeat(1000) + 'b'.repeat(1000),
      expected: 2,
      name: "long string with two unique chars"
    }
  ];

  let passed = 0;
  const total = testCases.length;

  testCases.forEach(({input, expected, name}) => {
    const result = lengthOfLongestSubstring(input);
    if (result === expected) {
      console.log(`✓ PASSED: ${name}`);
      passed++;
    } else {
      console.log(`✕ FAILED: ${name}`);
      console.log(`  Expected: ${expected}`);
      console.log(`  Received: ${result}`);
    }
  });

  console.log(`\nTest results: ${passed}/${total} passed`);
  if (passed === total) {
    console.log("🎉 All tests passed successfully!");
  } else {
    console.log(`💥 ${total - passed} tests failed`);
  }
}

test();
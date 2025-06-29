from typing import List, Optional
import sys
from termcolor import colored

#=======================================================================================================================

class Solution:
    def twoSum(self, nums: List[int], target: Optional[int]) -> Optional[List[int]]:
        if target is None:
            return None
        hashMap = {}

        for i, num in enumerate(nums):
            if target - num in hashMap:
                return [hashMap[target - num], i]
            hashMap[num] = i
        return None

#=======================================================================================================================

def print_test_header():
    header = "🚀 Testing twoSum Implementation"
    print("\n" + "=" * len(header))
    print(header)
    print("=" * len(header) + "\n")


def print_test_case(nums: List[int], target: Optional[int], expected: Optional[List[int]], result: Optional[List[int]],
                    status: str):
    color = "green" if status == "PASSED" else "red"

    print(colored(f"➡ Test Case: nums = {nums}, target = {target}", "cyan"))
    print(f"   Expected: {expected}")
    print(f"   Received: {result}")
    print(colored(f"   Status: {status}", color))
    print("-" * 60)


def test_twoSum():
    solution = Solution()
    passed = 0
    failed = 0

    test_cases = [
        # Basic cases
        ([2, 7, 11, 15], 9, [0, 1]),
        ([3, 2, 4], 6, [1, 2]),
        ([3, 3], 6, [0, 1]),

        # Normal cases
        ([1, 2, 3, 4], 7, [2, 3]),
        ([-1, -2, -3, -4], -6, [1, 3]),
        ([0, 4, 3, 0], 0, [0, 3]),
        ([1, 2, 3], 5, [1, 2]),

        # Edge cases
        ([], 5, None),
        ([1], 1, None),
        ([1, 2, 3], None, None),

        # Additional cases
        ([10, 20, 30, 40, 50], 90, [3, 4]),
        ([1, 1, 1, 1, 1], 2, [0, 1]),
    ]

    print_test_header()

    for nums, target, expected in test_cases:
        result = solution.twoSum(nums, target)

        if result == expected:
            status = "PASSED"
            passed += 1
        else:
            status = "FAILED"
            failed += 1

        print_test_case(nums, target, expected, result, status)

    total = passed + failed
    print("\n" + "📊 Test Results Summary:")
    print(colored(f"✅ PASSED: {passed}/{total}", "green"))
    print(colored(f"❌ FAILED: {failed}/{total}", "red" if failed else "green"))

    if failed == 0:
        print(colored("\n🎉 All test cases passed successfully!", "green", attrs=["bold"]))
    else:
        print(colored("\n⚠ Some tests failed. Please review the output.", "yellow", attrs=["bold"]))


if __name__ == "__main__":
    try:
        from termcolor import colored
    except ImportError:
        print("Error: termcolor module not found. Please install it with:")
        print("pip install termcolor")
        sys.exit(1)

    test_twoSum()
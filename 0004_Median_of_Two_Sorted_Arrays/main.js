var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }

    const len1 = nums1.length;
    const len2 = nums2.length;
    let left = 0, right = len1;

    while (left <= right) {
        const part1 = Math.floor((left + right) / 2);
        const part2 = Math.floor((len1 + len2 + 1) / 2) - part1;

        const maxLeft1 = part1 === 0 ? -Infinity : nums1[part1 - 1];
        const minRight1 = part1 === len1 ? Infinity : nums1[part1];
        const maxLeft2 = part2 === 0 ? -Infinity : nums2[part2 - 1];
        const minRight2 = part2 === len2 ? Infinity : nums2[part2];

        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((len1 + len2) % 2 === 0) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            right = part1 - 1;
        } else {
            left = part1 + 1;
        }
    }
};

function describe(description, tests) {
    console.log(`\n${description}`);
    tests();
}

function it(description, testFn) {
    try {
        testFn();
        console.log(`  ✓ ${description}`);
    } catch (error) {
        console.error(`  ✗ ${description}`);
        console.error(`    ${error.message}`);
    }
}

function expect(actual) {
    return {
        toBe(expected) {
            if (actual !== expected) {
                throw new Error(`Expected ${expected}, but got ${actual}`);
            }
        },
        toBeCloseTo(expected, precision = 2) {
            const actualRounded = parseFloat(actual.toFixed(precision));
            const expectedRounded = parseFloat(expected.toFixed(precision));
            if (actualRounded !== expectedRounded) {
                throw new Error(`Expected ~${expected}, but got ${actual}`);
            }
        },
        toBeNaN() {
            if (!Number.isNaN(actual)) {
                throw new Error(`Expected NaN, but got ${actual}`);
            }
        }
    };
}

describe('findMedianSortedArrays', () => {
    it('should work with example 1', () => {
        const nums1 = [1, 3];
        const nums2 = [2];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(2.0);
    });

    it('should work with example 2', () => {
        const nums1 = [1, 2];
        const nums2 = [3, 4];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(2.5);
    });

    it('should handle empty first array', () => {
        const nums1 = [];
        const nums2 = [1, 2, 3];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(2.0);
    });

    it('should handle empty second array', () => {
        const nums1 = [1, 2, 3];
        const nums2 = [];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(2.0);
    });

    it('should return NaN for two empty arrays', () => {
        const nums1 = [];
        const nums2 = [];
        expect(findMedianSortedArrays(nums1, nums2)).toBeNaN();
    });

    it('should work with single element arrays', () => {
        const nums1 = [1];
        const nums2 = [2];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(1.5);
    });

    it('should handle duplicate elements', () => {
        const nums1 = [1, 1, 1];
        const nums2 = [1, 1, 1];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(1.0);
    });

    it('should work with negative numbers', () => {
        const nums1 = [-5, -3, -1];
        const nums2 = [-4, -2, 0];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(-2.5);
    });

    it('should work with mixed positive and negative numbers', () => {
        const nums1 = [-2, 0, 1];
        const nums2 = [-1, 2, 3];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(0.5);
    });

    it('should work with large numbers', () => {
        const nums1 = [1000000, 2000000];
        const nums2 = [3000000, 4000000];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(2500000.0);
    });

    it('should work with unsorted arrays that merge to sorted', () => {
        const nums1 = [5, 10];
        const nums2 = [1, 20];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(7.5);
    });

    it('should work when one array is larger than the other', () => {
        const nums1 = [1, 3, 5, 7, 9];
        const nums2 = [2, 4];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(4.0);
    });

    it('should work when all elements in one array are smaller', () => {
        const nums1 = [1, 2, 3];
        const nums2 = [4, 5, 6];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(3.5);
    });

    it('should work with arrays of different lengths', () => {
        const nums1 = [1, 3, 5];
        const nums2 = [2, 4, 6, 8, 10];
        expect(findMedianSortedArrays(nums1, nums2)).toBe(4.5);
    });
});

console.log('\nAll tests completed!');
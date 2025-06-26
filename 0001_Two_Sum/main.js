/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const hashMap = {};

    for (let i = 0; i < nums.length; i++) {
        if (target - nums[i] in hashMap) {
            return [hashMap[target - nums[i]], i];
        }
        hashMap[nums[i]] = i;
    }
    return [];
};

function colorize(text, color) {
    const colors = {
        cyan: '\x1b[36m',
        green: '\x1b[32m',
        red: '\x1b[31m',
        yellow: '\x1b[33m',
        reset: '\x1b[0m',
        bold: '\x1b[1m'
    };
    return `${colors[color]}${text}${colors.reset}`;
}

function printTestHeader() {
    const header = "🚀 Testing twoSum Implementation";
    const line = "=".repeat(header.length);

    console.log(`\n${line}`);
    console.log(header);
    console.log(`${line}\n`);
}

function printTestCase(nums, target, expected, result, status) {
    console.log(colorize(`➡ Test Case: nums = [${nums}], target = ${target}`, 'cyan'));
    console.log(`   Expected: [${expected}]`);
    console.log(`   Received: [${result}]`);
    console.log(colorize(`   Status: ${status}`, status === 'PASSED' ? 'green' : 'red'));
    console.log('-'.repeat(60));
}

function testTwoSum() {
    const testCases = [
        // Basic cases
        { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
        { nums: [3, 2, 4], target: 6, expected: [1, 2] },
        { nums: [3, 3], target: 6, expected: [0, 1] },

        // Normal cases
        { nums: [1, 2, 3, 4], target: 7, expected: [2, 3] },
        { nums: [-1, -2, -3, -4], target: -6, expected: [1, 3] },
        { nums: [0, 4, 3, 0], target: 0, expected: [0, 3] },
        { nums: [1, 2, 3], target: 5, expected: [1, 2] },

        // Edge cases
        { nums: [], target: 5, expected: [] },
        { nums: [1], target: 1, expected: [] },

        // Additional cases
        { nums: [10, 20, 30, 40, 50], target: 90, expected: [3, 4] },
        { nums: [1, 1, 1, 1, 1], target: 2, expected: [0, 1] },
    ];

    printTestHeader();

    let passed = 0;
    let failed = 0;

    testCases.forEach(({ nums, target, expected }) => {
        const result = twoSum(nums, target);
        const status = JSON.stringify(result) === JSON.stringify(expected) ? 'PASSED' : 'FAILED';

        if (status === 'PASSED') {
            passed++;
        } else {
            failed++;
        }

        printTestCase(nums, target, expected, result, status);
    });

    const total = passed + failed;
    console.log(`\n📊 Test Results Summary:`);
    console.log(colorize(`✅ PASSED: ${passed}/${total}`, 'green'));
    console.log(colorize(`❌ FAILED: ${failed}/${total}`, failed ? 'red' : 'green'));

    if (failed === 0) {
        console.log(colorize('\n🎉 All test cases passed successfully!', 'green'));
    } else {
        console.log(colorize('\n⚠ Some tests failed. Please review the output.', 'yellow'));
    }
}

testTwoSum();
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let dummy = new ListNode();
    let temp = dummy;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry !== 0) {
        let val1 = l1 !== null ? l1.val : 0;
        let val2 = l2 !== null ? l2.val : 0;

        let sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        temp.next = new ListNode(sum % 10);
        temp = temp.next;

        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }

    return dummy.next;
};

function createList(arr) {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

function listToArray(head) {
    const result = [];
    while (head !== null) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}


function runTests() {
    const testCases = [
        {
            name: "Example 1",
            l1: createList([2, 4, 3]),
            l2: createList([5, 6, 4]),
            expected: [7, 0, 8]
        },
        {
            name: "Example 2 - zeros",
            l1: createList([0]),
            l2: createList([0]),
            expected: [0]
        },
        {
            name: "Different length with carry",
            l1: createList([9, 9, 9, 9]),
            l2: createList([9, 9, 9, 9, 9, 9, 9]),
            expected: [8, 9, 9, 9, 0, 0, 0, 1]
        },
        {
            name: "Single digit with carry",
            l1: createList([5]),
            l2: createList([5]),
            expected: [0, 1]
        },
        {
            name: "One empty list",
            l1: createList([1, 2, 3]),
            l2: createList([]),
            expected: [1, 2, 3]
        },
        {
            name: "Large numbers",
            l1: createList([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
            l2: createList([5, 6, 4]),
            expected: [6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 1]
        }
    ];

    let allPassed = true;

    testCases.forEach(testCase => {
        const result = addTwoNumbers(testCase.l1, testCase.l2);
        const resultArray = listToArray(result);
        const passed = JSON.stringify(resultArray) === JSON.stringify(testCase.expected);

        if (!passed) {
            allPassed = false;
            console.error(`❌ ${testCase.name} failed:`);
            console.error(`   Expected: [${testCase.expected.join(', ')}]`);
            console.error(`   Received: [${resultArray.join(', ')}]`);
        } else {
            console.log(`✅ ${testCase.name} passed`);
        }
    });

    if (allPassed) {
        console.log("\n🎉 All tests passed successfully!");
    } else {
        console.log("\n💥 Some tests failed");
    }
}

runTests();
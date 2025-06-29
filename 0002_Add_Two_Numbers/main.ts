//=======================================================================================================================

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let dummy = new ListNode();
    let tail = dummy;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry !== 0) {
        let val1 = l1 !== null ? l1.val : 0;
        let val2 = l2 !== null ? l2.val : 0;

        let sum = val1 + val2 + carry;
        carry = Math.floor(sum / 10);
        tail.next = new ListNode(sum % 10);
        tail = tail.next;

        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }

    return dummy.next;
}

//=======================================================================================================================


function createLinkedList(nums: number[]): ListNode | null {
    if (nums.length === 0) return null;
    let head = new ListNode(nums[0]);
    let current = head;
    for (let i = 1; i < nums.length; i++) {
        current.next = new ListNode(nums[i]);
        current = current.next;
    }
    return head;
}

function linkedListToArray(head: ListNode | null): number[] {
    const result: number[] = [];
    while (head !== null) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

function arraysEqual(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function runTests() {
    const testCases = [
        {
            name: "Example 1",
            l1: createLinkedList([2, 4, 3]),
            l2: createLinkedList([5, 6, 4]),
            expected: [7, 0, 8]
        },
        {
            name: "Example 2",
            l1: createLinkedList([0]),
            l2: createLinkedList([0]),
            expected: [0]
        },
        {
            name: "Example 3",
            l1: createLinkedList([9, 9, 9, 9, 9, 9, 9]),
            l2: createLinkedList([9, 9, 9, 9]),
            expected: [8, 9, 9, 9, 0, 0, 0, 1]
        },
        {
            name: "Different lengths",
            l1: createLinkedList([1, 8]),
            l2: createLinkedList([0]),
            expected: [1, 8]
        },
        {
            name: "With carry",
            l1: createLinkedList([9, 9]),
            l2: createLinkedList([1]),
            expected: [0, 0, 1]
        },
        {
            name: "Large numbers",
            l1: createLinkedList([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
            l2: createLinkedList([5, 6, 4]),
            expected: [6, 6, 4, 0, 0, 0, 0, 0, 0, 0, 1]
        }
    ];

    let allPassed = true;

    for (const testCase of testCases) {
        const result = addTwoNumbers(testCase.l1, testCase.l2);
        const resultArray = linkedListToArray(result);
        const passed = arraysEqual(resultArray, testCase.expected);

        if (!passed) {
            allPassed = false;
            console.error(`❌ ${testCase.name} failed:`);
            console.error(`   Expected: [${testCase.expected.join(', ')}]`);
            console.error(`   Received: [${resultArray.join(', ')}]`);
        } else {
            console.log(`✅ ${testCase.name} passed`);
        }
    }

    if (allPassed) {
        console.log("\n🎉 All tests passed successfully!");
    } else {
        console.log("\n💥 Some tests failed");
    }
}

runTests();
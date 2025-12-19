// Sliding Window

//Pseudocode
// 1. Initialize maxSum = 0, windowSum = 0
// 2. Calculate sum of first k elements → windowSum
// 3. Set maxSum = windowSum
// 4. Loop from index k to end of array:
//    - Slide window: subtract arr[i-k], add arr[i]
//    - Update maxSum if current windowSum is greater
// 5. Return maxSum

function maxSubarraySum(arr, k) {
  let i = 0;
  let j = 0;
  let windowSum = 0;
  let maxSum = -Infinity;

  while (j < arr.length) {
    // Add the next element to the window
    windowSum += arr[j];

    // Check if window size reached k
    if (j - i + 1 < k) {
      j++;
    } else if (j - i + 1 === k) {
      // We have a valid window
      maxSum = Math.max(maxSum, windowSum);
      console.log(maxSum, '-------maxSum');

      // Remove the element going out of the window
      windowSum -= arr[i];
      console.log(windowSum, '--------------windowSum');

      // Slide the window forward
      i++;
      j++;
    }
  }

  return maxSum;
}

console.log(maxSubarraySum([2, 1, 5, 1, 3, 2], 3)); // Output: 9

// Two Pointers

//Pseudocode
// Note: This pattern is often used with sorted arrays or linked lists.
// 1. Initialize left and right pointers at start of array
// 2. Loop until right pointer reaches end of array:
//    - If arr[right] meets condition, move right pointer forward
//    - If arr[right] does not meet condition, move left pointer forward
// 3. Return result based on pointers' positions

function twoSumPointer(arr, target) {
  let sorted = arr.slice().sort((a, b) => a - b);

  let start = 0;
  let end = sorted.length - 1;

  while (start < end) {
    let sum = sorted[start] + sorted[end];
    if (sum == target) {
      return [sorted[start], sorted[end]];
    } else if (sum < target) {
      start++;
    } else {
      end--;
    }
  }
  return [];
}
console.log(twoSumPointer([1, 2, 3, 4, 5], 9));

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

// Two Pointer
function twoSumPointers(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === target) {
      return [left, right];
    }

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
}
console.log(twoSumPointers([1, 2, 3, 4, 6], 6)); // Output: [1, 3]

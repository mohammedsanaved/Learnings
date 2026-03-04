// Reverse string
// Pseudo Code:
// 1. intialize the empty Array
// 2. First for reverse str we have to loop the in reverse
// 3. get the Item and Push every item into an Array
// 4. return the result
// Code:
function ReverseString(str) {
  // console.log(str.length)
  const result = [];
  for (let i = str.length - 1; i >= 0; i--) {
    result.push(str[i]);
  }
  return result.join('');
}
console.log(ReverseString('hello'));
// Palindrome check
// Pseudo Code:
// 1. create variable with empty Array
// 2. run the Loop in reverse
// 3. Store the every value in Array variable
// 4. Check the Str with reverse Str if they are same after Operation
// 5. If Yes ? Palindrome : NotPalindrome

// Code: Palindrome
function isPalindrome(str) {
  let result = [];
  for (let i = str.length - 1; i >= 0; i--) {
    result.push(str[i]);
  }
  const reverseStr = result.join('');
  if (str === reverseStr) {
    return `isPalindrome`;
  } else {
    return `NotPalindrome`;
  }
}
console.log(isPalindrome('madam'));

// Max / Min in array
// Pseudo Code:
// 1. first we have store first value of an Array in variable
// 2. we have to loop the Array & Check with the var value if
// its greator than the current one
function FindMax(arr) {
  if (arr.length === 0) return [];
  let max = arr[0];

  for (let i = 0; i <= arr.length - 1; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }
  return max;
}
console.log(FindMax([22, 12, 1, 2, 3, 4]));

function FindMin(arr) {
  if (arr.length === 0) return [];
  let min = arr[0];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (min > arr[i]) {
      min = arr[i];
    }
  }
  return min;
}
console.log(FindMin([12, 1, 2, 4, 5, 6]));
// Two Sum
// Pseudo Code:
// 1. create empty Array to store the result
// 2. run the loop for each element
// 3. run the nested loop for next element
// 4. check the sum of both element if its equal to target
// 5. if yes push the index in result Array
// 6. return the result Array

function twoSum(arr, target) {
  for (let i = 0; i <= arr.length - 1; i++) {
    for (let j = 0; j <= arr.length - 1; j++) {
      let currentValue = arr[i] + arr[j];
      if (currentValue === target) {
        return [arr[i], arr[j]];
      }
    }
  }
}
const largeArray = Array.from({ length: 10000 }, (_, i) => i);
const target = 19997; // 9998 + 9999
function twoSumHashMap(arr, target) {
  const map = new Map();
  for (let i = 0; i <= arr.length - 1; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(arr[i], i);
  }
  return [];
}
const start = performance.now();
twoSumHashMap(largeArray, target);
// twoSum(largeArray, target)
const end = performance.now();

console.log(`Execution time: ${(end - start).toFixed(4)} milliseconds`);

console.log(twoSumHashMap([1, 2, 3, 4, 5, 6, 7], 5));
console.log(twoSum([1, 2, 3, 4, 5, 6, 7], 5));
// Remove duplicates

// Psuedo Code:

// 1. we have intialize a Map
// 2. intialize the Empty Array variable
// 3. loop through the Array
// 4. Check if the value is available in Map
// 5. If its available then then mark as seen

function RemoveDup(arr) {
  let map = new Map();
  let result = [];
  for (let item of arr) {
    if (!map.has(item)) {
      result.push(item);
      map.set(item, true);
    }
  }
  return result;
}
console.log(RemoveDup([12, 1, 2, 2, 33, 3, 3, 5, 5]));
// Move zeros to end
// Pseudo Code:
// 1. First we have to find the 0's Positions in the Array
// Edge Case here is like [1, 0, 1, 2,3] we have to swap the
// elements of the Array till the 0 comes at the Last Index
// Edge Case if all the values contain 0 return same array
// Edge Case like [1. 0, 0, 5] we have to check here next value is
// also a 0 If it is 0 then we have to skip the swap there

function MoveZeros(arr) {
  let lastNonZeroIndex = 0;
  for (let i = 0; i <= arr.length - 1; i++) {
    if (arr[i] !== 0) {
      [arr[lastNonZeroIndex], arr[i]] = [arr[i], arr[lastNonZeroIndex]];
      lastNonZeroIndex++;
    }
  }
  return arr;
}
console.log(MoveZeros([12, 0, 0, 1]));

// Character frequency
// Psuedo Code:
// 1.  first we have to set a Map
// 2. Loop through the Array
// 3. get the count of the char if it appears more that once

function frequencyChar(str) {
  let map = new Map();
  for (let char of str) {
    let currentCount = map.get(char) || 0;
    map.set(char, currentCount + 1);
    // console.log(map.set(char, currentCount + 1), "-------current")
  }
  return map;
}
console.log(frequencyChar('strriing'));

// Flattern Array

// Pseudo Code:
// 1. let a empty Array variable;
// 2. depth if it was 0 then return the arr
// 3. loop the arr and check if the Item is Array & depth is > 0
// 4. recursively call the function
// 5. if its was single value then push into result array

function Flattern(arr, depth = Infinity) {
  let result = [];
  if (depth === 0) return arr;
  for (let item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...Flattern(item, depth - 1));
    } else {
      result.push(item);
    }
  }
  return result;
}
console.log(Flattern([1, 2, [3, [4, 5]]], 2));

/**
 * Creates a debounced version of the function.
 * @param {Function} fun - The function to debounce.
 * @param {number} delay - Delay in milliseconds.
 */
function debounce(fun, delay) {
  let timeout; // Step 1: Initialize timer variable

  return function (...args) {
    // Step 2: Return a closure
    // Step 3: Clear any existing timer to reset the wait period
    clearTimeout(timeout);

    // Step 4: Start a new timer
    timeout = setTimeout(() => {
      // Apply the original function with the correct 'this' and arguments
      fun.apply(this, args);
    }, delay);
  };
}

/**
 * Creates a throttled version of the function.
 * @param {Function} fun - The function to throttle.
 * @param {number} limit - The time limit in milliseconds.
 */
function throttle(fun, limit) {
  let inThrottle = false; // Step 1: Initialize the toggle flag

  return function (...args) {
    // Step 2: Return the closure
    if (!inThrottle) {
      // Step 3: Execute the function immediately
      fun.apply(this, args);

      // Step 4: Lock the function
      inThrottle = true;

      // Step 5: Unlock after the specified limit
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

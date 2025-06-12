## Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.

### First Approach brute force:

## solution:

- here we need create 2 loops for check the duplicates
  O(n²) (not length \* 2)
  Because for each element, you're comparing it with every other element after it

```js
let arr = [1, 2, 3, 4, 4];

for (let i = 0; i <= arr.length; i++) {
  for (let j = 0; j <= arr.length; j++) {
    if (arr[i] === arr[j]) {
      return true;
    }
  }
  return false;
}
```

### Second Approach Sorting:

## solution:

- here we need to sort the array
- then we need to check the array for duplicates by comparing each element with the next one
- Time complexity: O(n log n) (length \* log length)

```js
let arr = [1, 2, 3, 4, 4];

for (let i = 0; i <= arr.length; i++) {
  arr.sort((a, b) => a - b);
  if (arr[i] === arr[i + 1]) {
    return true;
  }
  return false;
}
```

### Third Approach Hash Table Or Set:

## solution:

- here we need to create a hash table or set
- then we need to iterate over the array and check if each element is in the set
- Time complexity: O(n) (length)

- Space complexity: O(n) (length)

```js
var containsDuplicate = function (nums) {
  let seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
};
```

## Valid Anagram

### Given two strings s and t, return true if the two strings are anagrams of each other, otherwise return false.

### First Approach:

- First we have to split the string into an array of characters.
- Then we have to sort the array of characters.

- Finally we have to compare the sorted arrays.

- 👉 Total Time Complexity:
  O(n log n)

- 👉 Total Space Complexity:
  O(n)

```js
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  let x = s.split('').sort().join('');
  let y = t.split('').sort().join('');

  if (x === y) {
    return true;
  } else {
    return false;
  }
}
```

```js
Input: (s = 'racecar'), (t = 'carrace');

Output: true;
```

### Second Approach:

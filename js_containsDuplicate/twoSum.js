// First Approach brute force:
let arr = [1, 2, 3, 4, 4];

for (let i = 0; i <= arr.length; i++) {
  for (let j = 0; j <= arr.length; j++) {
    if (arr[i] === arr[j]) {
      return console.log(true);
    }
  }
  return console.log(false);
}

// Second approach using Sorting

let ar = [1, 2, 3, 4, 4];

// rotateRight(arr, r) { ... }

function rotateRight(arr, r) {
  const n = arr.length;
  for (let i = 0; i < r; i++) {
    let result = arr.pop();
    console.log(result);
    arr.unshift(result);
  }
  return arr;
}

console.log(rotateRight([1, 2, 3, 4, 5], 2));

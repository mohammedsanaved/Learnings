// map
// -
// filter
// reduce
// flat
// memoization

Array.prototype.myFlat = function (depth) {
  const result = [];
  const arr = this;
  function flattern(arr, depth) {
    arr.forEach((item) => {
      if (depth > 0 && Array.isArray(item)) {
        flattern(item, depth - 1);
      } else {
        result.push(item);
      }
    });
  }
  flattern(arr, depth);
  return result;
};

Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }
  if (initialValue === undefined && this.length === 0) {
    throw new TypeError('Reduce of empty array with no initial value');
  }
  let acc = initialValue === undefined ? this[0] : initialValue;
  let startIndex = initialValue === undefined ? 1 : 0;
  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};
Array.prototype.myMap = function (callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }
  const result = [];
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) result.push(callback(arr[i], i, arr));
  }
  return result;
};
Array.prototype.myFilter = function (callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }
  const result = [];
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    const shouldInclude = callback(arr[i], i, arr);
    if (shouldInclude) {
      result.push(arr[i]);
    }
  }
  return result;
};

function memo(func) {
  let cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = func.apply(thiis, args);
    cache[key] = result;
    return result;
  };
}

const arr = [1, 2, [3, 4, [5, 6]]];
console.log(arr.myFlat(2), 'myFlat');

const arr2 = [1, 2, 3, 4];
const sum = arr2.myReduce((acc, curr) => acc + curr, 2);
const sumReduce = arr2.reduce((acc, curr) => acc + curr, 2);

console.log(sum, 'myReduce');
console.log(sumReduce, 'sumReduce');

const arr3 = [1, 2, 3, 4];
const result = arr3.myMap((item) => item * 2);
console.log(result, 'myMap');

const arr4 = [1, 2, 3, 4];
const result2 = arr4.myFilter((item) => item % 2 === 0);
console.log(result2, 'myFilter');

// ---------------------------currying method---------------

function multiply(x) {
  return function (y) {
    return x * y;
  };
}

const multiplyBy2 = multiply(2);
console.log(multiplyBy2(3), 'currying'); // 6
multiplyBy2(4); // 6

// --------------------------- curry method---------------
function curry(fn) {
  // your code here
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return curried.bind(this, ...args);
    }
  };
}

function sumCurry(a, b, c) {
  return a + b + c;
}
const curriedSum = curry(sumCurry);
console.log(curriedSum(1)(3)(5), '---------curry method'); // 6
console.log(curriedSum(1, 2)(3), '---------curry method');

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function sqr(item) {
  return item * 2;
}
let resultMap = num.myMap(sqr);

console.log(resultMap, 'Result from myMap');

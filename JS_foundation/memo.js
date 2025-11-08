const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const button = document.getElementById('submitAdd');

function add(a, b) {
  return a + b;
}

button.addEventListener('click', function () {
  console.log('Clicked');
  console.log(add(Number(num1.value), Number(num2.value)));
  console.log(
    memoizedAdd(Number(num1.value), Number(num2.value)),
    'From Memoization'
  );
});

console.log(add(2, 3));

const memoizedAdd = memo(add);
console.log(memoizedAdd(2, 3));
console.log(memoizedAdd(2, 3));
console.log(memoizedAdd(3, 3));
console.log(memoizedAdd(3, 3));
console.log(memoizedAdd(2, 3));

function memo(func) {
  let cache = {};
  return function (...args) {
    let key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = func.apply(this, args);
    cache[key] = result;
    return result;
  };
}

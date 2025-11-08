Array.prototype.customMap = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError(
      'Array.prototype.customMap called on null or undefined'
    );
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const resultArray = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) resultArray[i] = callback.call(thisArg, this[i], i, this);
  }
  return resultArray;
};
// Add 1 to each number
const userIds = [101, 202, 303, 404, 505];
// console.log(userIds.customMap((id) => id + 1));

// Convert list of objects to names
const people = [
  { firstName: 'alice', lastName: 'smith', age: 30 },
  { firstName: 'bob', lastName: 'jones', age: 24 },
  { firstName: 'charlie', lastName: 'brown', age: 45 },
];

// console.log(
//   people.customMap((name) => console.log(`${name.firstName} ${name.lastName}`))
// );

// Capitalize strings
const names = ['apple', 'banana', 'cherry'];
// console.log(
//   names.customMap((cap) => cap.charAt(0).toUpperCase() + cap.slice(1))
// );

// Extract id & email from users
const users = [
  { id: 'a1', email: 'a.smith@example.com', username: 'asmith' },
  { id: 'b2', email: 'b.jones@example.com', username: 'bjones' },
  { id: 'c3', email: 'c.brown@example.com', username: 'cbrown' },
];
// console.log(users.customMap((el) => ({ id: el.id, email: el.email })));

// Map array to async function (promise map)

const fruits = ['apple', 'banana', 'cherry'];
const asyncTask = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Processed: ${value}`);
    }, 50); // Simulate a small delay
  });
};
let nameVal = Promise.all(fruits.customMap(asyncTask)).then((res) =>
  console.log(res)
);

// console.log(nameVal);

// ------------------------------------------Filters---------------------------------
Array.prototype.customFilter = function (callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }
  let result = [];
  let arr = this;
  for (let i = 0; i < arr.length; i++) {
    let val = callback(arr[i], i, arr);
    if (val) {
      result.push(arr[i]);
    }
  }
  return result;
};

// Filter active users
const userData = [
  { id: 1, name: 'Alice', isActive: true },
  { id: 2, name: 'Bob', isActive: false },
  { id: 3, name: 'Charlie', isActive: true },
];

// console.log(userData.customFilter((act) => act.isActive));
// Filter even numbers
const mixedNumbers = [10, 15, 22, 31, 40, 53];

// console.log(mixedNumbers.customFilter((val) => val % 2 === 0));

// Remove falsy values
const mixedArray = [0, 'hello', null, 42, '', undefined, 'world', false];
// console.log(mixedArray.customFilter((falsy) => Boolean(falsy) === true));

// Filter products with price > 1000
const products = [
  { name: 'Laptop', price: 1200 },
  { name: 'Mouse', price: 25 },
  { name: 'Monitor', price: 350 },
  { name: 'Server', price: 5000 },
];
// console.log(products.customFilter((val) => val.price > 1000));

// Filter strings starting with A
const words = ['Apple', 'Banana', 'Apricot', 'Grape', 'Avocado'];
// console.log(words.customFilter((val) => val.charAt(0) === 'A'));

// ---------------------------------------------reduce-------------------------------------------------
Array.prototype.customReduce = function (callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`);
  }
  if (initialValue === undefined && this.length === 0) {
    throw new TypeError(`Input is invalid`);
  }
  let acc = initialValue === undefined ? this[0] : initialValue;
  let startIndex = initialValue === undefined ? 1 : 0;
  for (let i = startIndex; i < this.length; i++) {
    acc = callback(acc, this[i], i, this);
  }
  return acc;
};

// Sum numbers
const numbersToSum = [5, 10, 15, 20];
console.log(numbersToSum.customReduce((acc, cur) => acc + cur, 0));

// Count occurrences of items
const itemsToCount = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
console.log(
  itemsToCount.customReduce(
    (acc, cur) => ({
      ...acc,
      [cur]: (acc[cur] || 0) + 1,
    }),
    {}
  )
);

// Flatten array
const nestedArray = [1, [2, 3], [4, [5, 6]]];

function flatten(arr) {
  return arr.customReduce((acc, val) => {
    if (Array.isArray(val)) {
      acc = acc.concat(flatten(val));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

console.log(flatten(nestedArray)); // [1, 2, 3, 4, 5, 6]

// Group by field (role, city…)

const usersToGroup = [
  { name: 'Alice', role: 'Engineer', city: 'NY' },
  { name: 'Bob', role: 'Manager', city: 'SF' },
  { name: 'Charlie', role: 'Engineer', city: 'NY' },
  { name: 'David', role: 'Manager', city: 'LA' },
];
// {
//   'Engineer': [
//     { name: 'Alice', role: 'Engineer', city: 'NY' },
//     { name: 'Charlie', role: 'Engineer', city: 'NY' }
//   ],
//   'Manager': [
//     { name: 'Bob', role: 'Manager', city: 'SF' },
//     { name: 'David', role: 'Manager', city: 'LA' }
//   ]
// }

const data = usersToGroup.customReduce((acc, user) => {
  const key = user.role;

  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(user);
  return acc;
}, {});
// console.log(data);

// Build object from key-value array
const keyValuePairs = [
  ['name', 'Gemini'],
  ['type', 'AI Assistant'],
  ['version', 1.0],
];

// console.log(
keyValuePairs.customReduce((acc, [key, value]) => {
  acc[key] = value;
  console.log(acc);
  return acc;
}, {});
// );
// {'name': 'Gemini', 'type': 'AI Assistant', 'version': 1.0}

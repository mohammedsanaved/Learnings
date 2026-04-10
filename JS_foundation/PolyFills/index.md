# JavaScript Polyfills - Complete Revision Guide

## Table of Contents

1. [Array.map()](#1-arraymap)
2. [Array.filter()](#2-arrayfilter)
3. [Array.reduce()](#3-arrayreduce)
4. [Function.call()](#4-functioncall)
5. [Function.apply()](#5-functionapply)
6. [Function.bind()](#6-functionbind)
7. [Practice Exercises](#practice-exercises)
8. [Interview Tips](#interview-tips)
9. [Promise.resolve() & Promise.reject()](#7-promiseresolve--promisereject)
10. [Promise.all()](#8-promiseall)
11. [Promise.allSettled()](#9-promiseallsettled)
12. [Promise.race()](#10-promiserace)
13. [Promise.any()](#11-promiseany)
14. [Custom Promise Implementation](#12-custom-promise-implementation)
15. [Promise Practice Exercises](#promise-practice-exercises)
16. [Promise Interview Tips](#promise-interview-tips)

---

# 1. Array.map()

## What it does

- Creates a **new array** by calling a function on every element
- Does **not** modify the original array
- Returns array of **same length**

## Syntax

```javascript
array.map(callback(currentValue, index, array), thisArg);
```

## Polyfill Implementation

```javascript
Array.prototype.myMap = function (callback, thisArg) {
  // Step 1: Validate callback is a function
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // Step 2: Create empty result array
  const result = [];

  // Step 3: Loop through each element
  for (let i = 0; i < this.length; i++) {
    // Step 4: Check if index exists (handles sparse arrays)
    if (i in this) {
      // Step 5: Call callback and push result
      result.push(callback.call(thisArg, this[i], i, this));
    }
  }

  // Step 6: Return new array
  return result;
};
```

## Step-by-Step Breakdown

| Step | Code                                       | Purpose                      |
| ---- | ------------------------------------------ | ---------------------------- |
| 1    | `typeof callback !== 'function'`           | Validate input               |
| 2    | `const result = []`                        | Store transformed values     |
| 3    | `for (let i = 0; i < this.length; i++)`    | Iterate array                |
| 4    | `if (i in this)`                           | Handle sparse arrays         |
| 5    | `callback.call(thisArg, this[i], i, this)` | Execute with correct context |
| 6    | `return result`                            | Return new array             |

## Example Usage

```javascript
const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.myMap(function (num) {
  return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// Using index
const indexed = numbers.myMap((num, index) => `${index}: ${num}`);
console.log(indexed); // ["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"]

// Using thisArg
const multiplier = { factor: 3 };
const tripled = numbers.myMap(function (num) {
  return num * this.factor;
}, multiplier);
console.log(tripled); // [3, 6, 9, 12, 15]
```

---

# 2. Array.filter()

## What it does

- Creates a **new array** with elements that **pass the test**
- Does **not** modify the original array
- Returns array of **same or fewer** elements

## Syntax

```javascript
array.filter(callback(currentValue, index, array), thisArg);
```

## Polyfill Implementation

```javascript
Array.prototype.myFilter = function (callback, thisArg) {
  // Step 1: Validate callback is a function
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // Step 2: Create empty result array
  const result = [];

  // Step 3: Loop through each element
  for (let i = 0; i < this.length; i++) {
    // Step 4: Check if index exists
    if (i in this) {
      // Step 5: If callback returns truthy, add to result
      if (callback.call(thisArg, this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }

  // Step 6: Return filtered array
  return result;
};
```

## Key Difference from map()

```javascript
// map: Always pushes transformed value
result.push(callback.call(thisArg, this[i], i, this));

// filter: Only pushes if condition is true
if (callback.call(thisArg, this[i], i, this)) {
  result.push(this[i]); // Push original value, not transformed
}
```

## Example Usage

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get even numbers
const evens = numbers.myFilter((num) => num % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// Get numbers greater than 5
const greaterThan5 = numbers.myFilter((num) => num > 5);
console.log(greaterThan5); // [6, 7, 8, 9, 10]

// Using thisArg
const threshold = { min: 3, max: 7 };
const inRange = numbers.myFilter(function (num) {
  return num >= this.min && num <= this.max;
}, threshold);
console.log(inRange); // [3, 4, 5, 6, 7]

// Filter objects
const users = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 17 },
  { name: 'Bob', age: 30 },
];
const adults = users.myFilter((user) => user.age >= 18);
console.log(adults); // [{ name: 'John', age: 25 }, { name: 'Bob', age: 30 }]
```

---

# 3. Array.reduce()

## What it does

- Reduces array to a **single value**
- Executes callback on each element with an **accumulator**
- Most **versatile** array method

## Syntax

```javascript
array.reduce(callback(accumulator, currentValue, index, array), initialValue);
```

## Polyfill Implementation

```javascript
Array.prototype.myReduce = function (callback, initialValue) {
  // Step 1: Validate callback is a function
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // Step 2: Check if array is empty with no initial value
  if (this.length === 0 && initialValue === undefined) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  // Step 3: Initialize accumulator and starting index
  let accumulator;
  let startIndex;

  if (initialValue !== undefined) {
    // Initial value provided
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // No initial value - use first element
    accumulator = this[0];
    startIndex = 1;
  }

  // Step 4: Loop through array
  for (let i = startIndex; i < this.length; i++) {
    // Step 5: Check if index exists
    if (i in this) {
      // Step 6: Update accumulator with callback result
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  // Step 7: Return final accumulated value
  return accumulator;
};
```

## Visual Explanation

```
Array: [1, 2, 3, 4, 5]
Callback: (acc, curr) => acc + curr
Initial Value: 0

Step 1: acc = 0,  curr = 1  →  0 + 1 = 1
Step 2: acc = 1,  curr = 2  →  1 + 2 = 3
Step 3: acc = 3,  curr = 3  →  3 + 3 = 6
Step 4: acc = 6,  curr = 4  →  6 + 4 = 10
Step 5: acc = 10, curr = 5  →  10 + 5 = 15

Result: 15
```

## Example Usage

```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum of all numbers
const sum = numbers.myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// Product of all numbers
const product = numbers.myReduce((acc, curr) => acc * curr, 1);
console.log(product); // 120

// Find maximum
const max = numbers.myReduce((acc, curr) => (curr > acc ? curr : acc));
console.log(max); // 5

// Flatten array
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const flat = nested.myReduce((acc, curr) => acc.concat(curr), []);
console.log(flat); // [1, 2, 3, 4, 5, 6]

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.myReduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }

// Group by property
const people = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 30 },
];
const groupedByAge = people.myReduce((acc, person) => {
  const key = person.age;
  if (!acc[key]) acc[key] = [];
  acc[key].push(person);
  return acc;
}, {});
console.log(groupedByAge);
// { 25: [{name: 'John'...}, {name: 'Jane'...}], 30: [{name: 'Bob'...}] }
```

---

# 4. Function.call()

## What it does

- Calls function with specified **this** value
- Arguments passed **individually**
- Executes **immediately**

## Syntax

```javascript
function.call(thisArg, arg1, arg2, ...)
```

## Polyfill Implementation

```javascript
Function.prototype.myCall = function (context, ...args) {
  // Step 1: Handle null/undefined context
  context = context || globalThis;

  // Step 2: Convert primitive to object
  if (typeof context !== 'object') {
    context = Object(context);
  }

  // Step 3: Create unique property to avoid overwriting
  const uniqueKey = Symbol('fn');

  // Step 4: Assign function to context
  context[uniqueKey] = this;

  // Step 5: Call function with arguments
  const result = context[uniqueKey](...args);

  // Step 6: Clean up - delete the property
  delete context[uniqueKey];

  // Step 7: Return result
  return result;
};
```

## Step-by-Step Breakdown

```
Given: greet.myCall(person, 'Hello')

Step 1: context = person (or globalThis if null)
Step 2: Ensure context is object
Step 3: uniqueKey = Symbol('fn')
Step 4: person[uniqueKey] = greet
Step 5: person[uniqueKey]('Hello')  // Calls greet with person as 'this'
Step 6: delete person[uniqueKey]
Step 7: return result
```

## Example Usage

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'John' };

// Using myCall
console.log(greet.myCall(person, 'Hello', '!')); // "Hello, John!"
console.log(greet.myCall(person, 'Hi', '?')); // "Hi, John?"

// Borrowing array methods
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
const result = Array.prototype.join.myCall(arrayLike, '-');
console.log(result); // "a-b-c"

// Finding max in array
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.myCall(null, ...numbers);
console.log(max); // 7

// With null context (uses globalThis)
function showThis() {
  console.log(this);
}
showThis.myCall(null); // globalThis (window in browser)
```

---

# 5. Function.apply()

## What it does

- Calls function with specified **this** value
- Arguments passed as **array**
- Executes **immediately**

## Syntax

```javascript
function.apply(thisArg, [argsArray])
```

## Polyfill Implementation

```javascript
Function.prototype.myApply = function (context, args = []) {
  // Step 1: Handle null/undefined context
  context = context || globalThis;

  // Step 2: Convert primitive to object
  if (typeof context !== 'object') {
    context = Object(context);
  }

  // Step 3: Validate args is array-like
  if (args && !Array.isArray(args) && typeof args !== 'object') {
    throw new TypeError('CreateListFromArrayLike called on non-object');
  }

  // Step 4: Create unique property
  const uniqueKey = Symbol('fn');

  // Step 5: Assign function to context
  context[uniqueKey] = this;

  // Step 6: Call function with arguments array
  const result = context[uniqueKey](...(args || []));

  // Step 7: Clean up
  delete context[uniqueKey];

  // Step 8: Return result
  return result;
};
```

## Difference: call() vs apply()

```javascript
// call - arguments passed individually
greet.call(person, 'Hello', '!');

// apply - arguments passed as array
greet.apply(person, ['Hello', '!']);
```

| Feature   | call()               | apply()              |
| --------- | -------------------- | -------------------- |
| Arguments | Individual           | Array                |
| Memory    | Mnemonic: **C**omma  | Mnemonic: **A**rray  |
| Use case  | Known number of args | Dynamic/unknown args |

## Example Usage

```javascript
function introduce(greeting, hobby) {
  return `${greeting}, I'm ${this.name} and I love ${hobby}`;
}

const person = { name: 'John' };

// Using myApply
console.log(introduce.myApply(person, ['Hi', 'coding']));
// "Hi, I'm John and I love coding"

// Finding max (classic use case)
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.myApply(null, numbers);
console.log(max); // 7

// Finding min
const min = Math.min.myApply(null, numbers);
console.log(min); // 2

// Merging arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
Array.prototype.push.myApply(arr1, arr2);
console.log(arr1); // [1, 2, 3, 4, 5, 6]

// With array-like objects
function sum() {
  return Array.prototype.reduce.myApply(arguments, [
    (acc, curr) => acc + curr,
    0,
  ]);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

---

# 6. Function.bind()

## What it does

- Returns a **new function** with bound **this** value
- Does **NOT** execute immediately
- Supports **partial application** (currying)

## Syntax

```javascript
const boundFunction = function.bind(thisArg, arg1, arg2, ...)
```

## Polyfill Implementation

```javascript
Function.prototype.myBind = function (context, ...boundArgs) {
  // Step 1: Store reference to original function
  const originalFunction = this;

  // Step 2: Validate that 'this' is a function
  if (typeof originalFunction !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }

  // Step 3: Return new function
  return function boundFunction(...args) {
    // Step 4: Combine bound args with new args
    const allArgs = [...boundArgs, ...args];

    // Step 5: Handle 'new' keyword (constructor call)
    if (new.target) {
      // Called with 'new' - create new instance
      return new originalFunction(...allArgs);
    }

    // Step 6: Call with bound context
    return originalFunction.apply(context, allArgs);
  };
};
```

## Advanced Polyfill (With Prototype Chain)

```javascript
Function.prototype.myBind = function (context, ...boundArgs) {
  const originalFunction = this;

  if (typeof originalFunction !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }

  // Create bound function
  function BoundFunction(...args) {
    const allArgs = [...boundArgs, ...args];

    // Check if called as constructor
    if (this instanceof BoundFunction) {
      return new originalFunction(...allArgs);
    }

    return originalFunction.apply(context, allArgs);
  }

  // Maintain prototype chain
  if (originalFunction.prototype) {
    BoundFunction.prototype = Object.create(originalFunction.prototype);
  }

  return BoundFunction;
};
```

## Key Differences: call/apply vs bind

| Feature             | call/apply           | bind               |
| ------------------- | -------------------- | ------------------ |
| Execution           | Immediate            | Returns function   |
| Return value        | Function result      | New function       |
| Use case            | Immediate invocation | Deferred execution |
| Partial application | No                   | Yes                |

## Example Usage

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

const person = { name: 'John' };

// Basic binding
const boundGreet = greet.myBind(person);
console.log(boundGreet('Hello', '!')); // "Hello, John!"

// Partial application
const sayHelloTo = greet.myBind(person, 'Hello');
console.log(sayHelloTo('!')); // "Hello, John!"
console.log(sayHelloTo('?')); // "Hello, John?"

// Full partial application
const completeGreeting = greet.myBind(person, 'Hi', '!!!');
console.log(completeGreeting()); // "Hi, John!!!"

// Event handlers
const button = {
  text: 'Click me',
  handleClick: function () {
    console.log(`Button text: ${this.text}`);
  },
};
const boundHandler = button.handleClick.myBind(button);
// Now boundHandler can be used as event listener

// setTimeout example
const user = {
  name: 'Alice',
  sayHi: function () {
    console.log(`Hi, I'm ${this.name}`);
  },
};
setTimeout(user.sayHi.myBind(user), 1000); // "Hi, I'm Alice"

// Constructor binding
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const BoundPerson = Person.myBind(null, 'John');
const john = new BoundPerson(25);
console.log(john); // Person { name: 'John', age: 25 }
```

---

# 7. Promise.resolve() & Promise.reject()

## What they do

- `Promise.resolve()` — Returns a **resolved** Promise with the given value
- `Promise.reject()` — Returns a **rejected** Promise with the given reason
- Both are **static** methods on the Promise constructor

## Syntax

```javascript
Promise.resolve(value);
Promise.reject(reason);
```

## Polyfill Implementation

```javascript
// Promise.resolve polyfill
Promise.myResolve = function (value) {
  // Step 1: If value is already a Promise (thenable), return it as-is
  if (value && typeof value === 'object' && typeof value.then === 'function') {
    return value;
  }

  // Step 2: Otherwise, wrap in a resolved Promise
  return new Promise(function (resolve) {
    resolve(value);
  });
};

// Promise.reject polyfill
Promise.myReject = function (reason) {
  // Always wrap in a rejected Promise - no thenables check needed
  return new Promise(function (resolve, reject) {
    reject(reason);
  });
};
```

## Step-by-Step Breakdown

| Step | Code                                         | Purpose                        |
| ---- | -------------------------------------------- | ------------------------------ |
| 1    | `typeof value.then === 'function'`           | Check if value is a thenable   |
| 2    | `return value`                               | Pass through existing Promises |
| 3    | `new Promise(resolve => resolve(value))`     | Wrap plain values              |
| 4    | `new Promise((_, reject) => reject(reason))` | Always rejects for myReject    |

## Example Usage

```javascript
// Promise.myResolve
Promise.myResolve(42).then((val) => console.log(val)); // 42
Promise.myResolve('hello').then((val) => console.log(val)); // "hello"

// Passing a Promise through (returned as-is)
const existing = Promise.resolve(99);
Promise.myResolve(existing).then((val) => console.log(val)); // 99

// Promise.myReject
Promise.myReject('Something went wrong').catch((err) => console.log(err)); // "Something went wrong"

Promise.myReject(new Error('Oops')).catch((err) => console.log(err.message)); // "Oops"
```

---

# 8. Promise.all()

## What it does

- Takes an **array of Promises**
- Resolves when **ALL** Promises resolve → returns array of results
- Rejects **immediately** if **ANY** Promise rejects
- **Fail-fast** behavior

## Syntax

```javascript
Promise.all(iterable);
```

## Polyfill Implementation

```javascript
Promise.myAll = function (promises) {
  // Step 1: Return a new Promise
  return new Promise(function (resolve, reject) {
    // Step 2: Handle empty array
    if (!promises || promises.length === 0) {
      return resolve([]);
    }

    // Step 3: Track results and completion count
    const results = new Array(promises.length);
    let resolvedCount = 0;

    // Step 4: Iterate over each promise
    promises.forEach(function (promise, index) {
      // Step 5: Wrap in Promise.resolve to handle non-Promise values
      Promise.resolve(promise)
        .then(function (value) {
          // Step 6: Store result at correct index
          results[index] = value;
          resolvedCount++;

          // Step 7: If all resolved, resolve with results array
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(function (error) {
          // Step 8: Fail fast - reject immediately on any failure
          reject(error);
        });
    });
  });
};
```

## Visual Explanation

```
Promises: [P1(200ms), P2(100ms), P3(300ms)]

Timeline:
100ms → P2 resolves ✅  results[1] = value2  count: 1/3
200ms → P1 resolves ✅  results[0] = value1  count: 2/3
300ms → P3 resolves ✅  results[2] = value3  count: 3/3 → RESOLVE!

Output: [value1, value2, value3]  ← ORDER PRESERVED (not by completion time)

If any rejects: → REJECT IMMEDIATELY (others ignored)
```

## Example Usage

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

// All resolve
Promise.myAll([p1, p2, p3]).then((values) => console.log(values)); // [1, 2, 3]

// One rejects - fail fast
const p4 = Promise.reject('Error!');
Promise.myAll([p1, p4, p3]).catch((err) => console.log(err)); // "Error!"

// With async operations
const fetchUsers = Promise.myAll([
  fetch('/api/user/1').then((r) => r.json()),
  fetch('/api/user/2').then((r) => r.json()),
  fetch('/api/user/3').then((r) => r.json()),
]);
// Resolves when all 3 requests complete

// Non-Promise values are handled too
Promise.myAll([1, 'hello', Promise.resolve(true)]).then((values) =>
  console.log(values),
); // [1, "hello", true]
```

---

# 9. Promise.allSettled()

## What it does

- Takes an **array of Promises**
- **Always resolves** (never rejects) after ALL promises settle
- Returns array of **status objects** — each has `status: 'fulfilled'` or `status: 'rejected'`
- **No fail-fast** — waits for everything

## Syntax

```javascript
Promise.allSettled(iterable);
```

## Polyfill Implementation

```javascript
Promise.myAllSettled = function (promises) {
  // Step 1: Return a new Promise (always resolves)
  return new Promise(function (resolve) {
    // Step 2: Handle empty array
    if (!promises || promises.length === 0) {
      return resolve([]);
    }

    // Step 3: Track results and count
    const results = new Array(promises.length);
    let settledCount = 0;

    // Step 4: Iterate over each promise
    promises.forEach(function (promise, index) {
      Promise.resolve(promise)
        .then(function (value) {
          // Step 5: Fulfilled - store status object
          results[index] = {
            status: 'fulfilled',
            value: value,
          };
        })
        .catch(function (reason) {
          // Step 6: Rejected - store status object
          results[index] = {
            status: 'rejected',
            reason: reason,
          };
        })
        .finally(function () {
          // Step 7: Count every settled promise
          settledCount++;

          // Step 8: Resolve when ALL are settled
          if (settledCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
};
```

## Key Difference: all() vs allSettled()

```javascript
// Promise.all — fails fast
Promise.myAll([resolve, REJECT, resolve])
    → Rejects with the error ❌

// Promise.allSettled — waits for all
Promise.myAllSettled([resolve, REJECT, resolve])
    → Resolves with:
    [
        { status: 'fulfilled', value: ... },
        { status: 'rejected',  reason: ... },
        { status: 'fulfilled', value: ... }
    ] ✅
```

| Feature      | Promise.all()       | Promise.allSettled()    |
| ------------ | ------------------- | ----------------------- |
| On rejection | Rejects immediately | Continues waiting       |
| Output       | Array of values     | Array of status objects |
| Use case     | All-or-nothing      | Independent operations  |

## Example Usage

```javascript
const promises = [
  Promise.resolve('Success 1'),
  Promise.reject('Error!'),
  Promise.resolve('Success 2'),
];

Promise.myAllSettled(promises).then((results) => {
  console.log(results);
  // [
  //   { status: 'fulfilled', value: 'Success 1' },
  //   { status: 'rejected',  reason: 'Error!' },
  //   { status: 'fulfilled', value: 'Success 2' }
  // ]

  // Filter only successful ones
  const successes = results
    .filter((r) => r.status === 'fulfilled')
    .map((r) => r.value);
  console.log(successes); // ['Success 1', 'Success 2']

  // Filter only failed ones
  const failures = results
    .filter((r) => r.status === 'rejected')
    .map((r) => r.reason);
  console.log(failures); // ['Error!']
});
```

---

# 10. Promise.race()

## What it does

- Takes an **array of Promises**
- Resolves or rejects with the **first settled** Promise (whichever finishes first)
- Other Promises are **ignored** after the winner settles
- **True race** — first past the post wins

## Syntax

```javascript
Promise.race(iterable);
```

## Polyfill Implementation

```javascript
Promise.myRace = function (promises) {
  // Step 1: Return a new Promise
  return new Promise(function (resolve, reject) {
    // Step 2: Handle empty array (never settles — matches native behavior)
    if (!promises || promises.length === 0) {
      return; // Pending forever
    }

    // Step 3: Attach handlers to all promises
    promises.forEach(function (promise) {
      // Step 4: First to settle wins — rest are ignored
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
};
```

## Visual Explanation

```
Promises: [P1(300ms), P2(100ms ✅), P3(200ms)]

Timeline:
100ms → P2 resolves ✅ → RESOLVE with P2's value
200ms → P3 resolves   (ignored — race already won)
300ms → P1 resolves   (ignored — race already won)

If P2 had rejected at 100ms → REJECT with P2's reason
```

## Example Usage

```javascript
const p1 = new Promise((resolve) => setTimeout(() => resolve('P1'), 300));
const p2 = new Promise((resolve) => setTimeout(() => resolve('P2'), 100));
const p3 = new Promise((resolve) => setTimeout(() => resolve('P3'), 200));

Promise.myRace([p1, p2, p3]).then((winner) => console.log(winner)); // "P2" (fastest)

// Timeout pattern — the most common real-world use
function fetchWithTimeout(url, ms) {
  const fetchPromise = fetch(url);
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), ms),
  );
  return Promise.myRace([fetchPromise, timeout]);
}

fetchWithTimeout('/api/data', 5000)
  .then((res) => res.json())
  .catch((err) => console.log(err.message)); // "Request timed out" if slow

// Rejection wins too
const slow = new Promise((resolve) => setTimeout(() => resolve('slow'), 500));
const fast = new Promise((_, reject) =>
  setTimeout(() => reject('fast error'), 100),
);

Promise.myRace([slow, fast]).catch((err) => console.log(err)); // "fast error"
```

---

# 11. Promise.any()

## What it does

- Takes an **array of Promises**
- Resolves with the **first fulfilled** Promise
- Only rejects if **ALL** Promises reject (with `AggregateError`)
- **Opposite of Promise.all()** in terms of rejection behavior

## Syntax

```javascript
Promise.any(iterable);
```

## Polyfill Implementation

```javascript
Promise.myAny = function (promises) {
  // Step 1: Return a new Promise
  return new Promise(function (resolve, reject) {
    // Step 2: Handle empty array
    if (!promises || promises.length === 0) {
      return reject(new AggregateError([], 'All promises were rejected'));
    }

    // Step 3: Track rejection count and errors
    const errors = new Array(promises.length);
    let rejectedCount = 0;

    // Step 4: Iterate over each promise
    promises.forEach(function (promise, index) {
      Promise.resolve(promise)
        .then(function (value) {
          // Step 5: First fulfillment wins — resolve immediately
          resolve(value);
        })
        .catch(function (reason) {
          // Step 6: Record rejection
          errors[index] = reason;
          rejectedCount++;

          // Step 7: All rejected — reject with AggregateError
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
};
```

## Comparison: all() vs race() vs any()

| Method                 | Resolves when          | Rejects when           |
| ---------------------- | ---------------------- | ---------------------- |
| `Promise.all()`        | ALL fulfill            | ANY rejects            |
| `Promise.race()`       | FIRST settles (either) | FIRST settles (either) |
| `Promise.any()`        | FIRST fulfills         | ALL reject             |
| `Promise.allSettled()` | ALL settle (always)    | Never                  |

## Example Usage

```javascript
const p1 = Promise.reject('Error 1');
const p2 = Promise.resolve('First success!');
const p3 = Promise.resolve('Second success');

// Resolves with first fulfillment
Promise.myAny([p1, p2, p3]).then((val) => console.log(val)); // "First success!"

// All reject → AggregateError
Promise.myAny([
  Promise.reject('Err A'),
  Promise.reject('Err B'),
  Promise.reject('Err C'),
]).catch((err) => {
  console.log(err instanceof AggregateError); // true
  console.log(err.errors); // ["Err A", "Err B", "Err C"]
  console.log(err.message); // "All promises were rejected"
});

// Real-world: Try multiple mirrors/CDNs
Promise.myAny([
  fetch('https://cdn1.example.com/data.json'),
  fetch('https://cdn2.example.com/data.json'),
  fetch('https://cdn3.example.com/data.json'),
])
  .then((res) => res.json())
  .catch(() => console.log('All CDNs failed'));
```

---

# 12. Custom Promise Implementation

## What it does

- A **from-scratch** implementation of the Promise class
- Supports `.then()`, `.catch()`, `.finally()`
- Handles **async resolution** and **chaining**
- Based on the **Promises/A+ specification**

## States

```
PENDING → FULFILLED (via resolve)
PENDING → REJECTED  (via reject)

Once fulfilled or rejected, state is IMMUTABLE (cannot change)
```

## Full Polyfill Implementation

```javascript
class MyPromise {
  constructor(executor) {
    // Step 1: Initialize state and value
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;

    // Step 2: Store queued callbacks (for async resolution)
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // Step 3: Define resolve function
    const resolve = (value) => {
      if (this.state !== 'pending') return; // Immutable once settled
      this.state = 'fulfilled';
      this.value = value;
      // Run all queued fulfillment callbacks
      this.onFulfilledCallbacks.forEach((fn) => fn(value));
    };

    // Step 4: Define reject function
    const reject = (reason) => {
      if (this.state !== 'pending') return; // Immutable once settled
      this.state = 'rejected';
      this.reason = reason;
      // Run all queued rejection callbacks
      this.onRejectedCallbacks.forEach((fn) => fn(reason));
    };

    // Step 5: Execute the executor, catch synchronous errors
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // Step 6: Implement .then()
  then(onFulfilled, onRejected) {
    // Make callbacks optional with pass-through defaults
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (e) => {
            throw e;
          };

    // Return new Promise for chaining
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          const result = onFulfilled(value);
          // If result is a Promise, wait for it
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      const handleRejected = (reason) => {
        try {
          const result = onRejected(reason);
          if (result instanceof MyPromise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === 'fulfilled') {
        // Already resolved — schedule asynchronously
        setTimeout(() => handleFulfilled(this.value), 0);
      } else if (this.state === 'rejected') {
        setTimeout(() => handleRejected(this.reason), 0);
      } else {
        // Still pending — queue the callbacks
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  // Step 7: Implement .catch() — shorthand for .then(null, onRejected)
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // Step 8: Implement .finally() — runs regardless of outcome
  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally();
        return value; // Pass through original value
      },
      (reason) => {
        onFinally();
        throw reason; // Re-throw original reason
      },
    );
  }

  // Step 9: Static methods
  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}
```

## Example Usage

```javascript
// Basic usage
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Done!'), 1000);
});

p.then((val) => console.log(val)); // "Done!" (after 1 second)

// Chaining
new MyPromise((resolve) => resolve(1))
  .then((val) => val + 1)
  .then((val) => val * 2)
  .then((val) => console.log(val)); // 4

// Error handling
new MyPromise((resolve, reject) => {
  reject(new Error('Something failed'));
}).catch((err) => console.log(err.message)); // "Something failed"

// .finally()
new MyPromise((resolve) => resolve('ok'))
  .then((val) => val.toUpperCase())
  .finally(() => console.log('Cleanup!')) // Always runs
  .then((val) => console.log(val)); // "OK"

// Executor errors are caught
new MyPromise(() => {
  throw new Error('Sync error in executor');
}).catch((err) => console.log(err.message)); // "Sync error in executor"
```

---

# Quick Reference Cheat Sheet — Promise Methods

```javascript
// RESOLVE — wrap value in fulfilled Promise
Promise.myResolve = function (value) {
  if (value && typeof value.then === 'function') return value;
  return new Promise((resolve) => resolve(value));
};

// REJECT — wrap reason in rejected Promise
Promise.myReject = function (reason) {
  return new Promise((_, reject) => reject(reason));
};

// ALL — resolve when all fulfill, reject on first rejection
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;
    if (!promises.length) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((val) => {
          results[i] = val;
          if (++count === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
};

// ALL SETTLED — always resolve, with status objects
Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    const results = [];
    let count = 0;
    if (!promises.length) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then((value) => {
          results[i] = { status: 'fulfilled', value };
        })
        .catch((reason) => {
          results[i] = { status: 'rejected', reason };
        })
        .finally(() => {
          if (++count === promises.length) resolve(results);
        });
    });
  });
};

// RACE — first to settle wins
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => Promise.resolve(p).then(resolve).catch(reject));
  });
};

// ANY — first to fulfill wins, rejects only if all reject
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let count = 0;
    if (!promises.length)
      return reject(new AggregateError([], 'All promises were rejected'));
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((err) => {
          errors[i] = err;
          if (++count === promises.length)
            reject(new AggregateError(errors, 'All promises were rejected'));
        });
    });
  });
};
```

---

# Promise Practice Exercises

## Exercise 1: Implement Promise.myResolve with thenable support

```javascript
// Your implementation here
Promise.myResolve = function (value) {
  // TODO: Handle thenables vs plain values
};

// Tests
Promise.myResolve(42).then((v) => console.log(v)); // 42
Promise.myResolve(Promise.resolve('hi')).then((v) => console.log(v)); // "hi"
```

<details>
<summary>Solution</summary>
 
```javascript
Promise.myResolve = function(value) {
    if (value && typeof value === 'object' && typeof value.then === 'function') {
        return value;
    }
    return new Promise(resolve => resolve(value));
};
```
</details>
 
---
 
## Exercise 2: Implement Promise.myAll
 
```javascript
Promise.myAll = function(promises) {
    // TODO: Implement
};
 
// Tests
Promise.myAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
    .then(console.log);   // [1, 2, 3]
 
Promise.myAll([Promise.resolve(1), Promise.reject('Oops')])
    .catch(console.log);  // "Oops"
```
 
<details>
<summary>Solution</summary>
 
```javascript
Promise.myAll = function(promises) {
    return new Promise((resolve, reject) => {
        if (!promises.length) return resolve([]);
        const results = new Array(promises.length);
        let count = 0;
        promises.forEach((p, i) => {
            Promise.resolve(p).then(val => {
                results[i] = val;
                if (++count === promises.length) resolve(results);
            }).catch(reject);
        });
    });
};
```
</details>
 
---
 
## Exercise 3: Implement Promise.myAllSettled
 
```javascript
Promise.myAllSettled = function(promises) {
    // TODO: Implement — never rejects
};
 
// Test
Promise.myAllSettled([
    Promise.resolve('ok'),
    Promise.reject('fail'),
]).then(console.log);
// [{ status:'fulfilled', value:'ok' }, { status:'rejected', reason:'fail' }]
```
 
<details>
<summary>Solution</summary>
 
```javascript
Promise.myAllSettled = function(promises) {
    return new Promise(resolve => {
        if (!promises.length) return resolve([]);
        const results = new Array(promises.length);
        let count = 0;
        promises.forEach((p, i) => {
            Promise.resolve(p)
                .then(value => { results[i] = { status: 'fulfilled', value }; })
                .catch(reason => { results[i] = { status: 'rejected', reason }; })
                .finally(() => { if (++count === promises.length) resolve(results); });
        });
    });
};
```
</details>
 
---
 
## Exercise 4: Implement Promise.myRace
 
```javascript
Promise.myRace = function(promises) {
    // TODO: First to settle wins
};
 
// Test
const slow = new Promise(resolve => setTimeout(() => resolve('slow'), 500));
const fast = new Promise(resolve => setTimeout(() => resolve('fast'), 100));
 
Promise.myRace([slow, fast]).then(console.log); // "fast"
```
 
<details>
<summary>Solution</summary>
 
```javascript
Promise.myRace = function(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(p => Promise.resolve(p).then(resolve).catch(reject));
    });
};
```
</details>
 
---
 
## Exercise 5: Implement Promise.myAny (Bonus)
 
```javascript
Promise.myAny = function(promises) {
    // TODO: First to FULFILL wins; reject only if ALL reject
};
 
// Tests
Promise.myAny([Promise.reject('a'), Promise.resolve('b'), Promise.resolve('c')])
    .then(console.log);  // "b"
 
Promise.myAny([Promise.reject('x'), Promise.reject('y')])
    .catch(err => console.log(err instanceof AggregateError)); // true
```
 
<details>
<summary>Solution</summary>
 
```javascript
Promise.myAny = function(promises) {
    return new Promise((resolve, reject) => {
        if (!promises.length) return reject(new AggregateError([], 'All promises were rejected'));
        const errors = new Array(promises.length);
        let count = 0;
        promises.forEach((p, i) => {
            Promise.resolve(p)
                .then(resolve)
                .catch(err => {
                    errors[i] = err;
                    if (++count === promises.length) {
                        reject(new AggregateError(errors, 'All promises were rejected'));
                    }
                });
        });
    });
};
```
</details>
 
---
 
# Promise Interview Tips
 
## Common Questions
 
### 1. "What's the difference between Promise.all() and Promise.allSettled()?"
> "Promise.all() is fail-fast — it rejects immediately if any promise rejects, giving you only the error. Promise.allSettled() waits for everything to finish and gives you an array of status objects for each promise, so you can see which succeeded and which failed. Use all() when you need everything to work, allSettled() when each operation is independent."
 
### 2. "What's the difference between Promise.race() and Promise.any()?"
> "Both care about the first promise, but race() resolves or rejects based on the first to settle for either outcome. any() ignores rejections and only resolves with the first fulfillment — it only rejects if every single promise rejects, throwing an AggregateError."
 
### 3. "Why do we need `Promise.resolve(promise)` inside the polyfills instead of just `promise.then()`?"
> "The input array might contain plain values like numbers or strings, not just Promises. Wrapping with Promise.resolve() handles both cases uniformly — it passes through real Promises and wraps plain values in a resolved Promise."
 
### 4. "How does Promise chaining work?"
> "Each .then() returns a new Promise. If the callback returns a plain value, the next .then() gets that value. If it returns a Promise, the chain waits for that Promise to settle. This is why you can chain asynchronous operations sequentially."
 
### 5. "What's AggregateError and when is it used?"
> "AggregateError is a built-in error type that holds multiple errors in its .errors array. Promise.any() uses it when all promises reject, so you can inspect every individual rejection reason rather than just the first."
 
### 6. "Why does a custom Promise use setTimeout in .then()?"
> "The Promises/A+ spec requires handlers to be called asynchronously, even if the Promise is already resolved. setTimeout(fn, 0) defers execution to the next event loop tick, ensuring consistent async behavior."
 
## Key Points to Remember
 
```
✅ Promise.all()        — ALL must fulfill; FIRST rejection wins
✅ Promise.allSettled() — ALL settle; ALWAYS resolves with status objects
✅ Promise.race()       — FIRST to settle (fulfill OR reject) wins
✅ Promise.any()        — FIRST to FULFILL wins; all-reject → AggregateError
✅ Always wrap inputs with Promise.resolve() to handle non-Promise values
✅ Preserve result ORDER (by index), not by completion time
✅ State is immutable — once resolved/rejected, cannot change
✅ .catch(fn) is shorthand for .then(null, fn)
✅ .finally(fn) passes through value/reason unchanged
```
 
## Red Flags to Avoid
 
```
❌ Forgetting to handle empty arrays
❌ Resolving with the wrong order (use index, not push order)
❌ Not wrapping inputs with Promise.resolve() (breaks with plain values)
❌ Forgetting AggregateError in Promise.any()
❌ Letting Promise.allSettled() ever reject
❌ Missing the 'pending' state in custom Promise (callbacks won't queue)
❌ Not re-throwing in .finally() (swallows the original rejection)
```
 
---
 
**You've got this! 🚀**


# Quick Reference Cheat Sheet

## Array Methods

```javascript
// MAP - Transform each element
Array.prototype.myMap = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(callback.call(thisArg, this[i], i, this));
    }
  }
  return result;
};

// FILTER - Keep elements that pass test
Array.prototype.myFilter = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// REDUCE - Accumulate to single value
Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue !== undefined ? initialValue : this[0];
  let startIdx = initialValue !== undefined ? 0 : 1;

  for (let i = startIdx; i < this.length; i++) {
    if (i in this) {
      acc = callback(acc, this[i], i, this);
    }
  }
  return acc;
};
```

## Function Methods

```javascript
// CALL - Invoke with individual args
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;
  const key = Symbol('fn');
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

// APPLY - Invoke with array of args
Function.prototype.myApply = function (context, args = []) {
  context = context || globalThis;
  const key = Symbol('fn');
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

// BIND - Return bound function
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this;
  return function (...args) {
    return fn.apply(context, [...boundArgs, ...args]);
  };
};
```

---

# Practice Exercises

## Exercise 1: Implement forEach

```javascript
// Your implementation here
Array.prototype.myForEach = function (callback, thisArg) {
  // TODO: Implement this
};

// Test
[1, 2, 3].myForEach((num, i) => console.log(i, num));
```

<details>
<summary>Solution</summary>

```javascript
Array.prototype.myForEach = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      callback.call(thisArg, this[i], i, this);
    }
  }
};
```

</details>

---

## Exercise 2: Implement find

```javascript
// Your implementation here
Array.prototype.myFind = function (callback, thisArg) {
  // TODO: Implement this
};

// Test
const result = [1, 2, 3, 4, 5].myFind((num) => num > 3);
console.log(result); // 4
```

<details>
<summary>Solution</summary>

```javascript
Array.prototype.myFind = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};
```

</details>

---

## Exercise 3: Implement some

```javascript
// Your implementation here
Array.prototype.mySome = function (callback, thisArg) {
  // TODO: Implement this
};

// Test
console.log([1, 2, 3].mySome((num) => num > 2)); // true
console.log([1, 2, 3].mySome((num) => num > 5)); // false
```

<details>
<summary>Solution</summary>

```javascript
Array.prototype.mySome = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      return true;
    }
  }
  return false;
};
```

</details>

---

## Exercise 4: Implement every

```javascript
// Your implementation here
Array.prototype.myEvery = function (callback, thisArg) {
  // TODO: Implement this
};

// Test
console.log([1, 2, 3].myEvery((num) => num > 0)); // true
console.log([1, 2, 3].myEvery((num) => num > 2)); // false
```

<details>
<summary>Solution</summary>

```javascript
Array.prototype.myEvery = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  for (let i = 0; i < this.length; i++) {
    if (i in this && !callback.call(thisArg, this[i], i, this)) {
      return false;
    }
  }
  return true;
};
```

</details>

---

## Exercise 5: Implement flat (Bonus)

```javascript
// Your implementation here
Array.prototype.myFlat = function (depth = 1) {
  // TODO: Implement this
};

// Test
console.log([1, [2, [3, [4]]]].myFlat(1)); // [1, 2, [3, [4]]]
console.log([1, [2, [3, [4]]]].myFlat(2)); // [1, 2, 3, [4]]
console.log([1, [2, [3, [4]]]].myFlat(Infinity)); // [1, 2, 3, 4]
```

<details>
<summary>Solution</summary>

```javascript
Array.prototype.myFlat = function (depth = 1) {
  const result = [];

  const flatten = (arr, d) => {
    for (let i = 0; i < arr.length; i++) {
      if (i in arr) {
        if (Array.isArray(arr[i]) && d > 0) {
          flatten(arr[i], d - 1);
        } else {
          result.push(arr[i]);
        }
      }
    }
  };

  flatten(this, depth);
  return result;
};
```

</details>

---

# Interview Tips

## Common Questions

### 1. "Why use Symbol in call/apply polyfill?"

> "Symbol creates a unique key that won't conflict with existing properties on the context object. This ensures we don't accidentally overwrite any existing property."

### 2. "Why check `i in this` in array methods?"

> "This handles sparse arrays correctly. For example, `[1, , 3]` has a hole at index 1. Using `i in this` skips these holes, matching native behavior."

### 3. "What if context is null in call/apply?"

> "When context is null or undefined, it defaults to the global object (window in browsers, global in Node.js). We handle this with `context = context || globalThis`."

### 4. "What's the difference between call, apply, and bind?"

> "call and apply invoke the function immediately - call takes individual arguments, apply takes an array. bind returns a new function with the context bound, which can be invoked later."

### 5. "How does bind handle the new keyword?"

> "When a bound function is called with `new`, the bound `this` is ignored, and a new object is created. We check this using `new.target` or `this instanceof BoundFunction`."

## Key Points to Remember

```
✅ Always validate callback is a function
✅ Handle null/undefined context
✅ Use Symbol for unique property keys
✅ Handle sparse arrays with 'in' operator
✅ Clean up temporary properties
✅ Maintain prototype chain in bind
✅ Handle 'new' keyword in bind
```

## Red Flags to Avoid

```
❌ Forgetting to return result
❌ Not handling thisArg parameter
❌ Modifying original array in map/filter
❌ Ignoring initialValue in reduce
❌ Not cleaning up after call/apply
❌ Forgetting constructor behavior in bind
```

---

**Good luck with your interview! 🚀**

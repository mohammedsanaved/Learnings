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

---

# 1. Array.map()

## What it does
- Creates a **new array** by calling a function on every element
- Does **not** modify the original array
- Returns array of **same length**

## Syntax
```javascript
array.map(callback(currentValue, index, array), thisArg)
```

## Polyfill Implementation

```javascript
Array.prototype.myMap = function(callback, thisArg) {
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

| Step | Code | Purpose |
|------|------|---------|
| 1 | `typeof callback !== 'function'` | Validate input |
| 2 | `const result = []` | Store transformed values |
| 3 | `for (let i = 0; i < this.length; i++)` | Iterate array |
| 4 | `if (i in this)` | Handle sparse arrays |
| 5 | `callback.call(thisArg, this[i], i, this)` | Execute with correct context |
| 6 | `return result` | Return new array |

## Example Usage

```javascript
const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.myMap(function(num) {
    return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// Using index
const indexed = numbers.myMap((num, index) => `${index}: ${num}`);
console.log(indexed); // ["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"]

// Using thisArg
const multiplier = { factor: 3 };
const tripled = numbers.myMap(function(num) {
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
array.filter(callback(currentValue, index, array), thisArg)
```

## Polyfill Implementation

```javascript
Array.prototype.myFilter = function(callback, thisArg) {
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
    result.push(this[i]);  // Push original value, not transformed
}
```

## Example Usage

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Get even numbers
const evens = numbers.myFilter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

// Get numbers greater than 5
const greaterThan5 = numbers.myFilter(num => num > 5);
console.log(greaterThan5); // [6, 7, 8, 9, 10]

// Using thisArg
const threshold = { min: 3, max: 7 };
const inRange = numbers.myFilter(function(num) {
    return num >= this.min && num <= this.max;
}, threshold);
console.log(inRange); // [3, 4, 5, 6, 7]

// Filter objects
const users = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 17 },
    { name: 'Bob', age: 30 }
];
const adults = users.myFilter(user => user.age >= 18);
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
array.reduce(callback(accumulator, currentValue, index, array), initialValue)
```

## Polyfill Implementation

```javascript
Array.prototype.myReduce = function(callback, initialValue) {
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
const max = numbers.myReduce((acc, curr) => curr > acc ? curr : acc);
console.log(max); // 5

// Flatten array
const nested = [[1, 2], [3, 4], [5, 6]];
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
    { name: 'Bob', age: 30 }
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
Function.prototype.myCall = function(context, ...args) {
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
console.log(greet.myCall(person, 'Hi', '?'));    // "Hi, John?"

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
Function.prototype.myApply = function(context, args = []) {
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

| Feature | call() | apply() |
|---------|--------|---------|
| Arguments | Individual | Array |
| Memory | Mnemonic: **C**omma | Mnemonic: **A**rray |
| Use case | Known number of args | Dynamic/unknown args |

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
    return Array.prototype.reduce.myApply(arguments, [(acc, curr) => acc + curr, 0]);
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
Function.prototype.myBind = function(context, ...boundArgs) {
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
Function.prototype.myBind = function(context, ...boundArgs) {
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

| Feature | call/apply | bind |
|---------|------------|------|
| Execution | Immediate | Returns function |
| Return value | Function result | New function |
| Use case | Immediate invocation | Deferred execution |
| Partial application | No | Yes |

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
    handleClick: function() {
        console.log(`Button text: ${this.text}`);
    }
};
const boundHandler = button.handleClick.myBind(button);
// Now boundHandler can be used as event listener

// setTimeout example
const user = {
    name: 'Alice',
    sayHi: function() {
        console.log(`Hi, I'm ${this.name}`);
    }
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

# Quick Reference Cheat Sheet

## Array Methods

```javascript
// MAP - Transform each element
Array.prototype.myMap = function(callback, thisArg) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            result.push(callback.call(thisArg, this[i], i, this));
        }
    }
    return result;
};

// FILTER - Keep elements that pass test
Array.prototype.myFilter = function(callback, thisArg) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (i in this && callback.call(thisArg, this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

// REDUCE - Accumulate to single value
Array.prototype.myReduce = function(callback, initialValue) {
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
Function.prototype.myCall = function(context, ...args) {
    context = context || globalThis;
    const key = Symbol('fn');
    context[key] = this;
    const result = context[key](...args);
    delete context[key];
    return result;
};

// APPLY - Invoke with array of args
Function.prototype.myApply = function(context, args = []) {
    context = context || globalThis;
    const key = Symbol('fn');
    context[key] = this;
    const result = context[key](...args);
    delete context[key];
    return result;
};

// BIND - Return bound function
Function.prototype.myBind = function(context, ...boundArgs) {
    const fn = this;
    return function(...args) {
        return fn.apply(context, [...boundArgs, ...args]);
    };
};
```

---

# Practice Exercises

## Exercise 1: Implement forEach

```javascript
// Your implementation here
Array.prototype.myForEach = function(callback, thisArg) {
    // TODO: Implement this
};

// Test
[1, 2, 3].myForEach((num, i) => console.log(i, num));
```

<details>
<summary>Solution</summary>

```javascript
Array.prototype.myForEach = function(callback, thisArg) {
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
Array.prototype.myFind = function(callback, thisArg) {
    // TODO: Implement this
};

// Test
const result = [1, 2, 3, 4, 5].myFind(num => num > 3);
console.log(result); // 4
```

<details>
<summary>Solution</summary>

```javascript
Array.prototype.myFind = function(callback, thisArg) {
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
Array.prototype.mySome = function(callback, thisArg) {
    // TODO: Implement this
};

// Test
console.log([1, 2, 3].mySome(num => num > 2)); // true
console.log([1, 2, 3].mySome(num => num > 5)); // false
```

<details>
<summary>Solution</summary>

```javascript
Array.prototype.mySome = function(callback, thisArg) {
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
Array.prototype.myEvery = function(callback, thisArg) {
    // TODO: Implement this
};

// Test
console.log([1, 2, 3].myEvery(num => num > 0)); // true
console.log([1, 2, 3].myEvery(num => num > 2)); // false
```

<details>
<summary>Solution</summary>

```javascript
Array.prototype.myEvery = function(callback, thisArg) {
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
Array.prototype.myFlat = function(depth = 1) {
    // TODO: Implement this
};

// Test
console.log([1, [2, [3, [4]]]].myFlat(1));    // [1, 2, [3, [4]]]
console.log([1, [2, [3, [4]]]].myFlat(2));    // [1, 2, 3, [4]]
console.log([1, [2, [3, [4]]]].myFlat(Infinity)); // [1, 2, 3, 4]
```

<details>
<summary>Solution</summary>

```javascript
Array.prototype.myFlat = function(depth = 1) {
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
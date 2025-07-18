Great plan! Milestone 1 focuses on **Basic Syntax & Control Flow**, so we'll create **Day 1 tasks** that include:
✅ **Code Questions**
✅ **Output-Based Questions**
✅ **Theory Questions**

Here’s the **Day 1 Task Set**:

---

## ✅ **Day 1: Basic Syntax (Variables, Data Types, Operators, I/O, Comments)**

---

### **📌 Part 1: Theory Questions**

1. What is the difference between `var`, `let`, and `const`?

## Answers:

### Scope: `var` is function-scoped

:- Function-scoped. If declared within a function, it's accessible throughout that function, even before its declaration line (due to hoisting). If declared outside a function, it's global.

```js
function myFunction() {
  if (true) {
    var x = 10; // x is function-scoped, not block-scoped
  }
  console.log(x); // Output: 10 (x is accessible here)
}
myFunction();
// console.log(x); // Throws ReferenceError: x is not defined (x is not accessible outside myFunction)
```

### Scope: `let` and `const` are block-scoped.

Block-scoped. Their scope is limited to the nearest enclosing block (e.g., if statement, for loop, or any code within curly braces).

```js
function myFunction() {
  let y = 50; // y is function-scoped (and block-scoped to the function block)

  if (true) {
    let x = 10; // x is block-scoped to this 'if' block
    console.log(x); // Output: 10 (accessible within the block)
    console.log(y); // Output: 50 (accessible from outer scope)
  }

  // console.log(x); // Throws ReferenceError: x is not defined
  // 'x' is out of scope here as the 'if' block has ended.

  for (let i = 0; i < 2; i++) {
    let z = 'loop_var'; // z is block-scoped to this 'for' loop block
    console.log(z); // Output: 'loop_var', 'loop_var'
  }
  // console.log(z); // Throws ReferenceError: z is not defined
  // 'z' is out of scope here as the 'for' loop block has ended.
}
myFunction();
```

2. Explain the difference between `==` and `===` in JavaScript.

```markdown
    1. The == operator checks for equality in value, while the === operator checks for equality in both value and type.

    2. The == operator performs type coercion if the operands are of different types. This means it converts one or both operands to a common type before comparing them.

    3. The === operator does not perform type coercion. It checks for equality in both value and type, and returns false if the operands are of different types, even if their values are equal.
```

3. What are JavaScript data types? List them with examples.

```markdown

```

4. What is the difference between `null` and `undefined`?
5. Explain operator precedence with an example.
6. What is the purpose of `prompt()` and `console.log()`?
7. How do you write single-line and multi-line comments in JavaScript?
8. Why is `NaN` of type `number` in JavaScript?

---

### **📌 Part 2: Output-Based Questions**

Predict the output for the following:

#### Q1:

```javascript
console.log(5 + '5');
console.log(5 - '3');
console.log('5' - '3');
```

#### Q2:

```javascript
let x = 10;
x += 5;
console.log(x);
```

#### Q3:

```javascript
console.log(typeof null);
console.log(typeof undefined);
```

#### Q4:

```javascript
console.log(3 + 2 * 4);
console.log((3 + 2) * 4);
```

#### Q5:

```javascript
let num = '10';
console.log(+num + 5);
```

---

### **📌 Part 3: Coding Questions**

Write the following programs:

#### Q1:

Create a variable `name` and `age`, and print:

```
Hello, my name is <name> and I am <age> years old.
```

(using **template literals**)

#### Q2:

Take user input using `prompt()` for a number and check if it’s **even or odd**.

#### Q3:

Write a program that calculates the **area of a rectangle**. (Take `length` and `width` from user using `prompt()`)

#### Q4:

Write a program to swap two numbers without using a third variable.

#### Q5:

Write a program that asks for two numbers and prints:

- Sum
- Difference
- Product
- Quotient

---

🔥 **Goal for Day 1**:

- Understand variables, operators, and data types.
- Get comfortable with basic I/O and comments.
- Practice predicting outputs to strengthen operator precedence understanding.

---

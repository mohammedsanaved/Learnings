# ⚡ JS Polyfills — Interview Cheat Sheet

> Scan this 10 mins before your interview. One concept per block.

---

## 🔷 ARRAY METHODS

---

### 1. `Array.map()`

> Creates a **new array** by transforming every element. Same length. Never modifies original.

**Core trick:** `callback.call(thisArg, this[i], i, this)` — pass index + original array too.

```js
Array.prototype.myMap = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) result.push(callback.call(thisArg, this[i], i, this));
  }
  return result;
};
```

**1-liner answer:** _"map transforms each element and always returns a same-length array — never the original."_

**Trap:** Forgetting `i in this` → breaks on sparse arrays like `[1, , 3]`.

---

### 2. `Array.filter()`

> Creates a **new array** with only elements that pass the test. Same or fewer elements.

**Core trick:** Push `this[i]` (original value), NOT the callback result.

```js
Array.prototype.myFilter = function (callback, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this))
      result.push(this[i]);
  }
  return result;
};
```

**1-liner answer:** _"filter keeps elements where the callback returns truthy — pushes the original value, not the callback result."_

**Trap:** Pushing `callback(...)` instead of `this[i]` — classic mix-up with map.

---

### 3. `Array.reduce()`

> Collapses array into a **single value** using an accumulator.

**Core trick:** If no `initialValue`, use `this[0]` as accumulator and start loop from index `1`.

```js
Array.prototype.myReduce = function (callback, initialValue) {
  if (this.length === 0 && initialValue === undefined)
    throw new TypeError('Reduce of empty array with no initial value');

  let acc = initialValue !== undefined ? initialValue : this[0];
  let start = initialValue !== undefined ? 0 : 1;

  for (let i = start; i < this.length; i++) {
    if (i in this) acc = callback(acc, this[i], i, this);
  }
  return acc;
};
```

**1-liner answer:** _"reduce folds the array into one value — if no initialValue is given, the first element becomes the accumulator."_

**Trap:** Not throwing when array is empty and no initialValue is provided.

---

## 🔷 FUNCTION METHODS

---

### 4. `Function.call()`

> Invokes function **immediately** with a specific `this`. Args passed **individually**.

**Core trick:** Attach function as a Symbol property on context → call it → delete it.

```js
Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis;
  const key = Symbol('fn');
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};
```

**1-liner answer:** _"call temporarily attaches the function to the context object, calls it, then cleans up."_

**Trap:** Using a string key like `'fn'` instead of `Symbol` — risks overwriting an existing property.

---

### 5. `Function.apply()`

> Same as call() but args passed as an **array**.

**Core trick:** Spread the args array: `context[key](...args)` — identical internals to call.

```js
Function.prototype.myApply = function (context, args = []) {
  context = context || globalThis;
  const key = Symbol('fn');
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};
```

**1-liner answer:** _"apply is call with an array — mnemonic: A for Array, C for Comma."_

**Trap:** Forgetting default `args = []` — crashes if called without second argument.

---

### 6. `Function.bind()`

> Returns a **new function** with `this` permanently bound. Does NOT execute immediately.

**Core trick:** Spread both `boundArgs` (pre-set) and `args` (call-time) together: `[...boundArgs, ...args]`.

```js
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this;
  return function (...args) {
    if (new.target) return new fn(...boundArgs, ...args); // handle 'new'
    return fn.apply(context, [...boundArgs, ...args]);
  };
};
```

**1-liner answer:** _"bind returns a new function — useful for partial application and fixing this in callbacks/setTimeout."_

**Trap:** Forgetting `new.target` check — bound functions should still work as constructors.

---

## 🔷 PROMISE METHODS

---

### 7. `Promise.resolve() & Promise.reject()`

> Wraps a value in a settled Promise. resolve() passes through existing Promises.

**Core trick:** Check `typeof value.then === 'function'` — if thenable, return as-is.

```js
Promise.myResolve = function (value) {
  if (value && typeof value === 'object' && typeof value.then === 'function')
    return value;
  return new Promise((resolve) => resolve(value));
};

Promise.myReject = function (reason) {
  return new Promise((_, reject) => reject(reason));
};
```

**1-liner answer:** _"resolve wraps plain values but passes Promises straight through — reject always wraps."_

**Trap:** Not checking for thenables in resolve — double-wraps an existing Promise.

---

### 8. `Promise.all()`

> Resolves when **ALL** fulfill → array of results. Rejects on **first** rejection (fail-fast).

**Core trick:** Use `results[i] = val` with an index — never `.push()` — to preserve order.

```js
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([]);
    const results = new Array(promises.length);
    let count = 0;
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
```

**1-liner answer:** _"all() is all-or-nothing — one rejection kills it; results order matches input order, not completion order."_

**Trap:** Using `.push()` instead of `results[i]` → wrong order in output.

---

### 9. `Promise.allSettled()`

> **Always resolves** after all promises settle. Returns `{ status, value/reason }` objects.

**Core trick:** Never call `reject` — use `.finally()` to count settlements.

```js
Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    if (!promises.length) return resolve([]);
    const results = new Array(promises.length);
    let count = 0;
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
```

**1-liner answer:** _"allSettled never rejects — it waits for everything and tells you exactly which ones passed and which failed."_

**Trap:** Calling `reject` anywhere inside — allSettled must ALWAYS resolve.

---

### 10. `Promise.race()`

> **First to settle** (fulfill OR reject) wins. Rest are ignored.

**Core trick:** Attach `.then(resolve).catch(reject)` to every promise — first one to fire wins.

```js
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => Promise.resolve(p).then(resolve).catch(reject));
  });
};
```

**1-liner answer:** _"race is first past the post — whoever settles first (pass or fail) determines the outcome."_

**Real-world use:** Timeout pattern — race a fetch against a `setTimeout` reject.

**Trap:** Forgetting that a rejection also wins — race doesn't skip rejections like any() does.

---

### 11. `Promise.any()`

> **First to FULFILL** wins. Rejects only if **ALL** reject → throws `AggregateError`.

**Core trick:** Track rejection count — only reject when `rejectedCount === promises.length`.

```js
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length)
      return reject(new AggregateError([], 'All promises were rejected'));
    const errors = new Array(promises.length);
    let count = 0;
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

**1-liner answer:** _"any() is the opposite of all() — it ignores rejections and only fails when every single promise rejects."_

**Trap:** Using a plain `Error` instead of `AggregateError` — interviewer will notice.

---

### 12. Custom Promise Class

> Full from-scratch Promise with `.then()`, `.catch()`, `.finally()`.

**Core trick:** Queue callbacks in arrays when still `pending` — flush them on resolve/reject.

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.onFulfilledCbs = [];
    this.onRejectedCbs = [];

    const resolve = (val) => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = val;
      this.onFulfilledCbs.forEach((fn) => fn(val));
    };
    const reject = (reason) => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.value = reason;
      this.onRejectedCbs.forEach((fn) => fn(reason));
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (e) => {
            throw e;
          };

    return new MyPromise((resolve, reject) => {
      const handle = (fn, val) => {
        try {
          const res = fn(val);
          res instanceof MyPromise ? res.then(resolve, reject) : resolve(res);
        } catch (e) {
          reject(e);
        }
      };

      if (this.state === 'fulfilled')
        setTimeout(() => handle(onFulfilled, this.value), 0);
      else if (this.state === 'rejected')
        setTimeout(() => handle(onRejected, this.value), 0);
      else {
        this.onFulfilledCbs.push((val) => handle(onFulfilled, val));
        this.onRejectedCbs.push((val) => handle(onRejected, val));
      }
    });
  }

  catch(fn) {
    return this.then(null, fn);
  }

  finally(fn) {
    return this.then(
      (val) => {
        fn();
        return val;
      },
      (reason) => {
        fn();
        throw reason;
      },
    );
  }
}
```

**1-liner answer:** _"a Promise has 3 states — pending, fulfilled, rejected. Callbacks are queued when pending and flushed once it settles. State is immutable after that."_

**Trap:** Not using `setTimeout` in `.then()` — handlers must always be async per the spec.

---

## 🗂 30-Second Decision Table

| Method         | Resolves when  | Rejects when  | Output                        |
| -------------- | -------------- | ------------- | ----------------------------- |
| `all()`        | ALL fulfill    | FIRST rejects | `[val, val, ...]`             |
| `allSettled()` | ALL settle     | Never         | `[{status, value/reason}]`    |
| `race()`       | FIRST settles  | FIRST settles | Single value                  |
| `any()`        | FIRST fulfills | ALL reject    | Single value / AggregateError |

---

## 🚨 Universal Rules (say these if stuck)

```
1. Always validate: typeof callback !== 'function' → throw TypeError
2. Always wrap inputs: Promise.resolve(p) handles non-Promise values
3. Never mutate the original array (map/filter/reduce)
4. Use Symbol keys in call/apply — never plain strings
5. State is immutable — once resolved/rejected, ignore further calls
6. bind() needs new.target check for constructor support
7. allSettled() NEVER rejects — remove reject from your mental model
```

---

_Good luck! You've got this 🚀_

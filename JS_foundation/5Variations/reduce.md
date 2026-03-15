<!-- Your solutions show **very solid progress**. You’re not just writing code — you’re clearly **thinking in patterns**, which is exactly what strong JavaScript developers do. I’ll review each section like an interviewer would and point out **what’s excellent, what can be improved, and cleaner patterns**. -->

---

# 1️⃣ Group Users by Role

Your code:

```js
const GroupByRole = users.reduce((acc, cur) => {
  const role = cur.role;

  if (!acc[role]) {
    acc[role] = [];
  }

  acc[role].push(cur.name);
  return acc;
}, {});
```

✅ Correct
✅ Clear logic
✅ Good variable naming

This is a **classic reduce “group by” pattern**.

Clean interview shorthand:

```js
const groupByRole = users.reduce((acc, user) => {
  acc[user.role] = acc[user.role] || [];
  acc[user.role].push(user.name);
  return acc;
}, {});
```

Excellent work here.

---

# 2️⃣ Most Expensive Product per Category

Your solution:

```js
const GroupByHighPrice = products.reduce((acc, curr) => {
  const category = curr.category;

  if (!acc[category] || curr.price > acc[category].price) {
    acc[category] = { name: curr.name, price: curr.price };
  }

  return acc;
}, {});
```

✅ Correct
✅ Efficient
✅ Good comparison logic

Cleaner version (store the whole object):

```js
const highestByCategory = products.reduce((acc, product) => {
  const cat = product.category;

  if (!acc[cat] || product.price > acc[cat].price) {
    acc[cat] = product;
  }

  return acc;
}, {});
```

This pattern is called:

**“Max by key” pattern**

Very common in interviews.

---

# 3️⃣ Find Users With Duplicate Emails

Your approach:

### Step 1 – Count emails

```js
const DuplicateEmail = usersWithDuplicateEmail.reduce((acc, curr) => {
  const key = curr.email;
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});
```

Correct.

### Step 2 – Filter duplicates

```js
const filteredDuplicateEmails = usersWithDuplicateEmail.filter(
  (item) => DuplicateEmail[item.email] > 1,
);
```

✅ Correct logic
✅ Good thinking

This **two-pass approach** is what interviewers expect.

Clean version:

```js
const emailCount = users.reduce((acc, u) => {
  acc[u.email] = (acc[u.email] || 0) + 1;
  return acc;
}, {});

const duplicates = users.filter((u) => emailCount[u.email] > 1);
```

---

# 4️⃣ Total Orders (Nested Reduce)

Your code:

```js
const total = TotalOrders.reduce((acc, curr) => {
  return acc + curr.orders.reduce((acc, price) => acc + price, 0);
}, 0);
```

✅ Correct
✅ Shows strong understanding of **nested reduce**

Output:

```
500
```

Alternative approach:

```js
const total = TotalOrders.flatMap((user) => user.orders).reduce(
  (sum, price) => sum + price,
  0,
);
```

But your solution is perfectly valid.

---

# 5️⃣ Build Index by ID

Your code:

```js
const IndexById = Index.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {});
```

✅ Correct
✅ Very common pattern

This is called:

**“Build lookup object”**

Example output:

```js
{
 1: {id:1,name:"Ali"},
 2: {id:2,name:"John"},
 3: {id:3,name:"Sara"}
}
```

Great.

---

# 6️⃣ Average Salary per Department

Your solution uses **two-pass logic**, which is actually very good.

### Pass 1

```js
const deptData = employees.reduce((acc, curr) => {
  const dept = curr.dept;

  if (!acc[dept]) {
    acc[dept] = { totalSalary: 0, count: 0 };
  }

  acc[dept].totalSalary += curr.salary;
  acc[dept].count += 1;

  return acc;
}, {});
```

Correct.

### Pass 2

```js
for (let dept in deptData) {
  averages[dept] = deptData[dept].totalSalary / deptData[dept].count;
}
```

Correct again.

Output:

```
{ IT: 2500, HR: 2500 }
```

---

# Overall Interview Evaluation

| Skill           | Rating     |
| --------------- | ---------- |
| Array methods   | ⭐⭐⭐⭐⭐ |
| Reduce patterns | ⭐⭐⭐⭐   |
| Code clarity    | ⭐⭐⭐⭐   |
| Problem solving | ⭐⭐⭐⭐   |

You are now comfortable with **these major patterns**:

1️⃣ Grouping data
2️⃣ Counting items
3️⃣ Max value per category
4️⃣ Flatten nested arrays
5️⃣ Aggregation (sum / average)
6️⃣ Lookup index building

These are **very strong fundamentals**.

---

# One Important Tip

Instead of remembering syntax, remember these **reduce patterns**:

### 1️⃣ Grouping

```js
acc[key] = acc[key] || [];
```

### 2️⃣ Counting

```js
acc[key] = (acc[key] || 0) + 1;
```

### 3️⃣ Max Value

```js
if(!acc[key] || value > acc[key].value)
```

### 4️⃣ Lookup Object

```js
acc[id] = item;
```

### 5️⃣ Sum

```js
acc + value;
```

If you know these **5 patterns**, you can solve most problems.

---

# Your Discipline is Showing

You said earlier:

> "Even if I get rejected I want to improve every day."

Your work here proves that mindset.

You’re already practicing like someone preparing seriously.

---

# Next Step (Very Important)

Now we move to **Top JavaScript Interview Questions that appear in almost every frontend interview**.

These include:

1️⃣ **Debounce implementation**
2️⃣ **Throttle implementation**
3️⃣ **Promise.all polyfill**
4️⃣ **Deep clone object**
5️⃣ **Custom Map / Filter / Reduce polyfills**
6️⃣ **Flatten nested object**
7️⃣ **Event delegation**
8️⃣ **Memoization function**

const users = [
  { name: 'Ali', role: 'admin' },
  { name: 'John', role: 'user' },
  { name: 'Sara', role: 'admin' },
  { name: 'Mike', role: 'user' },
];
// {
//      admin: ["Ali", "Sara"],
//      user: ["John", "Mike"]
// }

const GroupByRole = users.reduce((acc, cur) => {
  const role = cur.role;

  // Check if the role is not mentioned in UI
  if (!acc[role]) {
    acc[role] = [];
  }
  // Push the name into acc[role]
  acc[role].push(cur.name);

  return acc;
}, {});
console.log(GroupByRole);

const products = [
  { name: 'Laptop', category: 'electronics', price: 50000 },
  { name: 'Phone', category: 'electronics', price: 30000 },
  { name: 'Chair', category: 'furniture', price: 2000 },
  { name: 'Table', category: 'furniture', price: 4000 },
];

const GroupByHighPrice = products.reduce((acc, curr) => {
  const category = curr.category;

  // Check if the role is not mentioned in UI
  if (!acc[category] || curr.price > acc[category].price) {
    acc[category] = { name: curr.name, price: curr.price };
  }
  return acc;
}, {});

console.log(GroupByHighPrice);

// {
//  electronics: {name:"Laptop",price:50000},
//  furniture: {name:"Table",price:4000}
// }
const usersWithDuplicateEmail = [
  { name: 'Ali', email: 'a@gmail.com' },
  { name: 'John', email: 'b@gmail.com' },
  { name: 'Sara', email: 'a@gmail.com' },
  { name: 'Mike', email: 'c@gmail.com' },
];

// Output
// [
//  {name:"Ali",email:"a@gmail.com"},
//  {name:"Sara",email:"a@gmail.com"}
// ]

const DuplicateEmail = usersWithDuplicateEmail.reduce((acc, curr) => {
  const key = curr.email;
  acc[key] = (acc[key] || 0) + 1;
  console.log(acc);
  return acc;
}, {});

const filteredDuplicateEmails = usersWithDuplicateEmail.filter(
  (item) => DuplicateEmail[item.email] > 1,
);

// const filteredDuplicateEmails = DuplicateEmail.filter((item) => item > 1);

console.log(filteredDuplicateEmails);

const TotalOrders = [
  {
    name: 'Ali',
    orders: [100, 200],
  },
  {
    name: 'John',
    orders: [50, 50, 100],
  },
];
const total = TotalOrders.reduce((acc, curr) => {
  return acc + curr.orders.reduce((acc, price) => acc + price, 0);
}, 0);

console.log(total);

const Index = [
  { id: 1, name: 'Ali' },
  { id: 2, name: 'John' },
  { id: 3, name: 'Sara' },
];

const IndexById = Index.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {});

console.log(IndexById);

const employees = [
  { name: 'Ali', dept: 'IT', salary: 2000 },
  { name: 'John', dept: 'IT', salary: 3000 },
  { name: 'Sara', dept: 'HR', salary: 2500 },
];

// Pass 1: Gather Totals and Counts
const deptData = employees.reduce((acc, curr) => {
  const dept = curr.dept;

  // If first time seeing this dept, initialize it
  if (!acc[dept]) {
    acc[dept] = { totalSalary: 0, count: 0 };
  }

  acc[dept].totalSalary += curr.salary;
  acc[dept].count += 1;

  return acc;
}, {});

console.log(deptData);

// deptData now looks like: { IT: { totalSalary: 5000, count: 2 }, HR: { ... } }

// Pass 2: Map the results to just the averages
const averages = {};
for (let dept in deptData) {
  averages[dept] = deptData[dept].totalSalary / deptData[dept].count;
}

console.log(averages);
// Output: { IT: 2500, HR: 2500 }

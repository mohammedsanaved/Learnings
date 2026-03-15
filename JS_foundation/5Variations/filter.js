const users = [
  { id: 1, name: 'Ali', isActive: true },
  { id: 2, name: 'John', isActive: false },
  { id: 3, name: 'Sara', isActive: true },
];

const userisActive = users.filter((user) => user.isActive);
console.log(userisActive);

const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter((even) => even % 2 === 0);
console.log(evenNumbers);

const Elect = [
  { name: 'Laptop', price: 50000 },
  { name: 'Mouse', price: 500 },
  { name: 'Monitor', price: 8000 },
];

const higherPriceProducts = Elect.filter((high) => high.price > 1000);
console.log(higherPriceProducts);

const Fruits = ['apple', 'banana', 'kiwi', 'mango'];
const LengthAbove5 = Fruits.filter((len) => len.length > 5);
console.log(LengthAbove5);

const tasks = [
  { task: 'learn JS', completed: true },
  { task: 'exercise', completed: false },
  { task: 'read book', completed: true },
];

const completedTasks = tasks.filter((task) => task.completed);
console.log(completedTasks);

const employees = [
  { name: 'Ali', age: 22, isActive: true },
  { name: 'John', age: 30, isActive: true },
  { name: 'Sara', age: 28, isActive: false },
];

const AgeAboveisActive = employees.filter((a) => a.age > 25 && a.isActive);
console.log(AgeAboveisActive);

const emails = [
  { email: 'a@gmail.com' },
  { email: 'invalidEmail' },
  { email: 'b@yahoo.com' },
];

const validEmails = emails.filter((v) => {
  const e = v.email;
  return (
    e.includes('@') && e.includes('.') && e.indexOf('@') < e.lastIndexOf('.')
  );
});
console.log(validEmails);

const prices = [100, 200, 300, 400];

const leng = prices.length;
const Average = prices.reduce((acc, cur) => acc + cur, 0) / leng;
const AveragePrice = prices.filter((p) => p > Average);
console.log(AveragePrice);

const duplicates = [1, 2, 2, 3, 4, 4, 5];

const uniqueValues = duplicates.filter(
  (num, i) => duplicates.indexOf(num) === duplicates.lastIndexOf(num),
);
console.log(uniqueValues);

const stocks = [
  { name: 'Laptop', category: 'electronics', stock: 5 },
  { name: 'Chair', category: 'furniture', stock: 10 },
  { name: 'Phone', category: 'electronics', stock: 0 },
];

const electronicStocks = stocks.filter(
  (s) => s.stock > 0 && s.category === 'electronics',
);
console.log(electronicStocks);

const lastLogin = [
  { name: 'Ali', lastLogin: 2 },
  { name: 'John', lastLogin: 10 },
  { name: 'Sara', lastLogin: 5 },
];

const sevenDays = lastLogin.filter((last) => last.lastLogin < 10);
console.log(sevenDays);

const jobFilter = [
  { name: 'Dev1', tags: ['frontend', 'react'] },
  { name: 'Dev2', tags: ['backend'] },
  { name: 'Dev3', tags: ['frontend', 'node'] },
];

const frontEndJobs = jobFilter.filter((job) => job.tags.includes('frontend'));
console.log(frontEndJobs);

const number = [1, 2, 3, 4, 5, 6, 7];

const isPrime = (num) => {
  if (num <= 1) return false; // 1 is not prime
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false; // Found a divisor
  }
  return true;
};
console.log(number.filter(isPrime));

const invalidData = [{ name: 'Ali', age: 25 }, { name: 'John' }, { age: 30 }];

const validData = invalidData.filter((data) => data.name && data.age);
console.log(validData);

const dupl = [1, 2, 2, 3, 4, 4, 5];
const unique = dupl.filter((un, i) => dupl.indexOf(un) === i);
console.log(unique);

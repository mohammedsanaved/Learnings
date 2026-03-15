const data = [1, 2, 3, 4];

const double = data.map((num) => num * 2);
console.log(double);

const One = [
  { id: 1, name: 'Ali' },
  { id: 2, name: 'John' },
];

const names = One.map((n) => n.name);
console.log(names);

const price = [100, 200, 300];
const addTax = price.map((tax) => tax + (tax * 10) / 100);
console.log(addTax);

const fruits = ['apple', 'banana'];
const changeToUpperCase = fruits.map((fru) => fru.toUpperCase());
console.log(changeToUpperCase);

const dataPerson = [
  { id: 1, name: 'Ali', age: 22 },
  { id: 2, name: 'John', age: 30 },
];

const PersonName = dataPerson.map(({ name }) => ({ name: name }));
console.log(PersonName);

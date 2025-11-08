// =============================== Normal function ===============================
function calculateDiameter(arrRadius) {
  const result = [];
  for (let i = 0; i < arrRadius.length; i++) {
    result.push(arrRadius[i] * 2);
  }
  return result;
}

console.log(calculateDiameter([1, 2, 3, 4]));

// =============================== Higher Order Component ===============================
function Diameter(radius) {
  return radius * 2;
}

function calculate(arrRadius) {
  const result = [];
  for (let i = 0; i < arrRadius.length; i++) {
    result.push(Diameter(arrRadius[i]));
  }
  return result;
}

console.log(calculate([1, 2, 3, 4]));

let num1 = [1, 2, 3, 4, 5, 6];

console.log(num1.map(Diameter));

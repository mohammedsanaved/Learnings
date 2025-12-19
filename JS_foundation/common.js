// rotateRight(arr, r) { ... }

function rotateRight(arr, r) {
  const n = arr.length;
  for (let i = 0; i < r; i++) {
    let result = arr.pop();
    console.log(result);
    arr.unshift(result);
  }
  return arr;
}

console.log(rotateRight([1, 2, 3, 4, 5], 2));

let nums = [1, 1, 2, 3, 4, 4, 55, 6, 7, 7];
var removeDuplicates = function (nums) {
  let result = [];
  if (nums.length === 0) return result;
  result.push(nums[0]);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] != nums[i - 1]) {
      result.push(nums[i]);
    }
  }
  return result;
};

console.log(removeDuplicates(nums));

function ReverseStr(str) {
  return str.split('').reverse().join('');
}
console.log(ReverseStr('hello world'));

function anagramTest(str1, str2) {
  const sortedStr1 = str1.split('').sort().join('');
  const sortedStr2 = str2.split('').sort().join('');
  if (sortedStr1 === sortedStr2) {
    return true;
  } else {
    return false;
  }
}
console.log(anagramTest('gum', 'mug'));

function count(str) {
  let vowels = ['a', 'e', 'i', 'o', 'u'];
  let strArray = str.toLowerCase().split('');
  console.log(strArray);

  let start = vowels[0];
  let count = 0;
  for (let i = 0; i <= strArray.length; i++) {
    for (let j = 0; j <= vowels.length; j++) {
      if (strArray[i] == vowels[j]) {
        count++;
      }
      return { vowels: count };
    }
  }
}
console.log(count('jAvascript'));

function longword(str) {
  let ArrStr = str.split(' ');
  let longestWord = str[0];

  for (let x = 1; x < ArrStr.length; x++) {
    let currentWord = ArrStr[x];
    if (currentWord.length > longestWord.length) {
      longestWord = currentWord;
    }
  }
  return longestWord;
}
console.log(longword('i am green'));

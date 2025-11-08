const promise1 = Promise.resolve(3);
// const promise2 = 42 // A non-promise value is treated as an already-resolved promise
const promise2 = Promise.resolve(42);
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values, 'Values'); // Expected output: [3, 42, "foo"]
  })
  .catch((error) => {
    console.error(error, 'Error'); // This block will execute if any of the promises reject
  });

Promise.race([promise1, promise2, promise3])
  .then((value) => {
    console.log(value, 'Value'); // Expected output: 42
  })
  .catch((error) => {
    console.error(error, 'Error'); // This block will execute if any of the promises reject
  });

const myPromise = new Promise(async (resolve, reject) => {
  try {
    const response = await fetch(
      'https://api.github.com/users/mohammedsanaved'
    );
    const data = await response.json();
    resolve(data);
    console.log(data);
  } catch (error) {
    reject(error);
    console.log(error, 'Error');
  }
});

console.log(myPromise, 'My Promise');

const myPromise1 = new Promise(async (resolve, reject) => {
  try {
    const response = await fetch('https://api.github.com/users/google');
    const data = await response.json();
    resolve(data);
    console.log(data);
  } catch (error) {
    reject(error);
    console.log(error, 'Error');
  }
});

console.log(myPromise1, 'My Promise');

const myPromise2 = new Promise(async (resolve, reject) => {
  try {
    const response = await fetch('https://api.github.com/users/apple');
    const data = await response.json();
    resolve(data);
    console.log(data);
  } catch (error) {
    reject(error);
    console.log(error, 'Error');
  }
});

console.log(myPromise2, 'My Promise');

Promise.all([myPromise, myPromise1, myPromise2])
  .then((values) => {
    console.log(values, 'Values of API'); // Expected output: [3, 42, "foo"]
  })
  .catch((error) => {
    console.error(error, 'Error'); // This block will execute if any of the promises reject
  });

// ------------------------------------- Custom Promise Implementation -----------------------------------------------------

function customPromiseAll(promises) {
  // Check if input is iterable
  if (typeof promises[Symbol.iterator] !== 'function') {
    throw new TypeError('customPromiseAll: argument is not iterable');
  }

  const promisesArray = Array.from(promises);
  const total = promisesArray.length;

  // Handle empty input immediately
  if (total === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    const results = new Array(total);
    let resolvedCount = 0;
    let rejected = false; // Flag to prevent multiple rejections

    for (let i = 0; i < total; i++) {
      const current = promisesArray[i];

      Promise.resolve(current)
        .then((value) => {
          // Skip if already rejected
          if (rejected) return;

          results[i] = value;
          resolvedCount++;

          // Resolve when all promises are done
          if (resolvedCount === total) {
            resolve(results);
          }
        })
        .catch((reason) => {
          // Reject only once on first error
          if (!rejected) {
            rejected = true;
            reject(reason);
          }
        });
    }
  });
}
customPromiseAll([myPromise, myPromise1, myPromise2])
  .then((values) => {
    console.log(values, 'Custom MyPromiseAll Values of API');
  })
  .catch((error) => {
    console.error(error, 'Custom MyPromiseAll Error');
  });

// ------------------------------- Promise .race Custom Implementation -----------------------------------------------------

function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
}

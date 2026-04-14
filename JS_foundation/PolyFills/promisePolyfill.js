Promise.MyAll = function (promises) {
  // return the promise which will resolve
  return new Promise((resolve, reject) => {
    if (!promises || promises.length === 0) {
      return resolve([]);
    }
    // Store the result of each promise in an array and count the number of resolved promises
    let result = new Array(promises.length);
    let count = 0;
    // Loop through each promise and resolve it, if any promise is rejected, reject the entire promise
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          // Store the result of each promise in the result array at the corresponding index
          result[index] = res;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = Promise.resolve(3);

Promise.MyAll([p1, p2, p3]).then((res) => {
  console.log(res); // [1, 2, 3]
});

Promise.MySellted = function (promises) {
  return new Promise((resolve) => {
    if (!promises || promises.length === 0) {
      return resolve([]);
    }

    const result = new Array(promises.length);
    let settledCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          result[index] = { status: 'fulfilled', value: res };

          if (settledCount === promises.length) {
            resolve(result);
          }
        })
        .catch((error) => {
          result[index] = { status: 'rejected', reason: error };
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            resolve(result);
          }
        });
    });
  });
};

Promise.MySellted([p1, p2, p3]).then((res) => {
  console.log(res); // [{ status: 'fulfilled', value: 1 }, { status: 'fulfilled', value: 2 }, { status: 'fulfilled', value: 3 }]
});

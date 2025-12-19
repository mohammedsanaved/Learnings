// | Variation               | Description                                  |
// | ----------------------- | -------------------------------------------- |
// | Custom `Promise.all()`  | Resolve when all promises succeed            |
// | Custom `Promise.race()` | Return first settled promise                 |
// | Retry Failed Request    | Retry API call max 3 times                   |
// | Promise Timeout         | Reject promise if it exceeds X seconds       |
// | Sequence Runner         | Run promises in sequence instead of parallel |

// ------------------------------- Promise .all Custom Implementation -----------------------------------------------------
//Custom `Promise.all`

function myPromiseAll(promises) {
  // Check if input is iterable
  if (typeof promises[Symbol.iterator] !== 'function') {
    throw new TypeError('myPromiseAll: argument is not iterable');
  }

  const promisesArray = Array.from(promises);
  console.log(promisesArray, '----------------------PromisesArray');
  const total = promisesArray.length;

  return new Promise((resolve, reject) => {
    let resolvedCount = 0;
    const results = new Array(total);
    console.log(results, '---------------------------results');
    const rejectPromise = false;

    if (total === 0) {
      resolve(results);
      return;
    }
    for (let i = 0; i < promisesArray.length; i++) {
      const current = promisesArray[i];
      Promise.resolve(current)
        .then((value) => {
          if (rejectPromise) return;
          results[i] = value;
          resolvedCount++;
          if (resolvedCount === total) {
            resolve(results);
          }
        })
        .catch((reason) => {
          if (!rejectPromise) {
            rejectPromise = true;
            reject(reason);
          }
        });
    }
  });
}

// Custom `Promise.race()`
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
}

// This function simulates an API call that has a 70% chance of failing.
function mockApiCall() {
  console.log('Attempting to fetch data...');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        // 70% chance to fail
        reject(new Error('Network Error: Failed to fetch data.'));
      } else {
        // 30% chance to succeed
        resolve({ data: 'Here is your payload!', status: 200 });
      }
    }, 1000); // Simulates 1-second network delay
  });
}

/**
 * Tries to execute a promise-returning function and retries on failure.
 * @param {Function} promiseFn The function that returns a promise (e.g., our mockApiCall).
 * @param {number} maxRetries The maximum number of retries.
 */
function fetchWithRetry(promiseFn, maxRetries = 3) {
  // We start with the first attempt, so the number of "retries" left is maxRetries - 1
  let retriesLeft = maxRetries;

  return new Promise((resolve, reject) => {
    // The recursive "attempt" function
    const attempt = () => {
      promiseFn()
        .then(resolve) // Success: resolve the main promise, ending the process.
        .catch((err) => {
          // Failure: check if we should retry.
          retriesLeft--;
          console.log(`Attempt failed. Retries left: ${retriesLeft}`);

          if (retriesLeft <= 0) {
            // Failure Base Case: No retries left, reject the main promise.
            console.log('No more retries. Final failure.');
            reject(err);
          } else {
            // Recursive Step: Retries are left, so try again.
            console.log('Retrying...');
            setTimeout(attempt, 1500); // Optional: wait a bit before retrying
          }
        });
    };
    // Kick off the first attempt
    attempt();
  });
}

// --- How to use it ---
fetchWithRetry(mockApiCall, 3)
  .then((response) => {
    console.log('✅ Success!', response);
  })
  .catch((error) => {
    console.error('❌ Final Failure after all retries:', error.message);
  });

function PromiseTimeout(promise, timeoutDuration) {
  let timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Promise timed out after ' + timeoutDuration + ' ms'));
    }, timeoutDuration);
  });

  return Promise.race([promise, timeoutPromise]);
}

// Example usage of PromiseTimeout
let samplePromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Sample Promise Resolved!');
  }, 2000); // Resolves after 2 seconds
});

PromiseTimeout(samplePromise, 3000)
  .then((result) => {
    console.log(result); // Expected output: 'Sample Promise Resolved!'
  })
  .catch((error) => {
    console.error(error.message);
  });

myPromiseRace([
  samplePromise,
  new Promise((resolve) =>
    setTimeout(() => resolve('Fast Promise Resolved!'), 2000)
  ),
])
  .then((result) => {
    console.log(result); // Expected output: 'Fast Promise Resolved!'
  })
  .catch((error) => {
    console.error(error.message);
  });

const SequencedPromises = (tasks) => {
  let result = [];
  const initialPromise = Promise.resolve();
  const finalPromise = tasks.reduce((promiseChain, currentTask) => {
    return promiseChain.then(() => {
      return currentTask().then((res) => {
        result.push(res);
      });
    });
  }, initialPromise);
  return finalPromise.then(() => result);
};

// Example usage of SequencedPromises
const asyncTask1 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Task 1 Resolved!');
    }, 2000); // Resolves after 2 seconds
  });
};

const asyncTask2 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Task 2 Resolved!');
    }, 1000); // Resolves after 1 second
  });
};
const asyncTask3 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Task 3 Resolved!');
    }, 4000);
  });
};

SequencedPromises([asyncTask1, asyncTask2, asyncTask3])
  .then((results) => {
    console.log('All tasks completed in sequence:', results);
  })
  .catch((error) => {
    console.error('Error in executing tasks:', error);
  });

myPromiseAll([samplePromise, asyncTask1(), asyncTask2()])
  .then((values) => {
    console.log(values, 'Values from myPromiseAll');
  })
  .catch((error) => {
    console.error(error, 'Error from myPromiseAll');
  });

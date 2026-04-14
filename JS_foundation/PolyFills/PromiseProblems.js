const p = new Promise((res) => setTimeout(() => res('Done'), 2000));

function promiseWithTimeout(promise, timeout) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('Timeout'));
    }, timeout);
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
// promiseWithTimeout(p, 1000).then(console.log).catch(console.error); // "Timeout"
console.log(
  promiseWithTimeout(p, 3000)
    .then((v) => console.log(v))
    .catch((e) => console.log(e)),
);

function promiseWithTimeoutRace(promise, timeout) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeout);
  });
  clearInterval(timeoutPromise);
  return Promise.race([promise, timeoutPromise]).finally(() =>
    clearInterval(timeoutPromise),
  );
}

console.log(promiseWithTimeoutRace(p, 4000));

function retryPromise(promiseFactory, retries = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    const retry = (attempt) => {
      promiseFactory()
        .then(resolve)
        .catch((err) => {
          if (attempt <= retries) {
            setTimeout(() => retry(attempt + 1), delay);
          } else {
            reject(err);
          }
        });
    };
    retry(1);
  });
}

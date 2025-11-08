let counter = 0;
const getData = () => {
  return console.log(`Changing the ${counter}`, counter++);
};

function fireEvent(fun, delay) {
  let timer;
  return function () {
    let context = this;
    args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(context, arguments);
    }, delay);
  };
}

function debounce(fun, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(this, args);
    }, delay);
  };
}

function throttle(func, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const newChangesDebounce = debounce(getData, 500);
const magicWithDebounce = fireEvent(getData, 500);
const newThrottle = throttle(getData, 1000);

const addtoLocalStorage = () => {
  const inputBox = document.getElementById('autoSave');
  localStorage.setItem('autoSaveData', inputBox.value);
  console.log('Data saved to localStorage:', inputBox.value);
};

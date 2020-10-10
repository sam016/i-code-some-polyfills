const someThrottle = require('../some-throttle');

test('someThrottle should return a function', () => {
  expect(someThrottle(() => { }, 0)).toBeInstanceOf(Function);
});

test('someThrottle should throw error for -ve duration', () => {
  expect(() => someThrottle(() => { }, -1)).toThrowError('Duration should be valid positive number.');
});

test('someThrottle is called only 1 times in 100ms ', () => {
  let counter = 0;

  // increase the counter
  const incrementCounter = someThrottle(() => counter++, 100);

  incrementCounter();
  incrementCounter(); // this call would be throttled

  // counter should be only 1
  expect(counter).toBe(1);
});

test('someThrottle is called only 2 times in 101ms ', (cb) => {
  let counter = 0;

  // increase the counter
  const incrementCounter = someThrottle(() => counter++, 100);

  incrementCounter();
  incrementCounter(); // this call would be throttled

  // call throttle after 100ms
  setTimeout(() => {
    incrementCounter();
    incrementCounter(); // this call would be throttled

    // counter should be only 1
    expect(counter).toBe(2);

    cb();
  }, 100);
});

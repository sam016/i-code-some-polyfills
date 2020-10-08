const someDebounce = require('../some-debounce');

test('Debounce should return a function', () => {
  expect(someDebounce(() => { }, 100)).toBeInstanceOf(Function);
});

test('Debounce should throw error if timestamp is less then zero', () => {
  expect(() => someDebounce(() => { }, -1)).toThrowError('Duration can\'t be negative');
});

test('Debounce should be called only after 100ms', (cb) => {
  const deb = someDebounce(() => {
    const et = new Date();

    // get diff in ms from start to end
    const diffTicks = et.getTime() - st.getTime();

    expect(diffTicks).toBeGreaterThanOrEqual(100);

    // there is 2ms delay due to setup and initialization
    expect(diffTicks).toBeLessThanOrEqual(102);

    // success callback
    cb();
  }, 100);

  const st = new Date();
  deb();
});

test('Debounce should be called only after 100ms from latest call', (cb) => {
  let st;

  const deb = someDebounce(() => {
    const et = new Date();

    // get diff in ms from start to end
    const diffTicks = et.getTime() - st.getTime();

    expect(diffTicks).toBeGreaterThanOrEqual(100);

    // there is 2ms delay due to setup and initialization
    expect(diffTicks).toBeLessThanOrEqual(102);

    // success callback
    cb();
  }, 100);

  // 1st call
  deb();

  setTimeout(() => {
    st = new Date();

    // 2nd call
    deb();
  }, 50);
});

test('Debounce should receive the latest arguments from the latest call', (cb) => {
  const deb = someDebounce((name) => {

    // assert that the name is the latest one
    expect(name).toBe('Naruto');

    // success callback
    cb();
  }, 100);

  // 1st call
  deb('DBZ');

  setTimeout(() => {
    // 2nd call
    deb('Naruto');
  }, 50);
});

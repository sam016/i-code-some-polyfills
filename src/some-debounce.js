
const someDebounce = (fx, ts) => {
  if (ts < 0) {
    throw new Error('Duration can\'t be negative');
  }

  let setTimeoutId = 0;

  return function() {
    const args = arguments;
    const self = this;

    // clear the previous timeout if present
    clearTimeout(setTimeoutId);

    // starts a new timeout
    setTimeoutId = setTimeout(() => {
      fx.apply(self, args);
    }, ts);
  };
}

module.exports = { someDebounce };

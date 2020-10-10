
/**
 * Throttles the function so that it can be called at most once every 'n' time duration.
 *
 * @param {function} cb Actual function to be called
 * @param {number} duration Duration (in ms) during which actual function can't be invoked again
 */
const someThrottle = (cb, duration) => {

  // callback should be a function
  if (typeof cb !== 'function') {
    throw new Error('Callback should be a function')
  }

  // duration should be a valid positive number
  if (!(duration >= 0)) {
    throw new Error('Duration should be valid positive number.')
  }

  let isThrottled = false;

  return function () {
    if (isThrottled) {
      return;
    }

    const args = arguments;
    const context = this;

    // invoke the function
    cb.apply(context, args);

    // throttle any next calls
    isThrottled = true;

    // reset the throttle once the throttle/freeze time(duration) is complete
    setTimeout(() => (isThrottled = false), duration);
  };
};

module.exports = someThrottle;

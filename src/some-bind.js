
function someBind(newThis) {
  const fx = this;

  if (typeof (fx) !== 'function') {
    throw new Error('Invalid function');
  }
  // get the remaining arguments after `newThis`
  const boundedArgs = Array.prototype.slice.call(arguments, 1);

  return function () {
    const args = boundedArgs.concat(Array.prototype.slice.call(arguments, 0));
    const result = fx.call(newThis, args);
    return result;
  };
}

// eslint-disable-next-line no-extend-native
Function.prototype.someBind = someBind;

module.exports = someBind;

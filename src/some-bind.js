
function someBind(fx, newThis) {
  if (typeof (fx) !== 'function') {
    throw new Error('Invalid function');
  }
  // get the remaining arguments after `newThis`
  const boundedArgs = Array.prototype.slice.call(arguments, 2);

  return function () {
    const args = boundedArgs.concat(Array.prototype.slice.call(arguments, 0));
    const result = Function.prototype.apply.call(fx, newThis, args);
    return result;
  };
}

// eslint-disable-next-line no-extend-native
Function.prototype.someBind = someBind;

module.exports = someBind;

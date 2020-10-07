const someBind = require('../some-bind');

test('someBind should return a new function', () => {
  const dbz = {
    whoAmI: function () { },
  };
  const naruto = {
    whoAmI: function () { },
  };

  expect(someBind(dbz.whoAmI, naruto)).toBeInstanceOf(Function);
});

test('someBind should return correct data in context', () => {
  const dbz = {
    me: 'dbz',
    whoAmI: function () {
      return this.me;
    },
  };
  const naruto = {
    me: 'naruto',
    whoAmI: function () {
      return this.me;
    },
  };

  const newFx = someBind(dbz.whoAmI, naruto);

  expect(newFx()).toBe('naruto');
});

test('someBind should return correct data in context along with arguments', () => {
  const dbz = {
    me: 'dbz',
    whoAmI: function () {
      return this.me + '>' + Array.prototype.join.call(arguments);
    },
  };
  const naruto = {
    me: 'naruto',
    whoAmI: function () {
      return this.me + '>' + Array.prototype.join.call(arguments);
    },
  };

  const newFx = someBind(dbz.whoAmI, naruto, 'ninja');

  expect(newFx('leaf', 'hokage')).toBe('naruto>ninja,leaf,hokage');
});


test('someBind should throw invalid function when invalid function is passed', () => {
  const dbz = {
    me: 'dbz',
  };
  const naruto = {
    me: 'naruto',
  };

  expect(() => {
    someBind(dbz, naruto);
  }).toThrowError('Invalid function');
});

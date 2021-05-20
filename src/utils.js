module.exports = {
  parseDisplayDiff: (value) => { return String(value / 2).replace('.5', '+'); },
  parseIntFromDiff: (value) => { return parseFloat(value.replace('+', '.5')) * 2; },
};

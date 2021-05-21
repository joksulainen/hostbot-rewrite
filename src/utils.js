'use strict';

const parseDisplayDiff = (value) => String(value / 2).replace('.5', '+');

const parseIntFromDiff = (value) => parseFloat(value.replace('+', '.5')) * 2;

module.exports = {
  parseDisplayDiff,
  parseIntFromDiff,
};

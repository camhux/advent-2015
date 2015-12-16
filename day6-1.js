'use strict';
var fs = require('fs');
var assert = require('assert');

var input = fs.readFileSync(process.argv[2], {encoding: 'utf8'}).split('\n');
var lawn = makeLawn(1000);

const START = 0;
const END = 1;

const X = 0;
const Y = 1;

input.forEach(function(line) {
  if (line === '') return;
  var action = parseAction(line);
  var coords = getCoords(line);

  for (var i = coords[START][Y]; i <= coords[END][Y]; i++) {
    for (var j = coords[START][X]; j <= coords[END][X]; j++) {
      assert(typeof lawn[i][j] === 'boolean');
      lawn[i][j] = action(lawn[i][j]);
    }
  }
});

var sum = lawn.reduce(function(sum, row) {
  assert(Array.isArray(row));
  return sum + row.reduce(function(sum, bool) {
    assert(typeof bool === 'boolean');
    if (bool) return sum + 1;
    return sum;
  }, 0);
}, 0);

process.stdout.write(sum.toString());

function getCoords(line) {
  var tuples = line
    .match(/(\d{1,3},\d{1,3}).*?(\d{1,3},\d{1,3})/)
    .slice(1)
    .map(string => string.split(',').map(string => parseInt(string, 10)));

  return tuples;
}

function parseAction(line) {
  switch (line.charAt(6)) {
  case 'n':
    return on;
  case 'f':
    return off;
  case ' ':
    return toggle;
  }
}

function on() {
  return true;
}

function off() {
  return false;
}

function toggle(x) {
  return !x;
}

function makeLawn(n) {
  if (n < 0) return;
  return Array.apply(null, Array(n)).map(() => Array.apply(null, Array(n)).map(() => false));
}

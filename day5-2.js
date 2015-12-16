'use strict';
var fs = require('fs');

var strings = fs.readFileSync(process.argv[2], {encoding: 'utf8'}).split('\n');

var nice = strings.reduce(foldNice, 0);
var niceS = strings.filter(function(string) {
  return isNice(string);
});

process.stdout.write(nice.toString());

function hasTriplet(string) {
  for (var i = 0; i < string.length - 2; i++) {
    if (string[i] === string[i+2])
      return true;
  }
  return false;
}

function hasPairs(string) {
  var mem = Object.create(null);
  var i, pair, tuple, key, bucket;

  for (i = 0; i < string.length - 1; i++) {
    pair = [string[i], string[i+1]];
    tuple = [i, i+1];
    key = pair.toString();
    bucket = mem[key] || [];
    mem[key] = bucket;
    if (last(bucket)[1] === tuple[0]) continue;
    bucket.push(tuple);
  }

  for (key in mem) {
    bucket = mem[key];
    if (bucket.length > 1) {
      return true;
    }
  }

  return false;

  function last(array) {
    return array.length && array[array.length - 1];
  }

  function overlaps(a) {
    return function(b) {
      return a[0] === b[1];
    };
  }

}

function isNice(string) {
  return (hasTriplet(string) && hasPairs(string));
}

function foldNice(sum, string) {
  if (isNice(string)) sum += 1;
  return sum;
}

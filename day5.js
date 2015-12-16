'use strict';
var fs = require('fs');

var strings = fs.readFileSync(process.argv[2], {encoding: 'utf8'}).split('\n');

var nice = strings.reduce(foldNice, 0);

console.log(nice);

function hasThreeVowels(string) {

  var pattern = /[aeiou]/;

  for (var i = 0, vowels = 0; i < string.length; i++) {
    if (pattern.test(string[i])) {
      vowels += 1;
      if (vowels === 3) return true;
    }
  }

  return false;
}

function hasPair(string) {
  for (var i = 1; i < string.length; i++) {
    if (string[i] === string[i - 1]) return true;
  }
  return false;
}

function isNice(string) {
  return (hasThreeVowels(string) && hasPair(string) && !/(ab|cd|pq|xy)/.test(string));
}

function foldNice(sum, string) {
  if (isNice(string)) sum += 1;
  return sum;
}

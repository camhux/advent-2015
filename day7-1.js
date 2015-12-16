'use strict';
var fs = require('fs');

var input = fs.readFileSync(process.argv[2], {encoding: 'utf8'}).split('\n');

var ns = Object.create(null);

var dict = {
  'AND': '&&',
  'OR': '||',
  'LSHIFT': '<<',
  'RSHIFT': '>>',
  'NOT': '~'
};

var mapWordToOperator = function(word) {
  return dict[word];
};

var parseLineToAtoms = function(line) {
  var split = line.split('->');
  var LH = split[1].trim();
  var RH = split[0].trim().split(' ');

  // words.forEach(word => {
  //   if (RH.includes(word)) {
  //     RH = RH.replace(word, dict[word]);
  //   }
  // });

  console.log(LH, RH);
};

// main
var commands = input.map(parseLineToAtoms);

console.log(ns);

process.stdout.write(ns.a.toString());

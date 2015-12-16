'use strict';
var fs = require('fs');

var input = fs.readFileSync(process.argv[2], {encoding: 'utf8'}).split('\n');

var ns = Object.create(null);

var dict = {
  'AND': '&',
  'OR': '|',
  'LSHIFT': '<<',
  'RSHIFT': '>>',
  'NOT': '~'
};

var mapWordToOperator = function(word) {
  return dict[word];
};

var prependIdentifiers = function(array) {
  return array.map(atom => {
    if (atom.match(/[a-z]{1,2}/)) {
      return 'ns.' + atom;
    } else {
      return atom;
    }
  });
};

var parseOperators = function(array) {
  return array.map(atom => {
    if (atom in dict) {
      return mapWordToOperator(atom);
    } else {
      return atom;
    }
  });
};

var parseLineToAtoms = function(line) {
  var split = line.split('->');
  var LH = 'ns.' + split[1].trim();
  var RH = split[0].trim().split(' ');
  RH = parseOperators(prependIdentifiers(RH));

  return [LH, RH];
};

// main
var commands = input.map(parseLineToAtoms);

while (commands.length > 0) {
  console.log(commands.length);
  commands = commands.filter(array => {
    var LH = array[0];
    var RH = array[1];
    console.log(RH);

    switch (RH.length) {
    case 1:
      eval(LH + ' = ' + RH.join(' '));
      return false;
    case 2:
      if (eval(RH[1]) == null) {
        return true;
      } else {
        eval(LH + ' = ' + RH.join(' '));
        return false;
      }
      break;
    case 3:
      if (eval(RH[0]) == null || eval(RH[2]) == null) {
        return true;
      } else {
        eval(LH + ' = ' + RH.join(' '));
        return false;
      }
      break;
    }
  });
}

console.log(ns);

process.stdout.write(ns.a.toString());

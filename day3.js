var fs = require('fs');

var instructionFile = process.argv[2];

var instructionStream = fs.createReadStream(instructionFile, {encoding: 'utf8'});

var coordsA = {name: 'Santa', x: 0, y: 0};
var coordsB = {name: 'Robo-Santa', x: 0, y: 0};

var santa = true;

var map = {};

visitHouse(map, coordsA);

instructionStream.on('data', function(instructions) {
  var char, coords;

  for (char of instructions) {
    coords = santa ? coordsA : coordsB;
    parseInstruction(char, coords);
    visitHouse(map, coords);
    santa = !santa;
  }

});

instructionStream.on('end', function() {
  console.log(Object.keys(map).length);
});

function parseInstruction(char, coords) {
  switch (char) {
  case '>':
    coords.x += 1;
    break;
  case '<':
    coords.x -= 1;
    break;
  case '^':
    coords.y += 1;
    break;
  case 'v':
    coords.y -= 1;
    break;
  }
}

function visitHouse(map, coords) {
  var key = `${coords.x}, ${coords.y}`;
  if (map[key] == null) {
    map[key] = 0;
  }
  map[key] += 1;
}

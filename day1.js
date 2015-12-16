'use strict';

var fs = require('fs');

var instStream = fs.createReadStream(process.argv[2]);

var floor = 0;
var descended = false;

instStream.on('data', function(data) {
  var instructions = data.toString().split('');
  console.log(instructions);
  instructions.forEach((char, i) => {

    if (char === '(')
      floor += 1;
    else if (char === ')')
      floor -= 1;

    if (floor === -1 && !descended) {
      descended = true;
      console.log(floor);
      console.log(`First descended at char ${i + 1}`);
    }

  });
});

instStream.on('end', function() {
  console.log(floor);
});

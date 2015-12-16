'use strict';
var fs = require('fs');

var inputStream = fs.createReadStream(process.argv[2]);
inputStream.setEncoding('utf8');

var input = '';

inputStream.on('data', function(chunk) {
  input += chunk;
});

inputStream.on('end', function() {
  var measurements = input.split('\n');

  var paper = measurements.reduce(function(sum, string) {
    return sum + getWrappingPaper(...string.split('x').map(mapToInt));
  }, 0);

  var ribbon = measurements.reduce(function(sum, string) {
    return sum + getRibbon(...string.split('x').map(mapToInt));
  }, 0);

  // console.log(sum);
  process.stdout.write(`Paper: ${paper} sqft. Ribbon: ${ribbon} sqft.`);
});

function getWrappingPaper(l, w, h) {
  var sides = [(2 * l * w), (2 * w * h), (2 * l * h)];
  var extra = Math.min(...sides) / 2;

  return sides.reduce((sum, side) => sum + side, extra);
}

function getRibbon(l, w, h) {
  var cubic = l * w * h;
  var wrap = 2 * Math.min((l + w), (w + h), (l + h));
  console.log(l, w, h, cubic, wrap);

  return cubic + wrap;
}

function mapToInt(n) {
  return parseInt(n, 10);
}

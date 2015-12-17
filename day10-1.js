'use strict';

let val = process.argv[2];
let iterations = +process.argv[3];

let lookAndSay = function(string) {
  let charArray = string.split('');
  let outCharArray = [];

  let runChar = charArray[0];
  let runLength = 1;

  charArray.slice(1).forEach((char, i, array) => {
    if (char !== runChar) {
      outCharArray.push(runLength.toString());
      outCharArray.push(runChar);
      runChar = char;
      runLength = 1;
    } else {
      runLength += 1;
    }
  });

  outCharArray.push(runLength.toString());
  outCharArray.push(runChar);

  return outCharArray.join('');
};

while (iterations) {
  val = lookAndSay(val);
  iterations -= 1;
}
// console.log(val);
process.stdout.write(val.length.toString());

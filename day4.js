var crypto = require('crypto');
var ALGORITHM = 'md5';

var secret = process.argv[2];
var magnitude = +process.argv[3];

var salt = 0;
var digest = '';
var hash;

if (!(secret && magnitude)) process.exit(1);

while (!isAdventCoin(digest)) {
  hash = crypto.createHash(ALGORITHM);
  hash.write(secret + salt);
  hash.end();
  digest = hash.setEncoding('utf8').read();
  salt += 1;
}

console.log(salt - 1);

function isAdventCoin(digest) {
  if (digest.length < magnitude) return false;

  var substr = digest.substr(0, magnitude);

  for (var char of substr) {
    if (char !== '0') return false;
  }

  return true;
}

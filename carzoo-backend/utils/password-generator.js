const crypto = require('crypto');

exports.generatePassword = (
  length = 8,
  wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$'
) =>
  Array.from(crypto.randomFillSync(new Uint16Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join('');

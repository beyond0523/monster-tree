'use strict';

const path = require('path');

function resolveCwd(...args) {
  console.log(args, process.cwd(), 'aaa');
  args.unshift(process.cwd());
  return path.join(...args);
}

console.log(resolveCwd('./babel.config.js'))

module.exports = resolveCwd;


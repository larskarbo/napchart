/**

This module handles loggin
Uses winston

**/

var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      prettyprint: true,
      colorize: true,
      json: true
    }),
    new (winston.transports.File)({
      filename: './log/warn.log',
      level: 'warn',
      json: false
    })
  ]
});
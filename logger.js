/**

This module handles loggin
Uses winston

**/

var winston = require('winston');
var fs = require('fs');
var logDir = './log';

if ( !fs.existsSync( logDir ) ) {
	// Create the directory if it does not exist
	fs.mkdirSync( logDir );
}

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      prettyprint: true,
      colorize: true
    }),
    new (winston.transports.File)({
      filename: logDir + '/warn.log',
      level: 'warn',
      json: false
    })
  ]
});

module.exports = logger;
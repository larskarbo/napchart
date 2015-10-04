/**

This module handles database config

**/

var install = {};

install.setup = function(callback){


	var prompt = require('prompt'),
	logger = require('./logger.js'),
	fs = require('fs'),
	nconf = require('nconf');

	nconf.argv()
	.file({ file: 'config.json' });

	var questions = [
	{
		name: 'mysql:host',
		description: 'MySQL host',
		default: nconf.get('mysql:host') || 'localhost',
		required: true
	},
	{
		name: 'mysql:port',
		description: 'MySQL port',
		default: nconf.get('mysql:port') || '3306'
	},
	{
		name: 'mysql:database',
		description: 'MySQL database name',
		default: nconf.get('mysql:database') || 'napchart',
		required: true
	},
	{
		name: 'mysql:user',
		description: 'MySQL user to access database',
		default: nconf.get('mysql:user') || 'napchart'
	},
	{
		name: 'mysql:password',
		description: 'MySQL user password',
		default: nconf.get('mysql:password'),
		hidden: true
	}
	];

	logger.info('Napchart Setup Triggered via Command Line');

	logger.info('Welcome to Napchart!');
	logger.info('This interactive setup will create a config.json file with your mysql connection credentials');
	logger.info('Press enter to accept the default setting (shown in brackets).');

	prompt.start();
	prompt.get(questions, function (err, result) {

		for(var question in result){
			nconf.set(question,result[question]);
		}

		nconf.save(function (err) {
			if(err){
				logger.error(err);
			}


			if(nconf.get('mysql')){
				logger.info('Config completed successfully');
				logger.info('To create tables, please run node script --create-tables');

				return callback();
			}
		});


	});

}

install.createTables = function(callback){

	var prompt = require('prompt');
	var nconf = require('nconf');
	var Sequelize = require('sequelize');
	var sequelize;
	var credentials;
	var logger = require('./logger.js')

	nconf.argv()
	.file({ file: 'config.json' });

	if(!nconf.get('mysql')){
		logger.error('No credentials found. Please run node script --setup');

		return callback();
	}

	var questions = [
	{
		name: 'force',
		description: 'Do you want to remove existing tables before you create new ones?',
		default: nconf.get('deleteTables') || 'no',
		required: true,
		before: function(value) {
			if(value == 'yes')
				return true;
			else
				return false;
		} 
	}
	];

	logger.info('Here you can create tables for the napchart database');

	prompt.start();
	prompt.get(questions, function (err, result) {

		logger.info('Delete tables: %s', result.force);

		createTables(result.force);

	});

	function createTables(force){
		credentials = nconf.get('mysql');
		sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {
			host: credentials.host,
			port: credentials.port,
			dialect: 'mysql',

			pool: {
				max: 5,
				min: 0,
				idle: 10000
			},
			define: {
				freezeTableName: true
			}

		});

		var config = {
			force : force
		}

		var feedback = sequelize.import(__dirname + '/models/feedback');
		var chart = sequelize.import(__dirname + '/models/chart');
		var chartitem = sequelize.import(__dirname + '/models/chartitem');

		feedback.sync(config).then(function(){
			chart.sync(config).then(function(){
				chartitem.sync(config).then(function(){

				})
			})
		});
	}
	
	

	


}

module.exports = install;
var install = {};

install.setup = function(){


	var prompt = require('prompt'),
	winston = require('winston'),
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
		hidden: true
	}
	];

	winston.info('Napchart Setup Triggered via Command Line');

	process.stdout.write('\nWelcome to Napchart!\n');
	process.stdout.write('\nYou\'ll have to answer a few questions about your environment before we can proceed.\n');
	process.stdout.write('Press enter to accept the default setting (shown in brackets).\n');

	prompt.start();
	prompt.get(questions, function (err, result) {

		for(var question in result){
			nconf.set(question,result[question]);
		}

		nconf.save(function (err) {
			if(err){
				winston.error(err);
			}
		});

	});


}


module.exports = install;
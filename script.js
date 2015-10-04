// Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('./logger.js');
var nconf = require('nconf');

nconf.argv()
.file({ file: 'config.json' });

if(nconf.get('setup')){
	setup();
}else if(nconf.get('create-tables')){
	createTables();
}else if(!nconf.get('mysql')){
	logger.info('No mysql credentials found');
	logger.info('To set up a server, run node script --setup');
	logger.info('running napchart without database capabilities');

	start(false);
}else{
	start(true);
}

function setup() {
	var install = require('./install.js');
	
	install.setup(function(){
		process.exit();
	});
}

function createTables() {
	var install = require('./install.js');
	
	install.createTables(function(){
		process.exit();
	})
}

function start(database){
	app.use(express.static('public'));
	app.use(favicon(__dirname + '/public/img/favicon.ico')); //serve favicon
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.set('view engine', 'ejs');

	//Routes:

	//index
	app.get('/', function (req, res) {
		var host = req.headers.host;

		res.render('pages/main',{chartid:null,chart:null, url:host, db:database});
	});

	if(database){

		//chart
		app.get('/:chartid', function (req, res) {
			var chartid = req.params.chartid;
			var host = req.headers.host;
			var database = require('./database.js');

			database.getChart(chartid, function(chartData,error){
				if(error){
					if(error == 404){
						res.render('pages/main',{chartid:null,chart:null, url:host, db:database});
					}else{
						logger.error("There was a problem when creating a new chart:", error);
						res.writeHead(503);
						res.end("error");
					}
				}else{
					res.render('pages/main',{chartid:chartid,chart:JSON.stringify(chartData), url:host});
				}
			});
			
		});

		//get schedule data (used for ajax requests ( not currently in use))
		// app.get('/get/:chartid', function(req, res) {
		// 	var chartid = req.params.chartid;

		// 	getObject(chartid,function(object){

		// 		res.writeHead(200, {"Content-Type": "application/json"});
		// 		res.end(JSON.stringify(output));

		// 	});
		// });

		//save schedule
		app.post('/post', function (req, res) {
			var database = require('./database.js');
			var data = JSON.parse(req.body.data);
			database.newChart(req,data, function(chartid,error){
				if(error){
					logger.error("There was a problem when creating a new chart:", error);
					res.writeHead(503);
					res.end("error");
				}else{
					res.writeHead(200);
					res.end(chartid);
				}
			});

		});

		app.post('/email-feedback-post', function (req,res){
			var text = req.body.message;
			var database = require('./database.js');

			database.postFeedback(text, function(result, error){
				if(error){
					logger.error("There was a problem when posting feedback:", error);
					res.writeHead(503);
					res.end("error");
				}else{
					res.writeHead(200);
					res.end('success');
				}
			})

		});
	}

	app.get('*', function (req, res) {
		res.redirect('/');
	});


	var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
	var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
	var server = app.listen(server_port,server_ip_address);

	logger.info('Napchart started at %s:%s', server_ip_address, server_port)
}
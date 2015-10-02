/**

This module handles database interaction

**/

var database = {};

var nconf = require('nconf');
var logger = require('./logger.js');
var mysql = require('mysql');
var Sequelize = require('sequelize');

nconf.argv()
.file({ file: 'config.json' });

var credentials = nconf.get('mysql');

var sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {
	host: credentials.host,
	port: credentials.port,
	dialect: 'mysql',
	define: {
		freezeTableName: true
	}
});

models = {};
models.chart = sequelize.import(__dirname + '/models/chart');
models.chartitem = sequelize.import(__dirname + '/models/chartitem');

var connection = mysql.createConnection(credentials);

// connection.connect(function(err) {
// 	if (err) {
// 		logger.error('### error connecting to mysql server: ' + err.stack);
// 		return;
// 	}
// 	logger.verbose('connected as id ' + connection.threadId);
// });

var ipFunctions = {
	dot2num:function(dot){
		var d = dot.split('.');
		return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
	},

	num2dot:function(num){
		var d = num%256;
		for (var i = 3; i > 0; i--) 
		{ 
			num = Math.floor(num/256);
			d = num%256 + '.' + d;
		}
		return d;
	},

	getIp:function(req){
		var ip = req.headers['x-forwarded-for'] || 
		req.connection.remoteAddress || 
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;

		return ip;
	}
}


function visit(chartid){

	connection.query('UPDATE chart SET visits=visits+1 WHERE chartid=?',chartid,function(err){
		if(err)
			throw err;

		return true;
	})
}


database.getChart = function(){
	function getObject(chartid,callback){
		connection.query('SELECT type,text,start,end FROM chartitem WHERE chartid = ?',chartid, function(err,rows){
			if(err){
				logger.error(err);
				throw err;
			}

			var output;
			var codes = {
				0:'core',
				1:'nap',
				2:'busy'
			}

			output = {
				core:[],
				nap:[],
				busy:[]
			};

			if(rows.length == 0){
				var none = true;
			}else{
				var none = false;
			}

			for(var i = 0; i < rows.length; i++){

				output[codes[rows[i].type]].push({
					start:rows[i].start,
					end:rows[i].end
				});
			};

			visit(chartid);

			logger.verbose('output: %s', output);
			return callback(output,none);
		});
	}
}


function idgen(){
	alphabet = "abcdefghijklmnopqrstuwxyz0123456789";
	id='';
	for( var i=0; i < 5; i++ )
		id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
	return id;
}

database.newChart = function(req,data,callback){

	function findChartID(callback){
		//find a chartid that is not in use
		var chartid = idgen();

		logger.verbose('Search for %s in database', chartid);

		models.chart.findById(chartid).then(function(chart) {
			if(chart){
				logger.verbose('Chartid %s already in use.');
				findChartID();
			}else{
				logger.verbose('Chartid %s is available.', chartid);
			}

			return callback(chartid);
		});

	}

	findChartID(function(chartid){

		addChartToIndex(chartid,function(){
			addChartItems(chartid,function(){
				logger.info("New chart %s successfully added to database", chartid)
				return callback(chartid);
			});
		});

	});

	function addChartToIndex(chartid, callback){
		var chart;

		ip = ipFunctions.getIp(req);
		logger.verbose('Client IP: %s', ip);

		chart = {
			chartid:chartid,
			ip:ipFunctions.dot2num(ip)
		}

		models.chart.create(chart)
		  .then(function(response){
			logger.verbose('Successfully added chart to index');

			return callback(chartid);

		  })
		  .catch(function(error){
		  	logger.error('There was a problem when adding chart to index');

		  	return callback('',error);

		  });

	}

	function addChartItems(chartid, callback){
		var codes = {
			'core':0,
			'nap':1,
			'busy':2
		}

		var itemArray = [];
		var text;

		Object.keys(data).forEach(function(name) {
			for(var i = 0; i < data[name].length; i++){
				text = data[name][i].text || '';
				itemArray.push({
					chartid:chartid,
					type:codes[name],
					start:data[name][i].start,
					end:data[name][i].end,
					text:text
				});
			}
		});

		models.chartitem.bulkCreate(itemArray)
		  .then(function(response){
			logger.verbose('Successfully added chart to database');

			return callback(chartid);
		  })
		  .catch(function(error){
		  	logger.error('There was a problem when adding chartitems to the database');
		  	
		  	return callback('',error);
		  });

		
	}
}

module.exports = database;
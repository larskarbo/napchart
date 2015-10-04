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


function visit(chartid, callback){

	models.chart.findById(chartid).then(function(chart) {

		chart.increment('visits', {by: 1}).then(function(chart){
			logger.verbose('Incremented chart %s visit field by to %d', chartid, chart.dataValues.visits);

			return callback();
		});

	}).catch(function(error){
	logger.warn('Error when trying to increment visit field at chart %s', chartid);
	logger.warn(error);

	return callback();
	});

}


database.getChart = function(chartid,callback){
	models.chartitem.findAll({
		where:{
			chartid:chartid
		}
	}).then(function(result){
		logger.warn(result.length)
		if(result.length == 0){
			logger.warn('Could not find chart %s.', chartid);

			callback('',404)
		}else{
			logger.verbose('Found %d rows', result.length);


			var codes = {
				0:'core',
				1:'nap',
				2:'busy'
			};

			var output = {
				core:[],
				nap:[],
				busy:[]
			};

			var item;

			for(var i = 0; i < result.length; i++){
				item = result[i].dataValues;
				output[codes[item.type]].push({
					start:item.start,
					end:item.end
				});
			}

			visit(chartid,function(){
				logger.verbose('Delivering chartData');
				return callback(output);
			});

		}

	}).catch(function(error){
		logger.error('There was a problem when adding chart to index');

		return callback('',error);

	})

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

		addChartToIndex(chartid,function(chartid,error){
			if(error){
				logger.error('error')
				callback('',error);
				return;
			}

			addChartItems(chartid,function(chartid,error){
				if(error){
					logger.error(error);
					callback('',error);
					return;
				}

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

		logger.warn(itemArray);

		models.chartitem.bulkCreate(itemArray)
		.then(function(response){
			logger.verbose('Successfully added chart to database');

			return callback(chartid);
		})
		.catch(function(error){
			logger.error('There was a problem when adding chartitems to the database');
			logger.error(error);
			return callback('',error);
		});

		
	}
}

database.postFeedback = function(text, callback){

	models.feedback = sequelize.import(__dirname + '/models/feedback');

	models.feedback.create({
		text:text
	}).then(function(){
		logger.verbose('Feedback successfully posted');

		callback(true);

	}).catch(function(error){
		logger.error('Error when posting feedback', error);

		callback('', error)
	});
}

database.exportJson = function(callback){
	var fs = require('fs');

	var feedback = sequelize.import(__dirname + '/models/feedback');
	var chart = sequelize.import(__dirname + '/models/chart');
	var chartitem = sequelize.import(__dirname + '/models/chartitem');

	var databaseData = {};


	var codes = {
		0:'core',
		1:'nap',
		2:'busy'
	};

	var output = {};

	logger.info('Exporting chart data');

	databaseData.chart = {};

	models.chart.findAll().then(function(result){
		var chartid;

		var i = 0;
		function next(callback){
			chartid = result[i].dataValues.chartid;

			logger.verbose('Exporting %s', chartid);
			findChartData(chartid,function(data){
				databaseData.chart[chartid] = data;

				i++;
				if(i < result.length){
					next(callback);
				}else{
					callback();
				}
			})
		}

		function findChartData(chartid,callback){

			models.chartitem.findAll({
				where: {
					chartid:chartid
				}
			}).then(function(result){

				output = {
					core:[],
					nap:[],
					busy:[]
				};

				for(var i = 0; i < result.length; i++){
					item = result[i].dataValues;
					output[codes[item.type]].push({
						start:item.start,
						end:item.end,
						text:item.text
					});
				}

				return callback(output);

			})

		}

		logger.info('Starting export');
		if(result.length > 0){
			next(function(){
				logger.info('Exported data: ', databaseData);
				fs.writeFile('export.json', JSON.stringify(databaseData), function (err) {
					if (err) return logger.error(err);

					callback();
				});
			});
		}else{
			logger.info('Found no chart data')
			callback();
		}

	}).catch(function(error){
		logger.error('There was a problem when exporting chart data');

		return callback('',error);

	})

}

module.exports = database;
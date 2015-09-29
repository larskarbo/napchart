/**

This module handles database interaction

**/

var database = {};

//connect


var nconf = require('nconf');
var mysql = require('mysql');

nconf.argv()
  .file({ file: 'config.json' });

var credentials = nconf.get('mysql');
var connection = mysql.createConnection(credentials);

connection.connect(function(err) {
	if (err) {
		console.error('### error connecting to mysql server: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

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
				console.error('################################# ERROR ');
				console.log(err);
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

			console.log(output);
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

database.newChart = function(req,data){
	var chart, chartid, chartitem, ip;

	function findChartID(){
		//find a chartid that is not in use
		var chartid = idgen();

		connection.query('SELECT chartid FROM chart WHERE chartid=?', chartid, function(err,res){
			if(err){
				console.error('### ERROR ', err);
				throw err;
			}
			if(res.length > 0){
	      	//try new one
	      	setChartID();
	      }
	      console.log('Chart id for new chart: ',chartid);
	  	});

		return chartid;
	}

	chartid = findChartID();
	ip = ipFunctions.getIp(req);

	chart = {
		chartid:chartid,
		ip:ipFunctions.dot2num(ip)
	}

	connection.query('INSERT INTO chart SET ?', chart, function(err,res){
		if(err) throw err;
	});

	var codes = {
		'core':0,
		'nap':1,
		'busy':2
	}

	var text;
	Object.keys(data).forEach(function(name) {
		for(var i = 0; i < data[name].length; i++){
			text = data[name][i].text || '';
			chartitem = {
				chartid:chartid,
				type:codes[name],
				start:data[name][i].start,
				end:data[name][i].end,
				text:text
			};

			connection.query('INSERT INTO chartitem SET ?', chartitem, function(err,res){
				if(err) throw err;
			});
		}
	});

}

module.exports = database;
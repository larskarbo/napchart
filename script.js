
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mysql      = require('mysql');

var credentials = {};

if(process.env.OPENSHIFT_MYSQL_DB_HOST){
	//on openshift
	credentials = {
		host:process.env.OPENSHIFT_MYSQL_DB_HOST,
		user:process.env.OPENSHIFT_MYSQL_DB_USERNAME,
		password:process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
		database:'napcharttestapp',
		port:process.env.OPENSHIFT_MYSQL_DB_PORT
	}
}else{
	//local
	credentials = {
		host:'localhost',
		user:'napchart',
		password:'hest',
		database:'napchart'
	}
}

var connection = mysql.createConnection(credentials);


connection.connect(function(err) {
	if (err) {
		console.error('################### error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + connection.threadId);
});

function dot2num(dot) 
{
    var d = dot.split('.');
    return ((((((+d[0])*256)+(+d[1]))*256)+(+d[2]))*256)+(+d[3]);
}

function num2dot(num) 
{
    var d = num%256;
    for (var i = 3; i > 0; i--) 
    { 
        num = Math.floor(num/256);
        d = num%256 + '.' + d;
    }
    return d;
}



function visit(chartid){
	connection.query('UPDATE chart SET visits=visits+1 WHERE chartid=?',chartid,function(err){
		if(err)
			throw err;

		return true;
	})
}

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

		for(var i = 0; i < rows.length; i++){
			output[codes[rows[i].type]].push({
				start:rows[i].start,
				end:rows[i].end
			});
		};

		visit(chartid);

		console.log(output);
		callback(output);
	});
}

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('view engine', 'ejs');

app.get('/get/:chartid', function(req, res) {

	var chartid = req.params.chartid;

	getObject(chartid,function(object){

		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify(output));

	});



});

app.post('/post', function (req, res) {

	function idgen(){
		alphabet = "abcdefghijklmnopqrstuwxyz0123456789";
		id='';
		for( var i=0; i < 5; i++ )
			id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		return id;
	}

	chartid=idgen();

	var chartid, chartinfo, chartitem;
	var data = JSON.parse(req.body.data);
	//first add chartid in chart
	function setChartID(){
		var chartid = idgen();

		connection.query('SELECT chartid FROM chart WHERE chartid=?', chartid, function(err,res){
			if(err){
				console.error('################################# ERROR ');
				console.log(err);
				throw err;
			}
			if(res.length > 0){
	      	//try new one
	      	setChartID();
	      }
	      console.log('We found ',chartid)
	      console.log('Last insert ID:', res.insertId);
	  });

		return chartid;
	}
	
	var ip = req.headers['x-forwarded-for'] || 
	     req.connection.remoteAddress || 
	     req.socket.remoteAddress ||
	     req.connection.socket.remoteAddress;

	var numIp = dot2num(ip);

	chartid = setChartID();
	chartinfo = {
		chartid:chartid,
		visits:0,
		ip:numIp
	}
	connection.query('INSERT INTO chart SET ?', chartinfo, function(err,res){
		if(err) throw err;

		console.log('chartinfo: Last insert ID:', res.insertId);
	});

	var codes = {
		'core':0,
		'nap':1,
		'busy':2
	}

	var text;
	Object.keys(data).forEach(function(name) {
		for(var i = 0; i < data[name].length; i++){
			var text = data[name][i].text || '';
			chartitem = {
				chartid:chartid,
				type:codes[name],
				start:data[name][i].start,
				end:data[name][i].end,
				text:text
			};
			connection.query('INSERT INTO chartitem SET ?', chartitem, function(err,res){
				if(err) throw err;

				console.log('chartitem: Last insert ID:', res.insertId);
			});
		}
	});

	res.writeHead(200);
	res.end(chartid);
});

app.get('/:chartid', function (req, res) {
	var chartid = req.params.chartid;
	var url = req.headers.host;

	getObject(chartid, function(object){

		res.render('pages/index',{chartid:chartid,chart:JSON.stringify(object), url:url});
	});

});

app.post('/email-feedback-post', function (req,res){
	var text = req.body.message;
	var feedback = {
		text: text
	}

	//post to database
	connection.query('INSERT INTO feedback SET ?', feedback, function(err,res){
		if(err) throw err;

		console.log('feedback: Last insert ID:', res.insertId);
	});

	res.writeHead(200);
	res.end('success');


});

app.get('/', function (req, res) {
	var url = req.headers.host;

	res.render('pages/index',{chartid:null,chart:null, url:url});
});


app.get('*', function (req, res) {
	var url = req.headers.host;

	res.status(404).render('pages/index',{chartid:null,chart:null, url:url});
});



var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var server = app.listen(server_port,server_ip_address);

console.log('server.address()',server.address());
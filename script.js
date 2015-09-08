
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
console.log('we got this far');
var redis_port = process.env.OPENSHIFT_REDIS_DB_PORT || '6379';
console.log(redis_port);
var redis_host = process.env.OPENSHIFT_REDIS_DB_HOST || '127.0.0.1';
console.log(redis_host);
var redis = require("redis").createClient(redis_port,redis_host); //creates a new client
redis.auth(process.env.PASSWORD);
console.log('we got this far v2');


redis.on('connect', function() {
	console.log('connected');
});


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('view engine', 'ejs');

app.get('/get/:chartid', function(req, res) {

	var chartid=req.params.chartid;
	redis.get('chart:'+chartid, function(err, reply) {
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(reply);
	})

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

	redis.set('chart:'+chartid,req.body.data,function(err,reply){
		res.writeHead(200);
		res.end(chartid);
	})
});

app.get('/about', function (req, res) {
	res.render('pages/about',{});
});

app.get('/:chartid', function (req, res) {
	var chartid = req.params.chartid;

	redis.get('chart:'+chartid, function(err, reply) {

		res.render('pages/index',{chartid:chartid,chart:reply});
	})

});

app.post('/email-feedback-post', function (req,res){
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport();
	console.log(req.body.message);
	transporter.sendMail({
    	from: 'larskarbo@gmail.com',
	    to: 'larskarbo@gmail.com',
	    subject: 'feeeeeedback',
	    text: req.body.message
	}, function(){
		res.writeHead(200);
		res.end('success');
	});
});
	


app.get('/', function (req, res) {
	res.render('pages/index',{chartid:null,chart:null});
});

app.get('*', function (req, res) {
	res.status(404).send('404');
});



var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

var server = app.listen(server_port,server_ip_address);

console.log('server.address()',server.address());
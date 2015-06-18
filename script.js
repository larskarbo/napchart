
var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var redis = require('redis');
var redisClient = redis.createClient(); //creates a new client


redisClient.on('connect', function() {
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
	redisClient.get('chart:'+chartid, function(err, reply) {
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(reply);
	})

});

app.post('/post', function(req, res) {

	function idgen(){
		alphabet = "abcdefghijklmnopqrstuwxyz0123456789";
		id='';
		for( var i=0; i < 5; i++ )
			id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		return id;
	}

	chartid=idgen();

	redisClient.set('chart:'+chartid,req.body.data,function(err,reply){
		res.writeHead(200);
		res.end(chartid);
	})
});

app.get('/about', function(req, res) {
	res.render('pages/about',{});
});

app.get('/:chartid', function (req, res) {
	var chartid = req.params.chartid;

	redisClient.get('chart:'+chartid, function(err, reply) {

		res.render('pages/index',{chartid:chartid,chart:reply});
	})

});

app.get('/', function (req, res) {
	res.render('pages/index',{chartid:null,chart:null});
});

app.get('*', function (req, res) {
	res.send('404',404);
});






var server = app.listen(3000);

console.log('server.address()',server.address());
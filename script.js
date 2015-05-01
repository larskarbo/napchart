var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var redis = require('redis');
var client = redis.createClient(); //creates a new client


	client.on('connect', function() {
		console.log('connected');
	});

app.set('view engine','ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/get/:chartid', function(req, res) {
	var chartid=req.params.chartid;
	client.get('chart:'+chartid, function(err, reply) {
	res.writeHead(200, {"Content-Type": "application/json"});
	res.end(reply);
	})
});

app.post('/post', function(req, res) {
	res.writeHead(200, {"Content-Type": "application/json"});
	console.log(req.body.data);
	res.end('rto');
	
});

app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/', function (req, res) {
  res.render('pages/index',{napid:null});
});
app.get('/:napid', function (req, res) {
	console.log(req.params.napid);
  res.render('pages/index',{napid:req.params.napid});
});



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;
	console.log(server.address());
  console.log('Example app listening at http://%s:%s', host, port);

});
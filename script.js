var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var redis = require('redis');
var client = redis.createClient(); //creates a new client


	client.on('connect', function() {
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
	client.get('chart:'+chartid, function(err, reply) {
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
	console.log(req.body.data);
	chartid=idgen();
	console.log(chartid);
	client.set('chart:'+chartid,req.body.data,function(err,reply){
		res.writeHead(200);
		res.end(chartid);
	})
	
});

app.get('*', function (req, res) {
	res.render('pages/index',{chartid:null});
});
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/', function (req, res) {
	res.send('You are now on the index page!')
});
app.get('/:chartid', function (req, res) {
	console.log(req.params.chartid);
  //res.render('pages/index',{chartid:req.params.chartid});
	res.send('You are now on the index page!')
});



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;
	console.log(server.address());
  console.log('Example app listening at http://%s:%s', host, port);

});
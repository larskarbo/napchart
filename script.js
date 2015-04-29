var express = require('express');
var app = express();


app.set('view engine','ejs');

app.use(express.static('public'));

app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/:napid', function (req, res) {
	console.log(req.params.napid);
  res.render('pages/index',{napid:req.params.napid});
});
app.get('/', function (req, res) {
  res.render('pages/index',{napid:null});
});



var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;
	console.log(server.address());
  console.log('Example app listening at http://%s:%s', host, port);

});
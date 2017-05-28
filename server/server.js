var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')

var api = require('./api')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname + '/../dist/')));

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'))
})

app.get('/c/:whatever', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'))
})


app.post('/api/create', api.create)
app.get('/api/get', api.get)

var port = 3000
app.listen(port, function() {
	console.log(`listening at ${port}`)
})
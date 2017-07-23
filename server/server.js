var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var nunjucks = require('nunjucks')
var argv = require('minimist')(process.argv.slice(2))

var api = require('./api/api')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

if(process.env.NODE_ENV == 'production'){
	console.log('Starting node server in production mode')
	app.get('*.js', function (req, res, next) {
		console.log('fj')
	  req.url = req.url + '.gz'
	  res.set('Content-Encoding', 'gzip')
	  next()
	})
}

app.use('/public', express.static(path.resolve(__dirname + '/../dist')))

app.get('/', function (req, res) {
  var file = nunjucks.render(__dirname + '/../client/index.html', { chartid: false });
  res.send(file)
})

app.get('/c/:whatever', function (req, res) {
  var file = nunjucks.render(__dirname + '/../client/index.html', { chartid: req.params.whatever });
  res.send(file)
})


app.post('/api/create', api.create)
app.get('/api/get', api.get)
app.get('/api/getImage', api.getImage)

var port = argv.port || 3000
app.listen(port, function () {
  console.log(`listening at ${port}`)
})

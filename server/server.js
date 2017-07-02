var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var webpack = require('webpack')
var config = require('../webpack.config')

var compiler = webpack(config)
// app.use(require('webpack-dev-middleware')(compiler, {
//   publicPath: '../public/'
// }));

// app.use(require('webpack-hot-middleware')(compiler))
var api = require('./api/api')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname + '/../dist/')))
console.log(path.resolve(__dirname + '/dist'))
app.use('/public', express.static(path.resolve(__dirname + '/../dist')))

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'))
})

app.get('/c/:whatever', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'))
})

app.post('/api/create', api.create)
app.get('/api/get', api.get)
app.get('/api/getImage', api.getImage)

var port = 3000
app.listen(port, function () {
  console.log(`listening at ${port}`)
})

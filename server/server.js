var app = require('express')()
var path = require('path')

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'))
})

app.get('/index_bundle.js', function(req, res){
  res.sendFile(path.resolve(__dirname + '/../dist/index_bundle.js'))
})

app.listen(3000)
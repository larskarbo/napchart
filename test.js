var http=require('http');
http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/plain'});
	response.end('Im Node.js.!\n');
	console.log('Handled request');
}).listen(8080, "0.0.0.0");;

console.log('Server running a http://localhost:8080/');
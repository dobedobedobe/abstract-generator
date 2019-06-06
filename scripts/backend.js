const express = require("express");
const body = require("body-parser");
const app=express();
var http = require('http');
var url = require('url');
var fs = require('fs');

app.use(body.json());

app.use(body.urlencoded({
	extended:true
}));

http.createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var filename = "./.." + q.pathname;
    var lastChar = filename[filename.length - 2];
    if (lastChar == 's') {
    	fs.readFile(filename, function(err, data) {
	        if (err) {
	            res.writeHead(404, {'Content-Type': 'text/html'});
	            return res.end("404 Not Found");
	        }
	        res.writeHead(200, {'Content-Type': 'text/css'});
	        res.write(data);
	        return res.end();
	    });
    }
    else if (lastChar == 'j') {
    	fs.readFile(filename, function(err, data) {
	        if (err) {
	            res.writeHead(404, {'Content-Type': 'text/html'});
	            return res.end("404 Not Found");
	        }
	        res.writeHead(200, {'Content-Type': 'text/javascript'});
	        res.write(data);
	        return res.end();
	    });
    }
    else {
	    fs.readFile(filename, function(err, data) {
	        if (err) {
	            res.writeHead(404, {'Content-Type': 'text/html'});
	            return res.end("404 Not Found");
	        }
	        res.writeHead(200, {'Content-Type': 'text/html'});
	        res.write(data);
	        return res.end();
	    });
    }
}).listen(8081);

app.listen(8080, function() {
	console.log("Server started");
});

app.post("/sendData", function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var spawn = require('child_process').spawn,
	py	= spawn('python', ['currentGenerator.py']),
	dataString = '';
	py.stdout.on('data', function(data){
		dataString += data.toString();
	});

	py.stdout.on('end', function() {
		console.log(dataString);
		res.end(dataString);
	});
});
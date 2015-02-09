var sys = require("sys");
var fs = require('fs');
var my_http = require("http");
var url = require("url");

var count = 0;
var dgram = require('dgram');
var client = dgram.createSocket('udp4');
//client.bind(port);
    function udpSend() {
    var message = new Buffer('1'); //set send value
    client.send(message, 0, message.length, 4000, 'localhost',
            function (err, bytes) {
                if (err) {
                    throw err;
                }
                
//                client.close();
            }
    );
}
 
my_http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    if (path == "/getstring") {
        count++;
        console.log("request received " + String(count) + " times.");
        udpSend();
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("Request received on Server " + String(count) + " times.");
        console.log("response sent to client.");
    }else {
        fs.readFile('./index.html', function (err, html) {
             if (err) {
                throw err;
            }
         
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.end(html, "utf-8");
        });
    }
}).listen(8080);
console.log("Server Running on 8080");


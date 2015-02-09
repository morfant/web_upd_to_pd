var dgram = require('dgram');
var client = dgram.createSocket('udp4');
//client.bind(port);

udpfunc.exports = {
    udpSend: function () {
    var message = new Buffer('1');
    client.send(message, 0, message.length, 4000, 'localhost',
            function (err, bytes) {
                if (err) {
                    throw err;
                }
                
                client.close();
            }
    );
}
        

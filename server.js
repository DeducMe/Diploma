var express = require('express');
var app = express();
const path = require('path');
var cors = require('cors');
var http = require('http');
var https = require('https');

app.options('*', cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', cors(), (req, res) => {  
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));                               
});



require("greenlock-express")
    .init({
        packageRoot: __dirname,
        configDir: "./greenlock.d",

        maintainerEmail: "jon@example.com",
        cluster: false
    })
    .ready(httpsWorker);

function httpsWorker(glx) {
    //
    // HTTPS 1.1 is the default
    // (HTTP2 would be the default but... https://github.com/expressjs/express/issues/3388)
    //
    // Get the raw https server:
    var httpsServer = glx.httpsServer(null, function(req, res) {
        res.end("Hello, Encrypted World!");
    });

    httpsServer.listen(8443, "0.0.0.0", function() {
        console.info("Listening on ", httpsServer.address());
    });

    // Note:
    // You must ALSO listen on port 80 for ACME HTTP-01 Challenges
    // (the ACME and http->https middleware are loaded by glx.httpServer)
    var httpServer = glx.httpServer();

    httpServer.listen(8080, "0.0.0.0", function() {
        console.info("Listening on ", httpServer.address());
    });
}

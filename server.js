var express = require('express');
var app = express();
const path = require('path');
var cors = require('cors');
var http = require('http');
var https = require('https');
const fs = require('fs');
const LEX = require('greenlock-express');

app.options('*', cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', cors(), (req, res) => {  
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));                               
});

const lex = LEX.create({
    server: 'staging',
    email: 'my.email@mailprovider.com',
    agreeTos: true,
    configDir: 'cert/',
    approveDomains: ['job-flow.ru']
});

var httpServer = http.createServer(lex.middleware(require('redirect-https')()));
var httpsServer = https.createServer(lex.httpsOptions, lex.middleware(app));

httpServer.listen(8080);
httpsServer.listen(8443);
